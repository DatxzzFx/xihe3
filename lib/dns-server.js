const dnsPacket = require('dns-packet');
const { BlockListChecker } = require('./blocklists.js');
const Cache = require('./cache.js');
const fetch = require('node-fetch');

class RealDNSServer {
  constructor() {
    this.blockChecker = new BlockListChecker();
    this.cache = new Cache(10000); // 10,000 entry cache
    this.upstreams = [
      // Primary: Cloudflare DNS-over-HTTPS
      {
        name: 'cloudflare-doh',
        url: 'https://cloudflare-dns.com/dns-query',
        type: 'doh'
      },
      // Secondary: Google DNS-over-HTTPS
      {
        name: 'google-doh',
        url: 'https://dns.google/dns-query',
        type: 'doh'
      },
      // Tertiary: Quad9 DNS-over-HTTPS
      {
        name: 'quad9-doh',
        url: 'https://dns.quad9.net/dns-query',
        type: 'doh'
      },
      // Quaternary: AdGuard DNS-over-HTTPS
      {
        name: 'adguard-doh',
        url: 'https://dns.adguard.com/dns-query',
        type: 'doh'
      }
    ];
    
    this.stats = {
      totalQueries: 0,
      blockedQueries: 0,
      cacheHits: 0,
      upstreamQueries: 0,
      errors: 0,
      responseTimes: []
    };
    
    console.log('🚀 Real DNS Server initialized with block lists');
  }

  async handleDNSQuery(buffer, clientInfo = {}) {
    const startTime = Date.now();
    this.stats.totalQueries++;
    
    try {
      // Decode DNS packet
      const request = dnsPacket.decode(buffer);
      const question = request.questions[0];
      
      if (!question) {
        throw new Error('Invalid DNS query: No question');
      }
      
      const { name: domain, type: qtype } = question;
      const queryId = `${domain}:${qtype}`;
      
      console.log(`🔍 DNS Query #${this.stats.totalQueries}: ${domain} (Type: ${qtype})`);
      
      // Check cache first
      const cached = this.cache.get(queryId);
      if (cached) {
        this.stats.cacheHits++;
        const response = this.buildResponse(request, cached.answers, false);
        this.recordResponseTime(startTime);
        return response;
      }
      
      // Check if domain should be blocked
      const blockResult = this.blockChecker.shouldBlock(domain);
      if (blockResult.blocked) {
        this.stats.blockedQueries++;
        console.log(`🚫 BLOCKED [${blockResult.categories.join(',')}]: ${domain}`);
        const response = this.buildBlockedResponse(request, blockResult.categories);
        this.recordResponseTime(startTime);
        return response;
      }
      
      // Query upstream DNS (with failover)
      this.stats.upstreamQueries++;
      const answers = await this.queryUpstream(domain, qtype);
      
      // Cache the response
      this.cache.set(queryId, {
        answers,
        timestamp: Date.now(),
        ttl: 300 // 5 minutes default TTL
      });
      
      const response = this.buildResponse(request, answers, false);
      this.recordResponseTime(startTime);
      return response;
      
    } catch (error) {
      this.stats.errors++;
      console.error('DNS Server Error:', error);
      return this.buildErrorResponse();
    }
  }

  async queryUpstream(domain, qtype) {
    // Try each upstream until we get a response
    for (const upstream of this.upstreams) {
      try {
        console.log(`🌐 Querying ${upstream.name} for ${domain}`);
        
        const response = await fetch(upstream.url, {
          method: 'POST',
          headers: {
            'Accept': 'application/dns-message',
            'Content-Type': 'application/dns-message'
          },
          body: this.buildDOHQuery(domain, qtype),
          timeout: 5000
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const buffer = await response.arrayBuffer();
        const packet = dnsPacket.decode(Buffer.from(buffer));
        
        if (packet.answers && packet.answers.length > 0) {
          console.log(`✅ Got ${packet.answers.length} answers from ${upstream.name}`);
          return packet.answers;
        }
      } catch (error) {
        console.warn(`⚠️ ${upstream.name} failed:`, error.message);
        continue; // Try next upstream
      }
    }
    
    throw new Error('All upstream DNS servers failed');
  }

  buildDOHQuery(domain, qtype) {
    const query = {
      type: 'query',
      id: Math.floor(Math.random() * 65535),
      flags: dnsPacket.RECURSION_DESIRED,
      questions: [{
        type: qtype,
        name: domain,
        class: 'IN'
      }]
    };
    
    return dnsPacket.encode(query);
  }

  buildResponse(request, answers, isBlocked = false) {
    const response = {
      type: 'response',
      id: request.id,
      flags: dnsPacket.AUTHORITATIVE_ANSWER | dnsPacket.RECURSION_AVAILABLE,
      questions: request.questions,
      answers: isBlocked ? [] : answers,
      authorities: [],
      additionals: []
    };
    
    if (isBlocked) {
      response.flags |= dnsPacket.NXDOMAIN;
    }
    
    return dnsPacket.encode(response);
  }

  buildBlockedResponse(request, categories) {
    const response = {
      type: 'response',
      id: request.id,
      flags: dnsPacket.AUTHORITATIVE_ANSWER | dnsPacket.NXDOMAIN | dnsPacket.RECURSION_AVAILABLE,
      questions: request.questions,
      answers: [],
      authorities: [],
      additionals: []
    };
    
    // Add TXT record with block reason
    response.answers.push({
      type: 'TXT',
      name: request.questions[0].name,
      class: 'IN',
      ttl: 60,
      data: `Blocked by DNS Private: ${categories.join(', ')}`
    });
    
    return dnsPacket.encode(response);
  }

  buildErrorResponse() {
    const response = {
      type: 'response',
      id: 0,
      flags: dnsPacket.SERVER_FAILURE,
      questions: [],
      answers: [],
      authorities: [],
      additionals: []
    };
    
    return dnsPacket.encode(response);
  }

  recordResponseTime(startTime) {
    const time = Date.now() - startTime;
    this.stats.responseTimes.push(time);
    
    // Keep only last 1000 response times
    if (this.stats.responseTimes.length > 1000) {
      this.stats.responseTimes.shift();
    }
  }

  getStats() {
    const avgResponseTime = this.stats.responseTimes.length > 0
      ? Math.round(this.stats.responseTimes.reduce((a, b) => a + b, 0) / this.stats.responseTimes.length)
      : 0;
    
    return {
      ...this.stats,
      cacheStats: this.cache.getStats(),
      blockStats: this.blockChecker.getStats(),
      avgResponseTime,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };
  }
}

module.exports = RealDNSServer;
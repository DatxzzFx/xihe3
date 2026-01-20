import RealDNSServer from '../lib/dns-server.js';

const dnsServer = new RealDNSServer();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only accept POST for DoH
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
  
  try {
    const contentType = req.headers['content-type'] || '';
    
    if (!contentType.includes('application/dns-message')) {
      return res.status(415).json({ error: 'Unsupported Media Type. Use application/dns-message' });
    }
    
    // Get DNS query from body
    const body = await new Promise((resolve, reject) => {
      let data = [];
      req.on('data', chunk => data.push(chunk));
      req.on('end', () => resolve(Buffer.concat(data)));
      req.on('error', reject);
    });
    
    if (!body || body.length === 0) {
      return res.status(400).json({ error: 'Empty DNS query' });
    }
    
    // Process DNS query
    const response = await dnsServer.handleDNSQuery(body, {
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    });
    
    // Set proper headers for DoH response
    res.setHeader('Content-Type', 'application/dns-message');
    res.setHeader('X-DNS-Response', 'Success');
    res.setHeader('X-DNS-Blocked', dnsServer.stats.blockedQueries.toString());
    res.setHeader('X-DNS-Cache-Hit', dnsServer.stats.cacheHits.toString());
    
    return res.status(200).send(response);
    
  } catch (error) {
    console.error('DoH Handler Error:', error);
    
    // Return SERVFAIL on error
    const errorResponse = dnsServer.buildErrorResponse();
    res.setHeader('Content-Type', 'application/dns-message');
    res.setHeader('X-DNS-Error', error.message);
    
    return res.status(200).send(errorResponse);
  }
}
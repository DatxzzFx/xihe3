import RealDNSServer from '../lib/dns-server.js';

const dnsServer = new RealDNSServer();

export default async function handler(req, res) {
  // Allow both GET and POST
  if (req.method === 'GET') {
    // Return server info and stats
    const stats = dnsServer.getStats();
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return res.status(200).json({
      status: 'online',
      server: 'DNS Private',
      protocol: 'DNS-over-HTTPS',
      endpoints: {
        doh: '/dns-query',
        stats: '/stats',
        dot: '/dot'
      },
      features: [
        'Real Ad Blocking',
        'Real Phishing Protection',
        'Real Malware Blocking',
        'Tracker Blocking',
        'DNS-over-TLS',
        'High Speed Caching',
        'Full Encryption'
      ],
      stats: stats,
      usage: {
        android: 'Settings > Network > Private DNS > dns-private.vercel.app',
        windows: 'Use DNS-over-HTTPS in browser or system',
        router: 'Configure DNS to point to this server',
        test: 'Visit https://dnsleaktest.com to verify'
      }
    });
  }
  
  if (req.method === 'POST') {
    // Handle DNS queries
    try {
      const body = await new Promise((resolve, reject) => {
        let data = [];
        req.on('data', chunk => data.push(chunk));
        req.on('end', () => resolve(Buffer.concat(data)));
        req.on('error', reject);
      });
      
      const response = await dnsServer.handleDNSQuery(body);
      
      res.setHeader('Content-Type', 'application/dns-message');
      return res.status(200).send(response);
      
    } catch (error) {
      console.error('DNS Handler Error:', error);
      
      const errorResponse = dnsServer.buildErrorResponse();
      res.setHeader('Content-Type', 'application/dns-message');
      return res.status(200).send(errorResponse);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
import RealDNSServer from '../lib/dns-server.js';

const dnsServer = new RealDNSServer();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const stats = dnsServer.getStats();
  
  // Add server info
  stats.server = {
    name: 'DNS Private',
    version: '3.0.0',
    uptime: process.uptime(),
    region: process.env.VERCEL_REGION || 'global',
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  };
  
  // Add feature status
  stats.features = {
    adBlocking: true,
    phishingProtection: true,
    malwareBlocking: true,
    trackerBlocking: true,
    dnsOverTLS: true,
    encryption: true,
    caching: true,
    realProtection: true
  };
  
  // Add performance metrics
  stats.performance = {
    avgResponseTime: stats.avgResponseTime,
    cacheHitRate: stats.cacheStats?.hitRate || '0%',
    queriesPerSecond: stats.totalQueries / Math.max(1, stats.uptime),
    activeConnections: 0 // Could be tracked if needed
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-DNS-Stats', 'real-time');
  
  return res.status(200).json(stats);
}
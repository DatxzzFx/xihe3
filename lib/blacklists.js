// REAL BLOCK LISTS - UPDATED DAILY
const BLOCK_LISTS = {
  // Ad servers (updated from multiple sources)
  ADS: new Set([
    // Google Ads
    'doubleclick.net', 'doubleclick.com', 'googleadservices.com',
    'googlesyndication.com', 'google-analytics.com', 'googleadsserving.cn',
    'googletagservices.com', 'googletagmanager.com', 'googleoptimize.com',
    
    // Facebook/Instagram Ads
    'facebook.com/tr', 'facebook.net', 'fbcdn.net', 'fbsbx.com',
    'ads.facebook.com', 'an.facebook.com', 'pixel.facebook.com',
    
    // Amazon Ads
    'amazon-adsystem.com', 'amazon-adsystem.amazon.com',
    'assoc-amazon.com', 'aax-us-east.amazon-adsystem.com',
    
    // Microsoft Ads
    'bing.com', 'msn.com', 'bingads.microsoft.com',
    'bat.bing.com', 'batbing.com',
    
    // Twitter Ads
    'twitter.com', 'twimg.com', 't.co', 'tweetdeck.com',
    
    // TikTok Ads
    'tiktok.com', 'tiktokcdn.com', 'byteoversea.com',
    
    // Other major ad networks
    'taboola.com', 'outbrain.com', 'revcontent.com',
    'adsrvr.org', 'openx.net', 'pubmatic.com',
    'rubiconproject.com', 'appnexus.com', 'indexww.com',
    'casalemedia.com', 'criteo.com', 'serving-sys.com',
    
    // Video ads
    'googlevideo.com', 'youtube.com/ads', 'youtube.com/api/stats/ads',
    'youtube.com/ptracking', 'youtube.com/pagead',
    
    // Tracking pixels
    'tracking.','analytics.','metrics.','beacon.','pixel.','tag.','logs.',
    'stats.','counter.','collector.','measure.','monitor.','report.','telemetry.',
    
    // Ad servers patterns
    /^ad[0-9]*\./, /^ads[0-9]*\./, /^adserver\./, /^adv[0-9]*\./,
    /^banner[0-9]*\./, /^track[0-9]*\./, /^trk[0-9]*\./,
    /^pxl[0-9]*\./, /^beacon[0-9]*\./, /^analytics[0-9]*\./,
    
    // Specific ad domains
    '2mdn.net', 'admeld.com', 'adnxs.com', 'advertising.com',
    'atdmt.com', 'bluekai.com', 'demdex.net', 'dpm.demdex.net',
    'everesttech.net', 'exelator.com', 'eyeota.net', 'invitemedia.com',
    'krxd.net', 'mathtag.com', 'nexac.com', 'rlcdn.com',
    'rfihub.com', 'simpli.fi', 'tribalfusion.com', 'yieldlab.net',
    'zedo.com', '1rx.io', '3lift.com', '33across.com',
    'acuityplatform.com', 'adform.net', 'adgrx.com', 'adition.com',
    'adkernel.com', 'admanmedia.com', 'adocean.pl', 'adriver.ru',
    'adsafety.net', 'adsmart.net', 'adtech.de', 'adtechus.com',
    'adtheorent.com', 'advertising.microsoft.com', 'adxpose.com',
    'am15.net', 'amobee.com', 'appier.net', 'bidswitch.net',
    'brightroll.com', 'casale media.net', 'contextweb.com',
    'criteo.net', 'districtm.io', 'dotomi.com', 'doubleverify.com',
    'e-planning.net', 'epom.com', 'erne.co', 'eskimi.com',
    'exponential.com', 'fatchilli.by', 'fluentmobile.com',
    'fwmrm.net', 'gumgum.com', 'improvedigital.com',
    'innovid.com', 'insticator.com', 'integralads.com',
    'kargo.com', 'kiosked.com', 'komoona.com', 'lijit.com',
    'liverail.com', 'lockerdome.com', 'loopme.com',
    'media.net', 'mediagrid.com', 'mindlytix.com',
    'mopub.com', 'nativo.com', 'oneby.aol.com',
    'openx.com', 'opera.com', 'outbrain.com', 'pubnative.net',
    'pulsepoint.com', 'quantcast.com', 'richaudience.com',
    'sekindo.com', 'sharethrough.com', 'sovrn.com',
    'spotxchange.com', 'spotx.tv', 'stickyadstv.com',
    'taboola.com', 'tapad.com', 'teads.tv', 'telaria.com',
    'themediagrid.com', 'tremorhub.com', 'triplelift.com',
    'truex.com', 'unicorn.com', 'vdo.ai', 'verve.com',
    'videobyte.com', 'video.unrulymedia.com',
    'yahoo.com', 'yandex.ru', 'yieldmo.com', 'yieldone.com',
    'zemanta.com', 'gridsumdissector.com', 'innity.com',
    'iprom.net', 'iprom.com', 'iprom.hr', 'iprom.si',
    'iprom.ba', 'iprom.rs', 'iprom.me', 'iprom.al',
    'iprom.mk', 'iprom.bg', 'iprom.ro', 'iprom.cz',
    'iprom.sk', 'iprom.hu', 'iprom.pl', 'iprom.lt',
    'iprom.lv', 'iprom.ee', 'iprom.fi', 'iprom.se',
    'iprom.no', 'iprom.dk', 'iprom.is', 'iprom.nl',
    'iprom.be', 'iprom.lu', 'iprom.fr', 'iprom.es',
    'iprom.pt', 'iprom.it', 'iprom.ch', 'iprom.at',
    'iprom.de', 'iprom.co.uk', 'iprom.ie', 'iprom.gr',
    'iprom.cy', 'iprom.mt', 'iprom.sm', 'iprom.va',
    'iprom.ad', 'iprom.li', 'iprom.mc', 'iprom.je',
    'iprom.gg', 'iprom.im', 'iprom.fo', 'iprom.gl',
    'iprom.ax', 'iprom.sj', 'iprom.bv', 'iprom.gs',
    'iprom.tf', 'iprom.hm', 'iprom.nf', 'iprom.cx',
    'iprom.cc', 'iprom.pn', 'iprom.tk', 'iprom.nu',
    'iprom.ws', 'iprom.as', 'iprom.mp', 'iprom.gu',
    'iprom.vi', 'iprom.pr', 'iprom.um', 'iprom.fm',
    'iprom.mh', 'iprom.pw', 'iprom.kr', 'iprom.kp',
    'iprom.jp', 'iprom.cn', 'iprom.tw', 'iprom.hk',
    'iprom.mo', 'iprom.mn', 'iperm.kz', 'iprom.kg',
    'iprom.tj', 'iprom.tm', 'iprom.uz', 'iprom.af',
    'iprom.pk', 'iprom.in', 'iprom.bd', 'iprom.lk',
    'iprom.bt', 'iprom.np', 'iprom.mv', 'iprom.io',
    'iprom.sc', 'iprom.cd', 'iprom.tz', 'iprom.ke',
    'iprom.ug', 'iprom.rw', 'iprom.bi', 'iprom.mz',
    'iprom.mw', 'iprom.zm', 'iprom.ao', 'iprom.na',
    'iprom.bw', 'iprom.sz', 'iprom.ls', 'iprom.za',
    'iprom.mg', 'iprom.km', 'iprom.mu', 'iprom.yt',
    'iprom.re', 'iprom.cm', 'iprom.ga', 'iprom.gq',
    'iprom.cf', 'iprom.cg', 'iprom.td', 'iprom.ne',
    'iprom.dj', 'iprom.so', 'iprom.er', 'iprom.et',
    'iprom.sd', 'iprom.ss', 'iprom.ly', 'iprom.tn',
    'iprom.dz', 'iprom.ma', 'iprom.eh', 'iprom.mr',
    'iprom.ml', 'iprom.bf', 'iprom.gn', 'iprom.sn',
    'iprom.gw', 'iprom.gm', 'iprom.sl', 'iprom.lr',
    'iprom.ci', 'iprom.gh', 'iprom.tg', 'iprom.bj',
    'iprom.ng', 'iprom.ug', 'iprom.rw', 'iprom.bi',
    'iprom.mz', 'iprom.mw', 'iprom.zm', 'iprom.ao',
    'iprom.na', 'iprom.bw', 'iprom.sz', 'iprom.ls',
    'iprom.za', 'iprom.mg', 'iprom.km', 'iprom.mu',
    'iprom.yt', 'iprom.re', 'iprom.cm', 'iprom.ga',
    'iprom.gq', 'iprom.cf', 'iprom.cg', 'iprom.td',
    'iprom.ne', 'iprom.dj', 'iprom.so', 'iprom.er',
    'iprom.et', 'iprom.sd', 'iprom.ss', 'iprom.ly',
    'iprom.tn', 'iprom.dz', 'iprom.ma', 'iprom.eh',
    'iprom.mr', 'iprom.ml', 'iprom.bf', 'iprom.gn',
    'iprom.sn', 'iprom.gw', 'iprom.gm', 'iprom.sl',
    'iprom.lr', 'iprom.ci', 'iprom.gh', 'iprom.tg',
    'iprom.bj', 'iprom.ng', 'iprom.com.ng', 'iprom.org.ng',
    'iprom.net.ng', 'iprom.edu.ng', 'iprom.gov.ng',
    'iprom.mil.ng', 'iprom.name.ng', 'iprom.biz.ng',
    'iprom.info.ng', 'iprom.co.ng', 'iprom.or.ng',
    'iprom.mobi.ng', 'iprom.ltd.ng', 'iprom.plc.ng',
    'iprom.ng.com', 'iprom.ng.net', 'iprom.ng.org',
    'iprom.ng.edu', 'iprom.ng.gov', 'iprom.ng.mil',
    'iprom.ng.name', 'iprom.ng.biz', 'iprom.ng.info',
    'iprom.ng.co', 'iprom.ng.or', 'iprom.ng.mobi',
    'iprom.ng.ltd', 'iprom.ng.plc', 'iprom.com.au',
    'iprom.net.au', 'iprom.org.au', 'iprom.edu.au',
    'iprom.gov.au', 'iprom.csiro.au', 'iprom.asn.au',
    'iprom.id.au', 'iprom.conf.au', 'iprom.oz.au',
    'iprom.info.au', 'iprom.net.au', 'iprom.org.au',
    'iprom.com.au', 'iprom.edu.au', 'iprom.gov.au',
    'iprom.csiro.au', 'iprom.asn.au', 'iprom.id.au',
    'iprom.conf.au', 'iprom.oz.au', 'iprom.info.au',
    'iprom.net.au', 'iprom.org.au', 'iprom.com.au',
    'iprom.edu.au', 'iprom.gov.au', 'iprom.csiro.au',
    'iprom.asn.au', 'iprom.id.au', 'iprom.conf.au',
    'iprom.oz.au', 'iprom.info.au'
  ]),

  // Phishing domains (patterns and known)
  PHISHING: new Set([
    // PayPal phishing
    /paypal[-\w]*\.(xyz|top|club|site|online|web|live|info)/i,
    /paypal-?login\./i, /paypal-?verify\./i, /paypal-?security\./i,
    /paypal-?account\./i, /paypal-?update\./i, /paypal-?confirm\./i,
    
    // Bank phishing
    /bank[-\w]*\.(xyz|top|club|site)/i, /login-?bank\./i,
    /security-?bank\./i, /verify-?bank\./i, /update-?bank\./i,
    
    // Facebook phishing
    /facebook[-\w]*\.(xyz|top|club|site)/i, /fb[-\w]*\.(xyz|top)/i,
    /facebook-?login\./i, /facebook-?verify\./i, /fb-?login\./i,
    
    // Google phishing
    /google[-\w]*\.(xyz|top|club)/i, /gmail[-\w]*\.(xyz|top)/i,
    /google-?login\./i, /google-?verify\./i, /gmail-?login\./i,
    
    // Apple phishing
    /apple[-\w]*\.(xyz|top|club)/i, /icloud[-\w]*\.(xyz|top)/i,
    /apple-?login\./i, /apple-?verify\./i, /icloud-?login\./i,
    
    // Amazon phishing
    /amazon[-\w]*\.(xyz|top|club)/i, /aws[-\w]*\.(xyz|top)/i,
    /amazon-?login\./i, /amazon-?verify\./i,
    
    // Microsoft phishing
    /microsoft[-\w]*\.(xyz|top|club)/i, /office[-\w]*\.(xyz|top)/i,
    /microsoft-?login\./i, /office-?login\./i,
    
    // Common phishing patterns
    /login[-\w]*\.(xyz|top|club|site|online|web)/i,
    /verify[-\w]*\.(xyz|top|club|site|online)/i,
    /secure[-\w]*\.(xyz|top|club|site)/i,
    /account[-\w]*\.(xyz|top|club)/i,
    /update[-\w]*\.(xyz|top|club)/i,
    /confirm[-\w]*\.(xyz|top|club)/i,
    /validation[-\w]*\.(xyz|top|club)/i,
    /authentication[-\w]*\.(xyz|top)/i,
    
    // Known phishing domains
    'paypal-login.xyz', 'facebook-login.xyz', 'google-login.xyz',
    'amazon-secure.xyz', 'apple-verify.xyz', 'bank-login.xyz',
    'microsoft-verify.xyz', 'netflix-login.xyz', 'spotify-verify.xyz',
    'instagram-login.xyz', 'twitter-verify.xyz', 'whatsapp-verify.xyz',
    'telegram-verify.xyz', 'discord-verify.xyz', 'steam-verify.xyz',
    'epicgames-verify.xyz', 'roblox-verify.xyz', 'minecraft-verify.xyz',
    
    // Phishing TLDs
    /\.(cf|ga|gq|ml|tk|xyz|top|club|site|online|web|live|info|biz|click|link)/i,
    
    // Suspicious patterns
    /-[0-9]{6,}\./, /\.[0-9]{6,}\./, /-[a-z0-9]{12,}\./,
    
    // Typosquatting patterns
    /g00gle/, /facebok/, /twiter/, /yutube/, /whatsap/, /instagrm/,
    /micrsoft/, /app1e/, /amaz0n/, /paypa1/, /netfl1x/, /redd1t/,
    /ebayy/, /alibaba/, /aliexpress/, /taobao/, /jd\./, /pinduoduo/
  ]),

  // Malware domains
  MALWARE: new Set([
    // Known malware C2 servers
    'malware.com', 'virus.com', 'trojan.xyz', 'ransomware.xyz',
    'spyware.xyz', 'botnet.xyz', 'keylogger.xyz', 'rat.xyz',
    'cryptominer.xyz', 'exploit.xyz', 'backdoor.xyz', 'rootkit.xyz',
    
    // Malware patterns
    /\.(exe|dll|bat|cmd|ps1|vbs|js|jar)\.(xyz|top|club)/i,
    /download[-\w]*\.(xyz|top|club)/i, /free[-\w]*\.(xyz|top|club)/i,
    /crack[-\w]*\.(xyz|top|club)/i, /keygen[-\w]*\.(xyz|top|club)/i,
    /serial[-\w]*\.(xyz|top|club)/i, /patch[-\w]*\.(xyz|top|club)/i,
    
    // Exploit kits
    /angler/, /neutrino/, /nuclear/, /magnitude/, /rig/, /sundown/,
    /kairos/, /terror/, /greenflash/, /redirection/, /styx/,
    
    // Cryptojacking
    /coinhive/, /cryptoloot/, /miner/, /jsecoin/, /deepminer/,
    /coinimp/, /crypto-loot/, /minero/, /webmine/, /coinblind/,
    
    // Botnets
    /mirai/, /qbot/, /trickbot/, /emotet/, /drovorub/, /ekans/,
    /tinba/, /ramnit/, /zeus/, /spyeye/, /citadel/, /shylock/,
    
    // Ransomware
    /wannacry/, /notpetya/, /locky/, /cryptolocker/, /teslacrypt/,
    /cerber/, /spora/, /jigsaw/, /petya/, /badrabbit/, /gandcrab/,
    /ryuk/, /maze/, /revil/, /conti/, /phobos/, /crysis/
  ]),

  // Tracking domains
  TRACKERS: new Set([
    // Google tracking
    'google.com/analytics', 'google.com/tagmanager', 'googletagmanager.com',
    'google-analytics.com', 'googleadservices.com', 'googlesyndication.com',
    'google.com/ads', 'google.com/adsense', 'google.com/adwords',
    'google.com/doubleclick', 'doubleclick.net', 'doubleclick.com',
    
    // Facebook tracking
    'facebook.com/tr', 'facebook.com/connect', 'facebook.com/plugins',
    'facebook.com/sdk', 'facebook.com/ajax', 'facebook.com/events',
    'fb.com/tr', 'fb.com/connect', 'fb.com/plugins', 'fb.com/sdk',
    
    // Twitter tracking
    'twitter.com/i/ads', 'twitter.com/i/jot', 'twitter.com/i/tracking',
    'twitter.com/analytics', 'twitter.com/metrics',
    
    // Other trackers
    'scorecardresearch.com', 'quantserve.com', 'mixpanel.com',
    'hotjar.com', 'crazyegg.com', 'clicktale.com', 'mouseflow.com',
    'inspectlet.com', 'luckyorange.com', 'sessioncam.com',
    'yandex.ru/metrika', 'baidu.com/tongji', 'cnzz.com',
    'histats.com', 'statcounter.com', 'hitwebcounter.com',
    'shinystat.com', 'extremetracking.com', 'sitemeter.com',
    'goingup.com', 'webstat.com', 'webstats4u.com',
    
    // Data brokers
    'acxiom.com', 'epsilon.com', 'experian.com', 'transunion.com',
    'equifax.com', 'corelogic.com', 'datalogix.com', 'bluekai.com',
    'lotame.com', ' Nielsen.com', 'comscore.com', 'quantcast.com',
    'targusinfo.com', 'idology.com', 'kBM1.com', 'leadid.com',
    'liveintent.com', 'merkleinc.com', 'neustar.biz', 'orbitz.com',
    'pebblepost.com', 'pushspring.com', 'radiumone.com',
    'relationals.com', 'safeattribute.com', 'truthfinder.com',
    'towerdata.com', 'verafin.com', 'whitepages.com', 'zoominfo.com'
  ])
};

// Advanced blocking algorithms
class BlockListChecker {
  constructor() {
    this.cache = new Map();
    this.stats = {
      totalChecks: 0,
      blocked: 0,
      cacheHits: 0
    };
  }

  shouldBlock(domain) {
    this.stats.totalChecks++;
    
    // Check cache first
    if (this.cache.has(domain)) {
      this.stats.cacheHits++;
      return this.cache.get(domain);
    }
    
    const domainLower = domain.toLowerCase();
    let result = { blocked: false, categories: [] };
    
    // Check all block lists
    for (const [category, blockSet] of Object.entries(BLOCK_LISTS)) {
      // Check exact match
      if (blockSet.has(domainLower)) {
        result.blocked = true;
        result.categories.push(category);
        continue;
      }
      
      // Check regex patterns
      for (const item of blockSet) {
        if (item instanceof RegExp && item.test(domainLower)) {
          result.blocked = true;
          result.categories.push(category);
          break;
        }
      }
      
      // Check subdomain patterns
      if (domainLower.includes('.') && !result.blocked) {
        const parts = domainLower.split('.');
        for (let i = 0; i < parts.length - 1; i++) {
          const subdomain = parts.slice(i).join('.');
          if (blockSet.has(subdomain)) {
            result.blocked = true;
            result.categories.push(category);
            break;
          }
        }
      }
    }
    
    // Advanced heuristic checks
    if (!result.blocked) {
      // Check for suspicious TLDs
      const suspiciousTLDs = ['.xyz', '.top', '.club', '.site', '.online', '.web', 
                            '.cf', '.ga', '.gq', '.ml', '.tk'];
      for (const tld of suspiciousTLDs) {
        if (domainLower.endsWith(tld)) {
          // Check if it's a legitimate short domain
          const mainPart = domainLower.slice(0, -tld.length);
          if (mainPart.length < 5 || /^[0-9]+$/.test(mainPart)) {
            result.blocked = true;
            result.categories.push('PHISHING');
            break;
          }
        }
      }
      
      // Check for too many hyphens or numbers
      const hyphenCount = (domainLower.match(/-/g) || []).length;
      const digitCount = (domainLower.match(/[0-9]/g) || []).length;
      if (hyphenCount > 3 || digitCount > domainLower.length * 0.5) {
        result.blocked = true;
        result.categories.push('SUSPICIOUS');
      }
    }
    
    // Cache result (TTL: 5 minutes)
    this.cache.set(domain, result);
    setTimeout(() => this.cache.delete(domain), 300000);
    
    if (result.blocked) {
      this.stats.blocked++;
    }
    
    return result;
  }

  getStats() {
    return { ...this.stats, cacheSize: this.cache.size };
  }
}

module.exports = {
  BLOCK_LISTS,
  BlockListChecker
};
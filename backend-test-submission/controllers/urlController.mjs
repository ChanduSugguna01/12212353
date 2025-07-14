import urlDatabase from '../models/urlModel.mjs';
import { nanoid } from 'nanoid';
import geoip from 'geoip-lite';
import { logInfo, logError, logDebug } from '../../logging-middleware/logger.mjs';

export const createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  logDebug(`Creating short URL for: ${url}`);

  if (!url || typeof url !== 'string') {
    logError('Invalid URL format.');
    return res.status(400).json({ error: 'Invalid URL format.' });
  }

  const code = shortcode || nanoid(6);
  if (urlDatabase[code]) {
    logError(`Shortcode collision: ${code}`);
    return res.status(409).json({ error: 'Shortcode already exists.' });
  }

  const expiryDate = new Date(Date.now() + validity * 60000);
  urlDatabase[code] = {
    originalUrl: url,
    createdAt: new Date(),
    expiresAt: expiryDate,
    clicks: []
  };

  logInfo(`Short URL created: ${code} -> ${url}`);

  res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiryDate.toISOString()
  });
};

export const redirectUrl = (req, res) => {
  const code = req.params.shortcode;
  const record = urlDatabase[code];

  if (!record) {
    logError(`Redirection failed: shortcode not found (${code})`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  const now = new Date();
  if (now > new Date(record.expiresAt)) {
    logError(`Shortcode expired: ${code}`);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  const geo = geoip.lookup(req.ip) || { city: 'Unknown', country: 'Unknown' };
  record.clicks.push({
    time: new Date(),
    referrer: req.get('Referrer') || 'Direct',
    location: `${geo.city}, ${geo.country}`
  });

  logInfo(`Redirecting to: ${record.originalUrl} [${code}]`);
  res.redirect(record.originalUrl);
};

export const getStats = (req, res) => {
  const code = req.params.shortcode;
  const record = urlDatabase[code];

  if (!record) {
    logError(`Stats request failed: shortcode not found (${code})`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  logDebug(`Returning stats for: ${code}`);

  res.json({
    originalUrl: record.originalUrl,
    createdAt: record.createdAt,
    expiresAt: record.expiresAt,
    totalClicks: record.clicks.length,
    clicks: record.clicks
  });
};

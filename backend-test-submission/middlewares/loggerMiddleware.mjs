import { logInfo, logError, logDebug } from '../../logging-middleware/logger.mjs';

export default function loggerMiddleware(req, res, next) {
  logInfo(`${req.method} ${req.originalUrl}`);
  next();
}

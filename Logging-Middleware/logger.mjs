export function logInfo(message) {
  const timestamp = new Date().toISOString();
  process.stdout.write(`[INFO] [${timestamp}] ${message}\n`);
}

export function logError(message) {
  const timestamp = new Date().toISOString();
  process.stderr.write(`[ERROR] [${timestamp}] ${message}\n`);
}

export function logDebug(message) {
  const timestamp = new Date().toISOString();
  process.stdout.write(`[DEBUG] [${timestamp}] ${message}\n`);
}

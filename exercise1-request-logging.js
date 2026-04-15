const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'request.log');

function requestLogger(req, res, next) {
  const start = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
    const logLine = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms\n`;

    fs.appendFile(logFilePath, logLine, (err) => {
      if (err) {
        console.error('Failed to write request log:', err);
      }
    });
  });

  next();
}

module.exports = requestLogger;

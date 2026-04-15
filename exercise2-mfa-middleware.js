const jwt = require('jsonwebtoken');

function verifyOtp(userId, otp) {
  // Replace this placeholder with a real OTP validation implementation.
  return typeof otp === 'string' && otp.trim().length === 6;
}

function mfaMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.slice(7).trim();
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch (err) {
    return res.status(401).json({ error: 'Invalid JWT token' });
  }

  const otp = req.body?.otp || req.headers['x-otp-code'] || req.query?.otp;
  if (!verifyOtp(payload.sub || payload.id, otp)) {
    return res.status(403).json({ error: 'Invalid or missing OTP code' });
  }

  req.user = payload;
  next();
}

module.exports = mfaMiddleware;

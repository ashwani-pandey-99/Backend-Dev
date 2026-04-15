function sanitizeString(value) {
  if (typeof value !== 'string') {
    return value;
  }

  return value
    .replace(/[<>&"'`]/g, (char) => {
      const escapes = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
      };
      return escapes[char] || char;
    })
    .replace(/\b(select|insert|update|delete|drop|union|truncate|exec|alter|create|grant|revoke)\b/gi, '');
}

function sanitizeObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = sanitizeObject(obj[key]);
      return acc;
    }, {});
  }

  return sanitizeString(obj);
}

function dataSanitization(req, res, next) {
  req.body = sanitizeObject(req.body);
  req.query = sanitizeObject(req.query);
  req.params = sanitizeObject(req.params);
  next();
}

module.exports = dataSanitization;

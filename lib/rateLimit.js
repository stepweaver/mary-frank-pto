// Simple in-memory rate limiting for API endpoints
const rateLimitMap = new Map();

export function rateLimit(identifier, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }

  const requests = rateLimitMap.get(identifier);

  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);

  if (validRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Add current request
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);

  return true; // Request allowed
}

// Clean up old entries periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [identifier, requests] of rateLimitMap.entries()) {
      const validRequests = requests.filter(timestamp => now - timestamp < 300000); // 5 minutes
      if (validRequests.length === 0) {
        rateLimitMap.delete(identifier);
      } else {
        rateLimitMap.set(identifier, validRequests);
      }
    }
  }, 300000);
}

import { verifyToken } from '../utils/jwt.js';

export function optionalAuth(req, _res, next) {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = verifyToken(token);
  } catch {
    req.user = null;
  }

  return next();
}

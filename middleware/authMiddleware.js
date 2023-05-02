import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
  // Get the JWT from the request headers
  let token = req.headers.authorization?.replace('Bearer ', '');
 
  // const accessToken = req.headers.authorization.split(' ')[1];
  // const decodedToken = jwt.verify(accessToken, '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');

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}


import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' }); 
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token' }); 
        } else {
          // Log the full error for debugging, but don't expose details to the client
          console.error('JWT Verification Error:', err); 
          return res.status(401).json({ message: 'Authentication failed' }); 
        }
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing' }); 
  }
};

export default authenticateJWT;
const jwt = require("jsonwebtoken");

const auth = (allowRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.replace("Bearer ", "").trim();

      if (!token) {
        return res.status(401).json({
          message: "No token provided",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      if (!allowRoles.includes(decoded.role)) {
        return res.status(403).json({
          message: "You are not authorized to access this route",
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  };
};

module.exports = { auth };

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No auth header or invalid auth header format");
    return res.status(401).json("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);
  if (!token) {
    console.log("No token found");
    return res.status(401).json("Unauthorized");
  }

  jwt.verify(token, process.env.JWTKEY, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json("Unauthorized");
    }
    console.log("Token verified, user:", user);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;

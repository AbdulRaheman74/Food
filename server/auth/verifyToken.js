import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.body.userId = decoded.user; // Corrected according to generateToken
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default verifyToken;

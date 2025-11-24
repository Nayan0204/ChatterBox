import jwt from "jsonwebtoken";

export const requiresignin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // get token after Bearer
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "El token es obligatorio" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // Guardamos los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado, solo administradores" });
  }
  next();
};
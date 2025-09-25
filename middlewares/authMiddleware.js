import passport from "passport";

// Middleware para validacion de token
export const verifyToken = passport.authenticate("jwt", { session: false });

// Middleware para validacion de admin
export const verifyAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (req.user.rol === 1) return next(); 
  return res.status(403).json({ error: "Acceso solo para administradores" });
};

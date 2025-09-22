export const isAdmin = (req, res, next) => {

// Varifica autorizacion
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  
// Verifica rol
  if (req.user.rol && req.user.rol === "admin") return next();
  return res.status(403).json({ error: "Acceso solo para administradores" });
};

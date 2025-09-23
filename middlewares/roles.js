export const siEsAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (req.user.rol === 1) return next();
  return res.status(403).json({ error: "Acceso solo para administradores" });
};

// Solo usuarios normales
export const siEsUser = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (req.user.rol === 2) return next();
  return res.status(403).json({ message: "No tienes permisos" });
};

next();

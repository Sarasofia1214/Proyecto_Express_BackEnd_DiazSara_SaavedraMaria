export const siEsAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (req.user.rol === 1) return next(); 
  return res.status(403).json({ error: "Acceso solo para administradores" });
};

export const siEsUser = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (req.user.rol === 2) return next();  
  return res.status(403).json({ message: "No tienes permisos" });
};

export const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (!roles.includes(req.user.rol)) {
    return res.status(403).json({ message: "No tienes permisos" });
  }
  next();
};

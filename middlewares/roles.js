export const isAdmin = (req, res, next) => {

// Varifica autorizacion
  if (!req.user) return res.status(401).json({ error: "No autorizado" });

// Verifica rol
  if (req.user.rol && req.user.rol === 1) return next();
  return res.status(403).json({ error: "Acceso solo para administradores" });
};

export const isUser = (req, res, next) => {
  if (req.user.rol !== 2) { 
    return res.status(403).json({ message: "No tienes permisos" });
  }
  next();
};

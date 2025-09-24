// routes/authRoutes.js
import { Router } from "express";
import { body, validationResult } from "express-validator";
import AuthController from "../controllers/authController.js";

const router = Router();

// Validadores con express-validator
const validarRegistro = [
  body("usuario")
    .isString().withMessage("El usuario debe ser texto")
    .isLength({ min: 3 }).withMessage("El usuario debe tener mínimo 3 caracteres")
    .trim().escape(),
  body("password")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener mínimo 8 caracteres")
    .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/\d/).withMessage("La contraseña debe contener al menos un número")
    .matches(/[@$!%*?&]/).withMessage("La contraseña debe contener al menos un carácter especial (@$!%*?&)"),
];

// Validación de login
const validarLogin = [
  body("usuario").notEmpty().withMessage("El usuario es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

// Middleware para manejar errores
const manejarErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rutas
router.post("/register", validarRegistro, manejarErrores, AuthController.register);
router.post("/login", validarLogin, manejarErrores, AuthController.login);

export default router;

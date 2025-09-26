// routes/peliculasRoutes.js
import { Router } from "express";
import { body, validationResult } from "express-validator";
import PeliculasController from "../controllers/peliculasController.js";
import { siEsAdmin } from "../middlewares/roles.js";
import passport from "passport";
import PeliculasModel from "../models/peliculasModel.js";

const router = Router();
const peliculasModel = new PeliculasModel();

// Validación de creación/actualización
const validarPelicula = [
  body("titulo")
    .notEmpty().withMessage("El título es obligatorio")
    .custom(async (value) => {
      const existente = await peliculasModel.findByTitulo(value);
      if (existente) {
        throw new Error("Ya existe una película con este título");
      }
      return true;
    }),
  body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
  body("año").isInt({ min: 1888 }).withMessage("Año no válido"), // 1888 = primera película
];

// Middleware para manejar errores de validación
const manejarErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rutas protegidas para admin
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  siEsAdmin,
  validarPelicula,
  manejarErrores,
  PeliculasController.create
);

export default router;

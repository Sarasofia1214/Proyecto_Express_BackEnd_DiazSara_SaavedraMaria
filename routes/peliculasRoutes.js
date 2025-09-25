import { Router } from "express";
import { body, validationResult } from "express-validator";
import PeliculasController from "../controllers/peliculasController.js";
import { siEsAdmin } from "../middlewares/roles.js";
import PeliculaModel from "../models/peliculasModel.js";

const router = Router();
const peliculaModel = new PeliculaModel();

// Valdaion con express-validator
const validarPelicula = (isUpdate = false) => [
  body("titulo")
    .notEmpty().withMessage("El título es obligatorio")
    .isString().withMessage("El título debe ser texto")
    .custom(async (value, { req }) => {
      const tituloNormalizado = value.trim().toLowerCase();
      const existe = await peliculaModel.findByTitulo(tituloNormalizado);
      if (existe) {
// Si existe ignoramos la misma película
        if (!isUpdate || existe._id.toString() !== req.params.id.toString()) {
          throw new Error("Ya existe una película con este título");
        }
      }
      return true;
    }),


  body("descripcion")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isString().withMessage("Debe ser texto"),
  body("año")
    .isInt({ min: 1888 }).withMessage("El año debe ser un número válido"),
];


// Middleware para manejar errores de validación
const manejarErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/", siEsAdmin, validarPelicula(), manejarErrores, PeliculasController.create);
router.put("/:id", siEsAdmin, validarPelicula(true), manejarErrores, PeliculasController.update);
router.get("/", PeliculasController.getAll);
router.get("/:id", PeliculasController.getById);

export default router;

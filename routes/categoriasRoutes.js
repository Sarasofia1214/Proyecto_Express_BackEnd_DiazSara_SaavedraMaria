import { Router } from "express";
import { body, validationResult } from "express-validator";
import CategoriasController from "../controllers/categoriasController.js";
import { siEsAdmin } from "../middlewares/roles.js";
import passport from "passport";
import CategoriaModel from "../models/categoriasModel.js";

const router = Router();
const categoriaModel = new CategoriaModel();


const validarCategoria = [
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio")
    .custom(async (value) => {
      const existente = await categoriaModel.findByNombre(value);
      if (existente) {
        throw new Error("Ya existe una categoría con este nombre");
      }
      return true;
    }),
  body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
];


const manejarErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


router.get("/", CategoriasController.getAll);
router.get("/:id", CategoriasController.getById);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  siEsAdmin,
  validarCategoria,
  manejarErrores,
  CategoriasController.create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  siEsAdmin,
  validarCategoria,
  manejarErrores,
  CategoriasController.update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  siEsAdmin,
  CategoriasController.delete
);

export default router;

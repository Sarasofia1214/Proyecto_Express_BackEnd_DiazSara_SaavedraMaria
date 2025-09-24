import express from "express";
import passport from "passport";
import { body, validationResult } from "express-validator";
import * as PeliculaCtrl from "../controllers/peliculasController.js";
import { allowRoles } from "../middlewares/roles.js";

const router = express.Router();

router.get("/", PeliculaCtrl.getPeliculas);

router.get("/:id", PeliculaCtrl.getPelicula);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
// solo admin puede crear
  allowRoles(1), 
  body("titulo").isString().notEmpty(),
  body("descripcion").isString().notEmpty(),
  body("año").isInt(),
  body("imagen").isURL(),
  body("id_categoria").isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    return PeliculaCtrl.createPelicula(req, res);
  }
);

// PUT película para el admin
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  allowRoles(1),
  async (req, res) => {
    return PeliculaCtrl.updatePelicula(req, res);
  }
);

// DELETE película para el admin
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  allowRoles(1),
  PeliculaCtrl.deletePelicula
);

export default router;

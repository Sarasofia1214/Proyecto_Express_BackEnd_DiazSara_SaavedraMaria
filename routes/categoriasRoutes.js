import express from "express";
import passport from "passport";
import { body, validationResult } from "express-validator";
import * as CatCtrl from "../controllers/categoriasController.js";
import { isAdmin } from "../middlewares/roles.js";

const router = express.Router();

// Rate limiter
import rateLimit from "express-rate-limit";
const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 }); 

//Obtener todas
router.get("/", limiter, CatCtrl.getCategorias);

// GET por id
router.get("/:id", limiter, CatCtrl.getCategoria);

// POST crear (admin)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  body("nombre").isString().notEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    return CatCtrl.createCategoria(req, res);
  }
);

// PUT actualizar (admin)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  body("nombre").isString().notEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    return CatCtrl.updateCategoria(req, res);
  }
);

// DELETE (admin)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  CatCtrl.deleteCategoria
);

export default router;

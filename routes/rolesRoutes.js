import express from "express";
import passport from "passport";
import PerfilController from "../controllers/perfilController.js"; 
import { allowRoles } from "../middlewares/roles.js"; //

const router = express.Router();
router.get(
  "/perfil",
  passport.authenticate("jwt", { session: false }),
  allowRoles(1, 2),
  PerfilController.getPerfil
);

export default router;

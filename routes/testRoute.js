import { Router } from "express";
import { verifyToken } from "../middlewares/authMidddleware.js";

const router = Router();

router.get("/protegida", verifyToken, (req, res) => {
  res.json({ message: "Acceso concedido", usuario: req.user });
});

export default router;

import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use("/api/auth", authRoutes);

// Ruta protegida de prueba
app.get(
  "/api/protegida",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Accediste a una ruta protegida", usuario: req.user });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

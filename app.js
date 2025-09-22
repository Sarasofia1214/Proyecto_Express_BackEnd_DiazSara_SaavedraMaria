// server.js (esquema)
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import passport from "passport";
import passportConfig from "./config/passport.js"; 
import categoriasRoutes from "./routes/categoriasRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoute.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());


app.use(passport.initialize());
passportConfig;

app.use("/api/test", testRoutes);

app.use("/api/categorias", categoriasRoutes);

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => res.send("KarenFlix API"));

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (err) {
    console.error("No se pudo iniciar:", err.message);
  }
};

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

start();

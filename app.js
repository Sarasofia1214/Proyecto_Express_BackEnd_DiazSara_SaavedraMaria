import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import peliculasRoutes from "./routes/peliculasRoutes.js"; 
import categoriasRoutes from "./routes/categoriasRoutes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

const swaggerDocument = YAML.load("./swagger/karenfli.yaml"); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


await connectDB(); 
const startServer = async () => {
  await connectDB();

  app.use("/api/auth", authRoutes);
  app.use("/api/peliculas", peliculasRoutes);
  app.use("/api/categorias", categoriasRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor en http://38.242.206.120:${PORT}`);
  });
};

startServer().catch(err => {
  console.error("Error arrancando el servidor:", err);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en http://38.242.206.120:${PORT}`);
});

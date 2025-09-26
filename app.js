import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import peliculasRoutes from "./routes/peliculasRoutes.js"; 
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();
const app = express();

app.use(express.json());
app.use(passport.initialize());

// Configuración mínima de CORS
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Swagger
const swaggerDocument = YAML.load("./swagger/karenfli.yaml"); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/peliculas", peliculasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Servidor en http://0.0.0.0:${PORT}`);
});

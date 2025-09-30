import passport from "passport"
import cors from "cors";
import express from "express"
import dotenv from "dotenv"
import { initDb, disconnect } from "./utils/database.js"
import routerAuth from "./auth/routes.js"
import routerUser from "./Routes/userRoutes.js"
import routerMovie from "./Routes/peliculaRoutes.js"
import routerResena from "./Routes/resenaRoutes.js"
import routerReaccion from "./Routes/reaccionRoutes.js"
import rateLimit from "express-rate-limit";

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

dotenv.config()

async function startServer() {
  const app = express();
  const PORT = process.env.PORT

  // Initialize database connection
  await initDb();

  app.use(express.json());
  app.use(passport.initialize());

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2000,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { ok: false, error: "Too many requests" },
  });
  app.use(apiLimiter);


  app.use(cors({
      origin: [
        "http://62.169.28.169",
        "http://62.169.28.169/docs",
        "http://localhost:3000",
        "http://0.0.0.0",
        "http://127.0.0.1:5500",
        "http://127.0.0.1:5501"
      ],
      methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
      allowedHeaders: ["Content-Type","Authorization"],
      credentials: false
    }));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/auth',routerAuth)
  app.use('/movies',routerMovie)
  app.use('/users',routerUser)
  app.use('/resenas',routerResena)
  app.use('/reacciones',routerReaccion)

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await disconnect();
    process.exit(0);
  });
}

startServer().catch(console.error);



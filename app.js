import passport from "passport"
import cors from "cors";
import express from "express"
import dotenv from "dotenv"
import routerAuth from "./auth/routes.js"
import routerUser from "./Routes/userRoutes.js"
import routerMovie from "./Routes/peliculaRoutes.js"
import routerResena from "./Routes/resenaRoutes.js"
import routerReaccion from "./Routes/reaccionRoutes.js"
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(passport.initialize());

app.use(cors({
    origin: [
      "http://62.169.28.169",          // tu host donde ves Swagger
      "http://62.169.28.169/docs",     // si usas swagger-ui en /docs
      "http://localhost:3000"         // si lo abres local
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
app.use('./reacciones',routerReaccion)


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



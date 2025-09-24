import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const userModel = new UserModel();

export default class AuthController {
  static async register(req, res) {
    try {
      const { usuario, password } = req.body; 
      if (!usuario || !password) {
        return res.status(400).json({ message: "Faltan credenciales" });
      }

// Verificacion para ver si existe el user
      const existingUser = await userModel.findByUsuario(usuario);
      if (existingUser) {
        return res.status(400).json({ message: "Usuario ya existente" });
      }

// Hashear contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

// Siempre registrar con rol 2, que viene siendo usuario
      const newUser = await userModel.create({
        usuario,
        password: hashedPassword,
        rol: 2,
      });

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        usuario: newUser.usuario,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { usuario, password } = req.body;
      if (!usuario || !password) {
        return res.status(400).json({ message: "Faltan credenciales" });
      }

      const user = await userModel.findByUsuario(usuario);
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

// Generar token con rol incluido
      const token = jwt.sign(
        { id: user._id, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Acceso concedido",
        usuario: { id: user._id, rol: user.rol },
        token,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

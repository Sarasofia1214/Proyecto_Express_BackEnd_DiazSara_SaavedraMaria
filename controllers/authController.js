import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const userModel = new UserModel();

export default class AuthController {
  static async register(req, res) {
    try {
      const { usuario, password, rol } = req.body;
      if (!usuario || !password || !rol) {
        return res.status(400).json({ message: "Faltan credenciales" });
      }

      const existingUser = await userModel.findByUsuario(usuario);
      if (existingUser) {
        return res.status(400).json({ message: "Usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        usuario,
        password: hashedPassword,
        rol,
      });

      res.status(201).json({ message: "Usuario registrado exitosamente", usuario: newUser.usuario });
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

      // Token con id y rol
      const token = jwt.sign(
        { id: user._id, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "¡Acceso concedido!",
        token,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

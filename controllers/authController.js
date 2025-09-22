import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const { usuario, password, rol } = req.body;
      if (!usuario || !password || !rol) {
        return res.status(400).json({ message: "Faltan campos" });
      }

      const userModel = new UserModel();
      const collection = await userModel.connect();

      const existingUser = await collection.findOne({ usuario });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await collection.insertOne({
        usuario,
        password: hashedPassword,
        rol,
      });

      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (e) {
      console.e("Error en register:", e);
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  }

  static async login(req, res) {
    try {
      const { usuario, password } = req.body;
      if (!usuario || !password) {
        return res.status(400).json({ message: "Faltan credenciales" });
      }

      const userModel = new UserModel();
      const collection = await userModel.connect();

      const user = await collection.findOne({ usuario });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

// generar token
      const token = jwt.sign(
        { id: user._id, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login exitoso", token });
    } catch (e) {
      console.error("Error en login:", e);
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  }
}

export default AuthController;

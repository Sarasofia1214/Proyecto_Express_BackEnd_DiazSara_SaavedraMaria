import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

// Usuario sugiere película (queda "pendiente")
export const sugerirPelicula = async (req, res) => {
  try {
    const db = getDB();
    const { titulo, descripcion, director, anio } = req.body;

    const nuevaPelicula = {
      titulo,
      descripcion,
      director,
      año,
      estado: "pendiente",
      creadaPor: req.user.id, // usuario autenticado
      createdAt: new Date()
    };

    await db.collection("peliculas").insertOne(nuevaPelicula);
    res.status(201).json({ message: "Película sugerida. Espera aprobación del administrador." });
  } catch (error) {
    res.status(500).json({ error: "Error al sugerir película" });
  }
};

// Admin crea película directamente aprobada
export const crearPelicula = async (req, res) => {
  try {
    const db = getDB();
    const { titulo, descripcion, director, anio } = req.body;

    const nuevaPelicula = {
      titulo,
      descripcion,
      director,
      anio,
      estado: "aprobada",
      creadaPor: req.user.id,
      createdAt: new Date()
    };

    await db.collection("peliculas").insertOne(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    res.status(500).json({ error: "Error al crear película" });
  }
};

// Admin aprueba sugerencia
export const aprobarPelicula = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("peliculas").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { estado: "aprobada" } },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ error: "Película no encontrada" });
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Error al aprobar película" });
  }
};

// Listar todas aprobadas
export const listarPeliculas = async (req, res) => {
  try {
    const db = getDB();
    const peliculas = await db.collection("peliculas").find({ estado: "aprobada" }).toArray();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

// Admin elimina película
export const eliminarPelicula = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("peliculas").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Película no encontrada" });

    res.json({ message: "Película eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar película" });
  }
};

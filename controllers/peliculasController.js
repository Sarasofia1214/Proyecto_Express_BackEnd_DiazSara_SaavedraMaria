import PeliculaModel from "../models/peliculasModel.js";
const peliculaModel = new PeliculaModel();

export default class PeliculasController {
//Creacion de pelicula
  static async create(req, res) {
    try {
      const id = await peliculaModel.create(req.body);
      res.status(201).json({ message: "Película creada", id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creando la película" });
    }
  }
// Actualizacion de pelicula
  static async update(req, res) {
    try {
      const pelicula = await peliculaModel.update(req.params.id, req.body);
      if (!pelicula.value) {
        return res.status(404).json({ error: "Película no encontrada" });
      }
      res.json({ message: "Película actualizada", pelicula: pelicula.value });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error actualizando la película" });
    }
  }
// Obtener todas las peliculas
  static async getAll(req, res) {
    try {
      const peliculas = await peliculaModel.findAll();
      res.json(peliculas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error obteniendo películas" });
    }
  }

// Obterner por id
  static async getById(req, res) {
    try {
      const pelicula = await peliculaModel.findById(req.params.id);
      if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
      res.json(pelicula);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error obteniendo la película" });
    }
  }
}

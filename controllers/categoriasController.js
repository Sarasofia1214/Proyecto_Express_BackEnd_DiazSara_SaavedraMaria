import CategoriaModel from "../models/categoriasModel.js";
const categoriaModel = new CategoriaModel();

export default class CategoriasController {
  static async create(req, res) {
    try {
      const id = await categoriaModel.create(req.body);
      res.status(201).json({ message: "Categoría creada", id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creando la categoría" });
    }
  }

  static async update(req, res) {
    try {
      const categoria = await categoriaModel.update(req.params.id, req.body);
      if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
      res.json({ message: "Categoría actualizada", categoria });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error actualizando la categoría" });
    }
  }

 static async getAll(req, res) {
  console.log("Llegó petición a getAll");
  res.json({ message: "Prueba de ruta categorias funcionando" });
}


  static async getById(req, res) {
    try {
      const categoria = await categoriaModel.findById(req.params.id);
      if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
      res.json(categoria);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error obteniendo la categoría" });
    }
  }

  static async delete(req, res) {
    try {
      const eliminado = await categoriaModel.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ error: "Categoría no encontrada" });
      res.json({ message: "Categoría eliminada" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error eliminando la categoría" });
    }
  }
}

import * as CatRepo from "../repositories/categoriasRepository.js";

export const getCategorias = async (req, res) => {
  try {
    const items = await CatRepo.findAll();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getCategoria = async (req, res) => {
  try {
    const cat = await CatRepo.findById(req.params.id);
    if (!cat) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(cat);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const exists = await CatRepo.findByName(nombre);
    if (exists) return res.status(400).json({ error: "La categoría ya existe" });
    const result = await CatRepo.create({ nombre });
    res.status(201).json({ insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const id = req.params.id;
// Se validar duplicados por nombre
    await CatRepo.update(id, { nombre });
    res.json({ message: "Categoría actualizada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    await CatRepo.remove(req.params.id);
    res.json({ message: "Categoría eliminada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

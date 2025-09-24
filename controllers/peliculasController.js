import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.DB_NAME;
const collectionName = "peliculas";

// Conectar a la colección
async function getCollection() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

// GET todas las películas
export const getPeliculas = async (req, res) => {
  try {
    const col = await getCollection();
    const peliculas = await col.find().toArray();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo películas", detalle: error.message });
  }
};

// GET una película por ID
export const getPelicula = async (req, res) => {
  try {
    const col = await getCollection();
    const pelicula = await col.findOne({ _id: new ObjectId(req.params.id) });
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo película", detalle: error.message });
  }
};

// POST crear nueva (solo admin)
export const createPelicula = async (req, res) => {
  try {
    const col = await getCollection();
    const { titulo, descripcion, año, imagen, id_categoria } = req.body;

    if (!titulo || !descripcion || !año || !imagen || !id_categoria) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const result = await col.insertOne({
      titulo,
      descripcion,
      año,
      imagen,
      id_categoria: new ObjectId(id_categoria)
    });

    res.json({ message: "Película creada", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error creando película", detalle: error.message });
  }
};

// PUT actualizar película (solo admin)
export const updatePelicula = async (req, res) => {
  try {
    const col = await getCollection();
    const { id } = req.params;
    const updateData = req.body;

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error actualizando película", detalle: error.message });
  }
};

// DELETE película (solo admin)
export const deletePelicula = async (req, res) => {
  try {
    const col = await getCollection();
    const { id } = req.params;

    const result = await col.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando película", detalle: error.message });
  }
};

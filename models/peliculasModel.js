import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export default class PeliculasModel {
  constructor() {
    this.collection = "peliculas";
  }

  async findAll() {
    const db = getDB();
    return await db.collection(this.collection).find().toArray();
  }

  async findById(id) {
    const db = getDB();
    return await db.collection(this.collection).findOne({ _id: new ObjectId(id) });
  }

async findByTitulo(titulo) {
  const db = getDB();
  const tituloNormalizado = titulo.trim().toLowerCase();
  return await db.collection(this.collection).findOne({ titulo: tituloNormalizado });
}



  async create(pelicula) {
    const db = getDB();
// Normalizamos el título antes de guardar para que ignore espacios y mayusculas
    const peliculaNormalizada = {
      ...pelicula,
      titulo: pelicula.titulo.trim().toLowerCase(),
    };
    const result = await db.collection(this.collection).insertOne(peliculaNormalizada);
    return { ...peliculaNormalizada, _id: result.insertedId };
  }

  async update(id, data) {
    const db = getDB();
    const dataNormalizada = {
      ...data,
      titulo: data.titulo.trim().toLowerCase(),
    };
    const result = await db.collection(this.collection).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: dataNormalizada },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const db = getDB();
    const result = await db.collection(this.collection).deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

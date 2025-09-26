import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export default class CategoriaModel {
  constructor() {
    this.collection = "categorias";
  }

  async findAll() {
    const db = getDB();
    return await db.collection(this.collection).find().toArray();
  }

  async findById(id) {
    const db = getDB();
    return await db.collection(this.collection).findOne({ _id: new ObjectId(id) });
  }

  async findByNombre(nombre) {
    const db = getDB();
    return await db.collection(this.collection).findOne({ nombre: nombre.trim().toLowerCase() });
  }

  async create(categoria) {
    const db = getDB();
    const categoriaNormalizada = {
      ...categoria,
      nombre: categoria.nombre.trim().toLowerCase(),
    };
    const result = await db.collection(this.collection).insertOne(categoriaNormalizada);
    return { ...categoriaNormalizada, _id: result.insertedId };
  }

  async update(id, data) {
    const db = getDB();
    const dataNormalizada = {
      ...data,
      nombre: data.nombre.trim().toLowerCase(),
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

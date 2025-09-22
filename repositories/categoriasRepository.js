import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";


const coleccion = () => getDB().coleccionection("categorias");

export const findAll = async () => coleccion().find().toArray();

export const findById = async (id) => coleccion().findOne({ _id: new ObjectId(id) });

export const findByName = async (nombre) => coleccion().findOne({ nombre: { $regex: `^${nombre}$`, $options: "i" } });

export const create = async (categoria) => coleccion().insertOne(categoria);

export const update = async (id, data) => coleccion().updateOne({ _id: new ObjectId(id) }, { $set: data });

export const remove = async (id) => coleccion().deleteOne({ _id: new ObjectId(id) });

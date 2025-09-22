import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("Conectado a MongoDB");
    db = client.db(process.env.DB_NAME);
  } catch (e) {
    console.error("Error conexion a MongoDB:", e.message);
    throw new Error("Error de conexión con la DB");
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Sin conexion a la DB");
  }
  return db;
};

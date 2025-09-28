import {MongoClient} from "mongodb"
import dotenv from "dotenv"
dotenv.config();

const URI = process.env.URI;
const namedb = process.env.DBName;

let client;
let db;

export async function connect(){
  try {
    if (db && client) return db;
    client = new MongoClient(URI);
    await client.connect();
    db = client.db(namedb);
    console.log("Conectado a la base de datos exitosamente ✅")
    return db;
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err.message);
    throw err;
  }
}

export async function disconnect() {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log("🔌 Desconectado de MongoDB");
    }
  } catch (err) {
    console.error("❌ Error desconectando de MongoDB:", err.message);
    throw err;
  }
}

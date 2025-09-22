import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default class UserModel {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.dbName = process.env.DB_NAME;
  }

// Conexion base de datos
  async _collection() {
    try {
      if (!this.client.topology?.isConnected()) {
        await this.client.connect();
      }
      return this.client.db(this.dbName).collection("usuarios");
    } catch (e) {
      console.error("Fallo de conexión:", e);
      throw error;
    }
  }

  async connect() {
    return this._collection();
  }

  async create(user) {
    const collection = await this._collection();
    return collection.insertOne(user);
  }

}

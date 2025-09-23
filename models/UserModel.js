import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default class UserModel {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.dbName = process.env.DB_NAME;
  }

  async connect() {
    if (!this.client.topology?.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection("usuarios");
  }

  async create(user) {
    const col = await this.connect();
    const result = await col.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  async findByUsuario(usuario) {
    const col = await this.connect();
    return await col.findOne({ usuario });
  }

  async findById(id) {
    const col = await this.connect();
    return await col.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
  }
}

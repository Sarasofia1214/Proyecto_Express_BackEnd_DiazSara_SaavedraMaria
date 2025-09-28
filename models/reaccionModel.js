import { connect,disconnect } from "../utils/database.js";

export class reaccion{
    constructor(id_usuario,id_resena,like,dislike){
        this.id_usuario=id_usuario;
        this.id_resena=id_resena;
        this.like=like;
        this.dislike=dislike;
    }
//93876
    async create(req){
        const db = await connect()
        const newReaccion = {
            id_usuario: req.id_usuario,
            id_resena: req.id_resena,
            like: req.like,
            dislike: req.dislike
        }
        const result = db.collection('REACCIONES').insertOne(newReaccion)
        await disconnect()
        return result
    }

    async list(){
        const db = await connect()
        const result = await db.collection('REACCIONES').find().toArray()
        await disconnect()
        return result
    }

    async update(id,req){
        const db = await connect()
        const upData = {
            id_usuario: req.id_usuario,
            id_resena: req.id_resena,
            like: req.like,
            dislike: req.dislike
        }
        const result = await db.collection('REACCIONES').updateOne({_id:id},{$set:upData})
        await disconnect()
        return result
    }

    async delete(id){
        const db = await connect()
        const result = await db.collection('REACCIONES').deleteOne({_id:id})
        await disconnect()
        return result
    }
}
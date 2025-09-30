import { db } from "../utils/database.js";
import { ObjectId } from "mongodb";

export class resena{
    constructor(id_usuario,id_pelicula,comentario,calificacion){
        this.id_usuario=id_usuario;
        this.id_pelicula=id_pelicula;
        this.comentario=comentario;
        this.calificacion=calificacion;
        this.date= new Date();
    }

    async create(id_usuario,id_pelicula,comentario,calificacion){
        const newResena = {
            id_usuario: new ObjectId(id_usuario),
            id_pelicula: new ObjectId(id_pelicula),
            comentario: comentario,
            calificacion: Number(calificacion),
            fecha: new Date()
         }
        const result = await db.collection('RESENAS').insertOne(newResena);
        return result
    }
    async getAll(){
        const result = await db.collection('RESENAS').find().toArray()
        return result
    }

    async getByMovie(id_pelicula){
        const result = await db.collection('RESENAS').find({id_pelicula:new ObjectId(id_pelicula)}).toArray()
        return result
    }

    async update(id,req){
        const upData = {
            id_usuario: new ObjectId(req.id_usuario),
            id_pelicula: new ObjectId(req.id_pelicula),
            comentario: req.comentario,
            calificacion: req.calificacion,
            date: new Date()
        }
        const result = await db.collection('RESENAS').updateOne({_id:new ObjectId(id)},{$set:upData})
        return result
    }
    async delete(id){
        const result = await db.collection('RESENAS').deleteOne({_id:new ObjectId(id)})
        return result
    }
}

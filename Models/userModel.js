import { db } from '../utils/database.js'
import { ObjectId } from 'mongodb';

export class modelUser{
    constructor(usuario, contrasena){
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.admin = this.admin
    }
    async findUserByUsuario(id){
        const result = await db.collection('USUARIOS').find({_id:new ObjectId(id)}).toArray();
        return result;
    }
    async updateUser(id,usuario,contrasena){
        const result = await db.collection('USUARIOS').updateOne({_id:new ObjectId(id)},{$set:{usuario:usuario,contrasena:contrasena}});
        return result;
    }
    async deleteUser(id){
        const result = await db.collection('USUARIOS').deleteOne({_id:new ObjectId(id)})
        return result
    }
    async getAllusers(){
        const result = await db.collection('USUARIOS').find().toArray();
        return result
    }
}

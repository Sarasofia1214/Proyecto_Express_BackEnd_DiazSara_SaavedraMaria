import {connect, disconnect} from '../utils/database.js'
import { ObjectId } from 'mongodb';

export class modelUser{
    constructor(usuario, contrasena){
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.admin = this.admin
    }
    async findUserByUsuario(id){
        const db = await connect();
        const result = await db.collection('USUARIOS').find({_id:new ObjectId(id)}).toArray();
        console.log(result)
        await disconnect()
        return result;
    }
    async updateUser(id,usuario,contrasena){
        const db = await connect();
        const result = await db.collection('USUARIOS').updateOne({_id:new ObjectId(id)},{$set:{usuario:usuario,contrasena:contrasena}});
        await disconnect()
        return result;
    }
    async deleteUser(id){
        const db = await connect();
        const result = await db.collection('USUARIOS').deleteOne({_id:new ObjectId(id)})
        await disconnect()
        return result
    }
    async getAllusers(){
        const db = await connect();
        const result = await db.collection('USUARIOS').find().toArray();
        console.log(result)
        await disconnect()
        return result
    }
}

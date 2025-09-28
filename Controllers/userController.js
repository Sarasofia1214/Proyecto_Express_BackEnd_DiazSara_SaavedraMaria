import {modelUser} from '../Models/userModel.js'

const user = new modelUser();

export class userController{
    async getById(id){
        const result = await user.findUserByUsuario(id);
        return result
    }
    async update(id,usuario,contrasena){
        const result = await user.updateUser(id,usuario,contrasena);
        return result
    }
    async delete(id){
        const result = await user.deleteUser(id);
        return result
    }
    async getAll(){
        const result = await user.getAllusers();
        return result
    }
}
import { reaccion } from "../Models/reaccionModel.js";
const rreaccion = new reaccion()


export class reaccionController{
    async createReaccion(req){
        const result = await rreaccion.create(req)
        return result
    }

    async listReacciones(){
        const result = await rreaccion.list()
        return result
    }
    
    async updateReacciones(id,req){
        const result = await rreaccion.update(id,req)
        return result
    }

    async deleteReaccion(id){
        const result = await rreaccion.delete(id)
        return result
    }
}
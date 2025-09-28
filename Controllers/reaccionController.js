import { reaccion } from "../Models/reaccionModel.js";

export class reaccionController{
    constructor(){
        this.reaccion = new reaccion()
    }

    async createReaccion(req){
        const result = await this.reaccion.create(req)
        return result
    }

    async listReacciones(){
        const result = await this.reaccion.list()
        return result
    }
    
    async updateReacciones(id,req){
        const result = await this.reaccion.update(id,req)
        return result
    }

    async deleteReaccion(id){
        const result = await this.reaccion.delete(id)
        return result
    }
}
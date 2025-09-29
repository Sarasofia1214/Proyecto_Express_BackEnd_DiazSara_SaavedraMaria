import { Router } from "express";
import { reaccionController } from "../Controllers/reaccionController.js";
import { requireAdmin } from "../utils/adminRequire.js";
import { getCurrentUser } from "../auth/deps.js";

const reaccion = new reaccionController()
const routerReaccion = Router()


routerReaccion.post('/create', getCurrentUser ,async (req,res,next)=>{
    try {
        const result = await reaccion.createReaccion(req.body)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerReaccion.get('/list', getCurrentUser ,async (req,res,next)=>{
    try {
        const result = await reaccion.listReacciones()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerReaccion.put('/edit/:id', getCurrentUser ,async (req,res,next)=>{
    try {
        const result = await reaccion.updateReacciones(req.params.id,req.body)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerReaccion.delete('/delete/:id', requireAdmin ,async (req,res,next)=>{
    try {
        const result = await reaccion.deleteReaccion(req.params.id)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export default routerReaccion;
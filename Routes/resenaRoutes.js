import { Router } from "express";
import { getCurrentUser } from "../auth/deps.js";
import { resenaController } from "../Controllers/resenaController.js";

const resena = new resenaController()
const routerResena = Router();

routerResena.post("/create",getCurrentUser,async (req, res, next) => {
    try {
        const id_usuario = req.user.id
        const id_pelicula = req.body.id_pelicula
        const comentario = req.body.comentario
        const calificacion = req.body.calificacion
        const result = resena.createResena(id_usuario,id_pelicula,comentario,calificacion)
        return res.status(200).json({message: "reseña creada con exito"})
    } catch (error) {
        next(error)
    }
})

routerResena.get("/list",getCurrentUser,async (req, res, next) => {
    try {
        const result = await resena.getAllResenas()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerResena.get('/listbymovie/:id',async (req,res,next)=>{
    try {
        const result = resena.getResenaByMovie(req.params.id)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerResena.post("/edit/:id",getCurrentUser,async (req, res, next) => {
    try {
        const result = resena.updateResena(req.params.id,req)
        return res.status(200).json([{message: "reseña editada con exito"},result])
    } catch (error) {
        next(error)
    }
})

routerResena.delete("/delete/:id",getCurrentUser,async (req, res, next) => {
    try {
        const result = resena.deleteResena(req.params.id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
          }
          return res.status(204).json({message:"Usuario eliminado"})
    } catch (error) {
        next(error)
    }
})



export default routerResena;

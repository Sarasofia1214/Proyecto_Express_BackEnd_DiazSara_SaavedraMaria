import { Router } from "express";
import { requireAdmin } from "../utils/adminRequire.js";
import { getCurrentUser } from "../auth/deps.js";
import { userController } from "../Controllers/userController.js";

const user = new userController();
const routerUser = Router()

routerUser.get('/search-user/:id',requireAdmin,async (req,res,next)=>{
    try {
        const result = await user.getById(req.params.id);
        if (!result) return res.status(404).json({ error: "Usuario no encontrado" });
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerUser.put('/update-user/:id',getCurrentUser,async (req,res,next)=>{
    try {
        const result = await user.update(req.params.id,req.body.usuario,req.body.contrasena);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
          }
        return res.status(200).json({message: "usuario actualizado"})
    } catch (error) {
        next(error)
    }
})

routerUser.delete('/delete-user/:id',requireAdmin,async (req,res,next)=>{
    try {
        const result = await user.delete(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
          }
        return res.status(204).json({message:"Usuario eliminado"})
    } catch (error) {
        next(error)
    }
})

routerUser.get('/all-users',requireAdmin,async (req,res,next)=>{
    try {
        const result = await user.getAll();
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export default routerUser;
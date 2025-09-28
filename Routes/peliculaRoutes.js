import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import {controllerMovie} from "../Controllers/peliculaController.js"


const pel = new controllerMovie()

const routerMovie = Router();

routerMovie.post('/new-Pel',requireAdmin,async (req,res,next)=>{
    try {
        const result = await pel.createPel(req.body);
        return res.status(200).json(result)
    } catch (error) { next(error) }
})

routerMovie.get('/all-Pel',async (req,res,next)=>{
    try {
        const result = await pel.getMoviesA(req,res);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.get('/genre-Pel/:genre',async (req,res,next)=>{
    try {
        const result = await pel.getMoviesG(req.params.genre,res);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.put('/update-Pel/:id',requireAdmin,async (req,res,next)=>{
    try {
        const result = await pel.updatePel(req.body,req.params.id);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.delete('/delete-Pel/:id',requireAdmin,async (req,res,next)=>{
    try {
        const result = await pel.deletePel(req.params.id);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

routerMovie.get('/pel-pop',async (req,res,next)=>{
    try {
        const result = await pel.getMoviesP(req,res)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export default routerMovie;
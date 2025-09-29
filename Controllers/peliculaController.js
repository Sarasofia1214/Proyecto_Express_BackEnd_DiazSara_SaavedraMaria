import {pelicula} from "../Models/peliculaModel.js"

const mov = new pelicula()

export class controllerMovie{
    async createPel(req){
        const result = await mov.createMovie(req)
        return result
    }

    async getMoviesA(req,res){
        const result = await mov.getAllMovies(res)
        return result
    }

    async getMoviesG(genre,res){
        const result = await mov.getMovieByGenre(genre,res)
        return result
    }

    async updatePel(req,id,res){
        const result = await mov.updateMovie(req,id)
        return result
    }

    async deletePel(id,res){
        const result = await mov.deleteMovie(id)
        return result
    }

    async getMoviesP(req,res){
        const result = await mov.getMoviesPop(req,res)
        return result
    }

    async searchPel(id){
        const result = await mov.search(id);
        return result
    }
}
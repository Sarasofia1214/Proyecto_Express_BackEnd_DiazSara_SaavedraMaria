import {register,login} from './jwt.js'
import { Router } from "express";
const routerAuth = Router();

routerAuth.post('/login',async (req,res)=>{
    try {
        await login(req,res)
    } catch (e) {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
})

routerAuth.post('/register',async (req,res)=>{
    try {
        await register(req, res);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
})

export default routerAuth;
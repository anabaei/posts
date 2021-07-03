
import express from 'express';
import User from '../models/User.js';
import connection from '../db/connection.js';

const router = express.Router();



router.get("/", async (req, res)=>{
    
   
    const a = await connection.models.User.findAll()

    res.json("SSSS")
})

export default router;


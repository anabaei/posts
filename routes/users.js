
import express from 'express';
// need to pass models here to make it create connection, but in 
// the below code we don't use it, instead we use model object in connection object
import User from '../models/User.js';
import Post from '../models/Post.js';

import connection from '../db/connection.js';
const router = express.Router();
// import Post from '../models/Post.js';

// Critical, create tables if not exist on the current connection with current models
connection.sync();


router.get("/", async (req, res)=>{
    const results = await connection.models.User.findAll()
    res.json(results);
})

router.post("/", async (req, res, next)=>{
    const {name, bio} = req.body;
    try {
        const results = await connection.models.User.create({
            name,
            bio
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})

export default router;



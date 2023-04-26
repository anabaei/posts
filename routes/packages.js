
import express from 'express';
// need to pass models here to make it create connection, but in 
// the below code we don't use it, instead we use model object in connection object
import User from '../models/User.js';
// import Post from '../models/Post.js';
// import Comment from '../models/Comment.js';

import connection from '../db/connection.js';
const router = express.Router();

router.get("/", async (req, res, next)=>{
    try {
    const results = await connection.models.Package.findAll()
    res.json(results);
}
catch(err){
    return next(err);
}   
})


router.post("/", async (req, res, next)=>{
    const UserId  = req.userId;
    const {location, destination, weight, explanation, timeRange} = req.body;
    try {
        const results = await connection.models.Package.create({
            UserId,
            location, 
            destination, 
            weight, 
            explanation, 
            timeRange
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})

router.get("/:packageId", async (req, res, next)=>{
    const id = req.params.packageId;
    try {
    const results = await connection.models.Package.findAll({
          where: { id }
    })
    res.json(results);
}
catch(err){
    return next(err);
}   
})



export default router;



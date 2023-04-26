
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
    const results = await connection.models.Travel.findAll()
    res.json(results);
}
catch(err){
    return next(err);
}   
})



router.post("/", async (req, res, next)=>{
    const UserId  = req.userId;
    const {location, destination, explanation, fee, timeRange, departureDate} = req.body;
    try {
        const results = await connection.models.Travel.create({
            UserId,
            location, 
            destination, 
            explanation, 
            fee, 
            timeRange, 
            departureDate
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})

router.get("/:travelId", async (req, res, next)=>{
    const id = req.params.travelId;
    try {
    const results = await connection.models.Travel.findAll({
          where: { id }
    })
    res.json(results);
}
catch(err){
    return next(err);
}   
})



router.get("/:travelId/comments", async (req, res, next)=>{
    const { travelId }  = req.params;

    try {
        const results = await connection.models.Post.findAll({
            where: { id: travelId },
            include: [
                {
                    model: connection.models.Comment
                }
            ]
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})
////////////////////////////////////////////////////////////
//////////////////// Comment on Comment ////////////////////
//////////////////////////////////////////////////////////////
router.post("/:travelId/comments/:commentId", async (req, res, next)=>{
    const travelId  = req.params.postId;
    const CommentId  = req.params.commentId;
    const {title, content, commentId} = req.body;
    try {
        const results = await connection.models.Comment.create({
            travelId,
            CommentId,
            title,
            content,
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})


export default router;



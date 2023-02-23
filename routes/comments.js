
import express from 'express';
// need to pass models here to make it create connection, but in 
// the below code we don't use it, instead we use model object in connection object
import User from '../models/User.js';
 import Post from '../models/Post.js';
// import Comment from '../models/Comment.js';

import connection from '../db/connection.js';
const router = express.Router();
// import Post from '../models/Post.js';

// Critical, create tables if not exist on the current connection with current models
//connection.sync();

router.get("/:postId", async (req, res)=>{
    //TOD find based on postId
    const results = await connection.models.Comment.findAll()
    res.json(results);
})

// router.post("/:postId", async (req, res, next)=>{
//     const postId  = req.query.postId;
//     const {title, content, commentId} = req.body;
//     try {
//         const results = await connection.models.Comment.create({
//             postId,
//             title,
//             content,
//         });
//         return res.json(results);
//     } catch (error) {
//         return next(error);
//     }
// })

export default router;



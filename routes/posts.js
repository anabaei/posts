
import express from 'express';
// need to pass models here to make it create connection, but in 
// the below code we don't use it, instead we use model object in connection object
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

import connection from '../db/connection.js';
const router = express.Router();
// import Post from '../models/Post.js';

// Critical, create tables if not exist on the current connection with current models
connection.sync();

router.post("/", async (req, res, next)=>{
    const UserId  = req.headers.userid;
    const {title, content} = req.body;
    try {
        const results = await connection.models.Post.create({
            UserId,
            title,
            content,
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})

router.get("/:postId", async (req, res)=>{
    const PostId = req.params.postId;
    const UserId = 1;
    const results = await connection.models.Post.findAll({
          where: { UserId },
          include: [
              {
                  model: connection.models.Comment,
                  where: { PostId }
              }
          ]
    })

    // const data = await this.models.Group.findAndCountAll({
    //     include: [
    //       {
    //         as: 'members',
    //         model: this.models.Member,
    //         where: { userId },
    //         attributes: { exclude: ['groupId'] },
    //         required: true
    //       }
    //     ],
    //     limit,
    //     offset,
    //     order
    //   });


    res.json(results);
})

router.post("/:postId/comments", async (req, res, next)=>{
    // const postId  = req.query.postId;
    const PostId = 1;
    const {title, content } = req.body;
    try {
        const results = await connection.models.Comment.create({
            PostId,
            title,
            content,
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})

router.post("/:postId/comments/:commentId", async (req, res, next)=>{
    const PostId  = req.params.postId;
    const CommentId  = req.params.commentId;
    const {title, content, commentId} = req.body;
    try {
        const results = await connection.models.Comment.create({
            PostId,
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



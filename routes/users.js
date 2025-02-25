
import express from 'express';
import axios from 'axios';
// need to pass models here to make it create connection, but in 
// the below code we don't use it, instead we use model object in connection object
import User from '../models/User.js';
// import Post from '../models/Post.js';

import connection from '../db/connection.js';
const router = express.Router();
// import Post from '../models/Post.js';

// Critical, create tables if not exist on the current connection with current models


router.get("/", async (req, res) => {
    const results = await connection.models.User.findAll()
    res.json(results);
})

router.get("/clinic/:clinic_id/admins", async (req, res) => {
    const {clinic_id} = req.params;
    const results = await connection.models.User.findAll({
            where: {
                clinic_id: clinic_id,
                type: 'admin'
            }
        });
    
    
    
    res.json(results);
})

router.get("/posts", async (req, res) => {
    const UserId = 1;
    const results = await connection.models.User.findAll({
        include: [
            {
                model: connection.models.Post,
                where: {
                    UserId,
                },
                required: true,
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10,
        offset: 20
    })
    res.json(results);
})

router.post("/verify", async (req, res, next) => {
    const { user, accessToken } = req.body;
    const {email, name, image } = user 
    let client;
    // check if already existed in db
    try {
        client = await connection.models.User.findAll({
            where: {email}
        });
    }

    catch (error) {
        console.log(error)
        return next(error);
    }
    if(client){
        console.log("find it")
        
    }
    else 
    {
        try {
            client = await connection.models.User.create({
                name,
                email,
                image
            });
            console.log("created it")
            
        } catch (error) {
            return next(error);
        }
   }
    // if not create new one


})


router.post("/verify/googleoauth", async (req, res, next) => {
    const { user, accessToken } = req.body;
    const {name, email, image} = user 
    const client = {
        email,
        name,
        accessToken
    };
    const result = await axios.post('http://localhost:3001/api/auth/google', client)
    .then(response => {
     console.log("response",response)
    })
    .catch(error => {
        console.log(error)
    });

})


//signin
router.post("/signin", async (req, res, next) => {

    const { name, email, image } = req.body;
    try {
        const results = await connection.models.User.create({
            name,
            email,
            image
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})


router.post("/", async (req, res, next) => {
    const { name, email, image, type, clinic_id } = req.body;
    try {
        const results = await connection.models.User.create({
            name,
            email,
            image,
            type,
            clinic_id
        });
        return res.json(results);
    } catch (error) {
        return next(error);
    }
})

export default router;



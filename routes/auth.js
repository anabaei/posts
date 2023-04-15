
import express from 'express';
import jwt from 'jsonwebtoken'
import connection from '../db/connection.js';
const router = express.Router();

// import Post from '../models/Post.js';

// Critical, create tables if not exist on the current connection with current models




router.post("/", async (req, res, next)=>{
    const { username, password } = req.body;

    // Check if username and password are valid (you should replace this with your own authentication logic)
  if (username === 'myusername' && password === 'mypassword') {
    // get userId 
    const userId=1;
    // Generate JWT
    const token = jwt.sign({ username, userId },  process.env.JWT_SECRET, { expiresIn: '10h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
})

export default router;



import Express from 'express';
import bodyParser from 'body-parser';
import users from './routes/users.js'; 
import posts from './routes/posts.js';
import authMiddleware from './middleware/authMiddleware.js'
import auth from './routes/auth.js';
import { config } from 'dotenv';

///////////////////////////////////////////////////
////////// Allow to parse bodies in json //////////
///////////////////////////////////////////////////
const app = Express()
config()

app.use(bodyParser.json()); // help us to handle json in body
app.use(bodyParser.urlencoded({ extended: false})); // help us to have req.body in callbacks and reads what is inside body

app.use('/users', users);
app.use('/login', auth);
app.use(authMiddleware);
app.use('/posts', posts);

app.get('/', (request, response) => { 
    // console.log(">>><<<>>!!!  ",process.env);
    response.json(`Hello, World!`) 
})           
const port = process.env.PORT || 3001;
app.listen(
port, ()=>console.log('server is running')
)
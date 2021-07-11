import Express from 'express';
import bodyParser from 'body-parser';
import users from './routes/users.js'; 
import posts from './routes/posts.js';

///////////////////////////////////////////////////
////////// Allow to parse bodies in json //////////
///////////////////////////////////////////////////
const app = Express()

app.use(bodyParser.json()); // help us to handle json in body
app.use(bodyParser.urlencoded({ extended: false})); // help us to have req.body in callbacks and reads what is inside body

app.use('/users', users);
app.use('/posts', posts);


app.get('/', (request, response) => { 
    console.log(">>><<<>>!!!  ",process.env);
    response.json(`Hello, World!`) 
})           
const port = process.env.PORT || 3000;
app.listen(
port, ()=>console.log('server is running')
)
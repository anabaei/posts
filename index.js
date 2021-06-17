import Express from 'express';
import bodyParser from 'body-parser';

///////////////////////////////////////////////////
////////// Allow to parse bodies in json //////////
///////////////////////////////////////////////////
const app = Express()
app.use(bodyParser.json()); // help us to handle json in body
app.use(bodyParser.urlencoded({ extended: false})); // help us to have req.body in callbacks and reads what is inside body


app.get('/', (request, response) => { response.json(`Hello, World!`) })
const port = process.env.port || 3000;
app.listen(
port, ()=>console.log('server is running')
)
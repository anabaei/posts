import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import travelsRouter from './routes/travels.js';
import packagesRouter from './routes/packages.js';
import authRouter from './routes/auth.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
config();

app.use(cors());
app.use(bodyParser.json()); // parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: false })); // parse incoming form data

// define routes
app.get('/', (req, res) => {
  res.json('Hello, World!');
});

app.use('/users', usersRouter);
app.use('/login', authRouter);
app.use(authMiddleware); // require authentication for all subsequent routes
app.use('/packages', packagesRouter);
app.use('/travels', travelsRouter);
app.use('/posts', postsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

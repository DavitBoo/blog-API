import express from 'express';

import { User } from './models/user';

import userRouter from './controllers/userController';
import postRouter from './controllers/postController';
import commentRouter from './controllers/commentController';
import labelRouter from './controllers/labelController';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', labelRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de mi blog!!!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
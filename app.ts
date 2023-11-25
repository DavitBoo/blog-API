import express from 'express';

import { User } from './models/user';


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de mi blog!!!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
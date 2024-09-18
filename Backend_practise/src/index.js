import { config } from 'dotenv';
import { app } from './app.js';
import jwt from 'jsonwebtoken';
config({
  path: './.env',
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is listening on http://localhost:${process.env.PORT}`);
});

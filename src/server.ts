import dotenv from 'dotenv';
dotenv.config();

import connection from './config/connection';
import app from './app';
const { PORT } = process.env;

connection();

app.on('db ready', () => {
  app.listen(PORT, () => {
    console.log('');
    console.log(`Im listening to port ${PORT}`);
    console.log(`To acess, use: http://localhost:${PORT}`);
  });
});

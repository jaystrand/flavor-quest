const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
// Allow CORS for all requests (from localhost:5173)
app.use(cors({
  origin: ['https://flavor-quest.onrender.com','http://localhost:3001'], // Specify your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you want to allow cookies and credentials
}));
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

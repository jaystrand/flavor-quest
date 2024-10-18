import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { sequelize as modelsSequelize } from './models/models';
import routes from './routes/routes';
import authMiddleware from './middleware/authMiddleware';

dotenv.config();

const sequelizeInstance = new Sequelize(process.env.DATABASE_URL || '', {

  dialect: 'postgres',

  protocol: 'postgres',

  logging: false,

});



export { sequelizeInstance as sequelize };

const app = express();
app.use(express.json());
app.use(authMiddleware);

app.use('/api', routes);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelizeInstance.sync();
});
const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const routes = require('./routes');
const authMiddleware = require('./middlewares/auth');

dotenv.config();

const app = express();
app.use(express.json());
app.use(authMiddleware);

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
});
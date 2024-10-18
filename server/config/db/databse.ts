import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
  logging: false, // Disable logging; default: console.log
});

export { sequelize };
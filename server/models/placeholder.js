const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Placeholder = sequelize.define('Placeholder', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Placeholder;
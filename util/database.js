const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Pramod@21', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

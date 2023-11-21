const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DATABASE_URL)

export default sequelize;

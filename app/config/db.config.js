const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Libro = require('../models/libros.model.js')(sequelize, Sequelize);//Usa la variable Libro para almacanar el modelo de la tabla Libro
db.Prestamo = require('../models/prestamos.model.js')(sequelize, Sequelize);//Usar la variable Prestamo para almacenar el modelo de la tabla Prestamo
 
module.exports = db;

//En caso que no hay acceso a la conectividad de base datos, Verificarar el estado de la base de datos en Render --Amen
const env = {
    database: 'umg_salama_24902121296',
    username: 'umg_salama_24902121296_user',
    password: 'DkCqvYXX96XITqXe9n7QcJh8pAfrfWv7',
    host: 'dpg-cr7b172j1k6c739oc610-a',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;
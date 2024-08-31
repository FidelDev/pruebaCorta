
module.exports = (sequelize, Sequelize) => {
	const Libro = sequelize.define('libro', {	
	  codLibro: {
			type: Sequelize.INTEGER,
			primaryKey: true,
    },
	  nombreLibro: {
			type: Sequelize.STRING
	  },
	  editorial: {
			type: Sequelize.STRING
  	},
	  autor: {
			type: Sequelize.STRING
	  },
    genero: {
        type: Sequelize.STRING
      },
    paisLibro: {
        type: Sequelize.STRING
      },
	  numeroPagina: {
			type: Sequelize.INTEGER
    },
    anioEdicion: {
        type: Sequelize.DATEONLY,
      },
    moneda: {
        type: Sequelize.FLOAT,
      },
    copyrightby: {
        type: Sequelize.STRING,
        defaultValue: '@Fide Developer'
      }
	});
	
	return Libro;
}

/*
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'prueba Fide'
    }
*/

/*
codLibro
nombreLibro
editorial
autor
genero
genero
paisLibro
numeroPagina
anioEdicion
moneda
copyrightby
*/
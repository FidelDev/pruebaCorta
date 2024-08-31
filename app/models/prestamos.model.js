module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamo', {
        numPedido: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codeLibro: {
            type: Sequelize.INTEGER
        },
        codUsuario: {
            type: Sequelize.INTEGER
        },
        fechaSalida: {
            type: Sequelize.DATEONLY
        },
        fechaMXdevolver: {
            type: Sequelize.DATEONLY
        },
        fechaDevolucion: {
            type: Sequelize.DATEONLY
        }
    });

    return Prestamo;
}

/*
numPedido
codeLibro
codUsuario
fechaSalida
fechaMXdevolver
fechaDevolucion
*/
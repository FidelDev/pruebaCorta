const { where } = require('sequelize');
const db = require('../config/db.config.js');

const Prestamo = db.Prestamo;

//METHOD CREATE
exports.createPrestamo = (req, res) => {
    let prestamo = {};

    try {
        prestamo.codeLibro = req.body.codeLibro,
        prestamo.codUsuario = req.body.codUsuario,
        prestamo.fechaSalida = req.body.fechaSalida,
        prestamo.fechaMXdevolver = req.body.fechaMXdevolver,
        prestamo.fechaDevolucion = req.body.fechaDevolucion

        //save to postgres database
        Prestamo.create(prestamo).then(result => {
            //
            res.status(200).json({
                message: "Save prestamo Id = " + result.numPedido,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

//METHOD GET ALL LOAN
exports.retrieveAllLoan = (req, res) => {

    Prestamo.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "Get all information from Loan successfully!",
                prestamos: prestamoInfos
            });
        })
        .catch(error => {
            //Log in console
            console.log(error);
            
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

//METHOD GET LOAN BY ID
exports.getPrestamoById = (req, res) => {
    //find all Loan information from
    let loanId = req.params.numPedido;

    Prestamo.findByPk(loanId)
        .then(prestamo => {
            res.status(200).json({
                message: "Successfully get a Loan with id = " + loanId,
                prestamos: prestamo
            });
        })
        . catch(error => {
            //log on console
            console.log(error);

            res.status(500).json({
            message: "Error!",
            error: error                
            });
        });
}

//METHOD UPDATE LOAN BY ID
exports.updateLoanById = async (req, res) => {
    try {
        let loanId = req.params.numPedido;
        let loan = await Prestamo.findByPk(loanId);

        if(!loan){
            //return a response to loan
            res.status(404).json({
                message: "Not found for updating a book with id = " + loanId,
                prestamo: "",
                error: "404"
            });
        }
        else {
            //update new change to database
            let updatedObject = {
                codeLibro: req.body.codeLibro,
                codUsuario: req.body.codUsuario,
                fechaSalida: req.body.fechaSalida,
                fechaMXdevolver: req.body.fechaMXdevolver,
                fechaDevolucion: req.body.fechaDevolucion
            }
            let result = await Prestamo.update(updatedObject, {returning: true, where: {numPedido: loanId}});

            //return

            if(!result){
                res.status(500).json({
                    message: "Error -> Can not update a loan with id = " + req.params.numPedido,
                    error: "Can NOT update"
                });
            }

            res.status(200).json({
                message: "Update successfully a loan with id = " + loanId,
                prestamo: updatedObject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a loan with id = " + req.params.numPedido,
            error: error.message
        });
    }
}

//METHOD DELETE LOAN BY ID
exports.deletePrestamoById = async (req, res) => {
    try {
        let loanId = req.params.numPedido;
        let loan = await Prestamo.findByPk(loanId);

        if(!loan){
            res.status(400).json({
                message: "Does Not exist a loan with id = " + loanId,
                error: "404"
            });
        }
        else {
            await loan.destroy();
            res.status(200).json({
                message: "Delete successfully a loan with id = " + loanId,
                prestamo: loan
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a loan with id = " + req.params.numPedido,
            error: error.message
        });
    }
}
const db = require('../config/db.config.js');

const Libro = db.Libro;

//CREATE
exports.create = (req, res) => {
    let libro = {};

    try{
        libro.codLibro = req.body.codLibro,
        libro.nombreLibro = req.body.nombreLibro,
        libro.editorial = req.body.editorial,
        libro.autor = req.body.autor,
        libro.genero  = req.body.genero,
        libro.paisLibro = req.body.paisLibro,
        libro.numeroPagina = req.body.numeroPagina,
        libro.anioEdicion = req.body.anioEdicion,
        libro.moneda = req.body.moneda
    
        // Save to MySQL database
        Libro.create(libro).then(result => {    
            // 
            res.status(200).json({
                message: "Save Book id = " + result.codLibro,
                libro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}


//READ
exports.retrieveAllLibro = (req, res) => {
    // find all Book information from 
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Get all Book Infos Successfully!",
                libros: libroInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

//READ THE BOOKS BY ID
exports.getLibrorById = (req, res) => {
    // find all Book information from 
    let libroId = req.params.codLibro;

    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: " Successfully Get a Book with id = " + libroId,
                libros: libro
            });
        })
        . catch(error => {
          // log on console
          console.log(error);
          
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }

//UPDATE
exports.updateById = async (req, res) => {
    try{
        let libroId = req.params.codLibro;
        let libro = await Libro.findByPk(libroId);
    
        if(!libro){
            // return a response to Book
            res.status(404).json({
                message: "Not Found for updating a Book with id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                codLibro: req.body.codLibro,
                nombreLibro: req.body.nombreLibro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisLibro: req.body.paisLibro,
                numeroPagina: req.body.numeroPagina,
                anioEdicion: req.body.anioEdicion,
                moneda: req.body.moneda
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {codLibro: libroId}});
            
            // return
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a book with id = " + req.params.codLibro,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a book with id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a book with id = " + req.params.codLibro,
            error: error.message
        });
    }
}

//DELETE
exports.deleteById = async (req, res) => {
    try{
        let libroId = req.params.codLibro;
        let libro = await Libro.findByPk(libroId);

        if(!libro){
            res.status(404).json({
                message: "Does Not exist a book with id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Delete Successfully a book with id = " + libroId,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a book with id = " + req.params.codLibro,
            error: error.message,
        });
    }
}
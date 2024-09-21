const db = require('../config/db.config.js');

const Libro = db.Libro;

//CREATE
exports.create = (req, res) => {
    let libro = {};

    try{
        libro.id_libro = req.body.id_libro,
        libro.titulo = req.body.titulo,
        libro.id_Autor = req.body.id_Autor,
        libro.isbn = req.body.isbn,
        libro.editorial = req.body.editorial,
        libro.anio_publicacion = req.body.anio_publicacion,
        libro.categoria = req.body.categoria,
        libro.cantidad_Disponible = req.body.cantidad_Disponible,
        libro.ubicacion = req.body.ubicacion
    
        // Save to MySQL database
        Libro.create(libro).then(result => {    
            // 
            res.status(200).json({
                message: "Save Book id = " + result.id_libro,
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
    let libroId = req.params.id_libro;

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
                id_libro: req.body.id_libro,
                titulo: req.body.titulo,
                id_Autor: req.body.id_Autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,

                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_Disponible: req.body.cantidad_Disponible,
                ubicacion: req.body.ubicacion
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {id_libro: libroId}});
          
            // return
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a book with id = " + req.params.id_libro,
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
            message: "Error -> Can not update a book with id = " + req.params.id_libro,
            error: error.message
        });
    }
}

//DELETE
exports.deleteById = async (req, res) => {
    try{
        let libroId = req.params.id_libro;
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
            message: "Error -> Can NOT delete a book with id = " + req.params.id_libro,
            error: error.message,
        });
    }
}

let express = require('express');
let router = express.Router();
 
const libros = require('../controllers/controllers.js');
const prestamos = require('../controllers/prestamo.controller.js')
//controllers.js
router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.retrieveAllLibro);
router.get('/api/libros/onebyid/:id_libro', libros.getLibrorById);
router.put('/api/libros/update/:id_libro', libros.updateById);
router.delete('/api/libros/delete/:id_libro', libros.deleteById);

//prestamo.controller.js
router.post('/api/prestamos/createPrestamo', prestamos.createPrestamo);
router.get('/api/prestamos/retrieveAllLoan', prestamos.retrieveAllLoan);
router.get('/api/prestamos/onebyid/:numPedido', prestamos.getPrestamoById);
router.put('/api/prestamos/update/:numPedido', prestamos.updateLoanById);
router.delete('/api/prestamos/delete/:numPedido', prestamos.deletePrestamoById);


module.exports = router;

/*

{
  "codeLibro": 1,
  "codUsuario": 1,
  "fechaSalida": "2024-01-01",
  "fechaMXdevolver": "2024-01-02",
  "fechaDevolucion": "2024-01-03",
}
{
  "codeLibro": 2,
  "codUsuario": 1,
  "fechaSalida": "2024-01-01",
  "fechaMXdevolver": "2024-01-02",
  "fechaDevolucion": "2024-01-03",
}

*/
var express = require('express');
var app = express();
var pago = require('./models/PagoModel');

const _ = require('underscore');

//middleware
const { verificadorToken, validatorRol } = require('../middleware/autenticacion');

 
app.get('/pago/all', (req, res) => {


    pago.find({})
        .sort({ _id: 1 })
        .exec((err, pago) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            } else {
                res.json({
                    exito: true,
                    pago,


                });
            }
        });

});


 
 
app.post('/pago/create', [verificadorToken], (req, res) => {

    var data = req.body;
    
    let pag = new pago({
        id_usuario: data.id_usuario,
        nombre_producto: data.nombre_producto,
        precio: data.precio,
        fecha : new Date(),
    });

    pag.save((err, pago) => {
        if (err) {
            res.json({
                exito: false,
                err
            });
        } else {

            res.json({
                exito: true,
                pago
            });
        }

    });

});
 

module.exports = app;
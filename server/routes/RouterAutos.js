var express = require('express');
var app = express();
var autos = require('./models/ModelCarros');

const _ = require('underscore');

//middleware
const { verificadorToken, validatorRol } = require('../middleware/autenticacion');

// Mostrar todas los autos
app.get('/autos/all', (req, res) => {


    autos.find({ estado: true })
        .sort({ marca: 1 })
        .exec((err, autos) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            } else {
                res.json({
                    exito: true,
                    autos,
                });
            }
        });

});




// buscar un auto por id
app.get('/autos/:id', (req, res) => {
    //id de la categoria
    var id_auto = req.params.id;

    autos.findById({ _id: id_auto }, (err, auto) => {
        if (err) {
            res.json({
                exito: false,
                err: {
                    message: `No se encontro registro con el Id ${id_auto}`
                }
            });
        } else {
            res.json({
                exito: true,
                auto
            });
        }

    });
});
// crear auto nuevo
app.post('/autos/create', [verificadorToken, validatorRol], (req, res) => {

    var data = req.body;

    let newAuto = new autos({
        marca: data.marca,
        modelo: data.modelo,
        anio: data.anio,
        img: data.imagen,
        estado: data.estado,
    });

    newAuto.save((err, autos) => {
        if (err) {
            res.json({
                exito: false,
                err
            });
        } else {

            res.json({
                exito: true,
                autos
            });
        }

    });

});

// actualizar un auto
app.put('/autos/update/:id', [verificadorToken, validatorRol], (req, res) => {
    var data = req.body;

    let id_auto = req.params.id
    let actualizar = {
        marca: data.marca,
        modelo: data.modelo,
        anio: data.anio,
        estado: data.estado,
        id_auto: data.id_auto,
    };


    autos.findByIdAndUpdate(id_auto, actualizar, (err, autos) => {
        if (err) {
            res.json({
                exito: false,
                err

            });
        }else{
            res.json({
                exito: true,
                autos
            });

        }



    });
});
// eliminar categoria
app.delete('/auto/delete/:id', [verificadorToken, validatorRol], (req, res) => {
    var id_auto = req.params.id
    autos.findOneAndDelete(id_auto, (err, autos) => {
        if (err) {
            res.json({
                exito: false,
                err

            });
        }
        if (autos == null) {
            res.json({
                exito: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }else{

            res.json({
                exito: true,
                autos
            });
        }

    });
});

module.exports = app;
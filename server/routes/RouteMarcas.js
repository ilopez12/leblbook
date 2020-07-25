var express = require('express');
var app = express();
var marcas = require('./models/ModelMarcas');

const _ = require('underscore');

//middleware
const { verificadorToken, validatorRol } = require('../middleware/autenticacion');

// Mostrar todas las categorias Paginadas
app.get('/marcas/all', (req, res) => {


    marcas.find({})
        .sort({ _id: 1 })
        .exec((err, marcas) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            } else {
                res.json({
                    exito: true,
                    marcas,


                });
            }
        });

});


// buscar una marcas por id
app.get('/marcas/:id', (req, res) => {
    //id de la categoria
    var id_marca = req.params.id;

    marcas.findById({ _id: id_marca }, (err, marcas) => {
        if (err) {
            res.json({
                exito: false,
                err: {
                    message: `No se encontro registro con el Id ${id_categories}`
                }
            });
        }

        res.json({
            exito: true,
            marcas
        });
    });
});

// crear todas las categorias
app.post('/marcas/create', [verificadorToken, validatorRol], (req, res) => {

    var data = req.body;
    console.log(data);
    let marcas_save = new marcas({
        marca: data.marca
    });

    marcas_save.save((err, marcas) => {
        if (err) {
            res.json({
                exito: false,
                err
            });
        } else {

            res.json({
                exito: true,
                marcas
            });
        }

    });

});

// actualizar una categoria
app.put('/marcas/update/:id', [verificadorToken, validatorRol], (req, res) => {
    var data = req.body;

    let id_marcas = req.params.id
    let actualizar = {
        marca: data.marca,
    };


    marcas.findByIdAndUpdate(id_marcas, actualizar, (err, maras) => {
        if (err) {
            res.json({
                exito: false,
                err

            });
        }



        res.json({
            exito: true,
            maras
        });
    });
});
// eliminar categoria
app.delete('/marcas/delete/:id', [verificadorToken, validatorRol], (req, res) => {
    var id_marcas = req.params.id
    marcas.findByIdAndRemove(id_marcas, (err, marca) => {
        if (err) {
            res.json({
                exito: false,
                err

            });
        }
        if (marca == null) {
            res.json({
                exito: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            exito: true,
            marcas
        });
    });
});

module.exports = app;
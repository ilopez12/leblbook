var express = require('express');
var app = express();
var contactos = require('./models/ModelContactos');

const _ = require('underscore');

//middleware
const { verificadorToken, validatorRol } = require('../middleware/autenticacion');

 
app.get('/contacto/all', (req, res) => {


    contactos.find({})
        .sort({ _id: 1 })
        .exec((err, contacto) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            } else {
                res.json({
                    exito: true,
                    contacto,


                });
            }
        });

});



 
app.get('/contacto/:id', (req, res) => {
    //id de la categoria
    var id_contacto = req.params.id;

    contactos.findById({ _id: id_contacto }, (err, contacto) => {
        if (err) {
            res.json({
                exito: false,
                err: {
                    message: `No se encontro registro con el Id ${id_contacto}`
                }
            });
        }

        res.json({
            exito: true,
            contacto
        });
    });
});
 
app.post('/contacto/create', [verificadorToken], (req, res) => {

    var data = req.body;

    let contact = new contactos({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        descripcion: data.descripcion
    });

    contact.save((err, contacto) => {
        if (err) {
            res.json({
                exito: false,
                err
            });
        } else {

            res.json({
                exito: true,
                contacto
            });
        }

    });

});

 
app.delete('/contacto/delete/:id', [verificadorToken, validatorRol], (req, res) => {
    var id_contacto = req.params.id
    contactos.findByIdAndRemove(id_contacto, (err, contacto) => {
        if (err) {
            res.json({
                exito: false,
                err

            });
        }
        if (contacto == null) {
            res.json({
                exito: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            exito: true,
            contacto
        });
    });
});

module.exports = app;
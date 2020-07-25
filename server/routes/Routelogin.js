var express = require('express');
var app = express();
const Usuario = require('./models/ModelUsuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {

    var data = req.body;
    // res.json({
    //     data

    // });
    if (data.password == null || data.email == null) {

        res.json({
            exito: false,
            err: {
                message: 'Faltan Parametros en el Post'
            }

        });
    } else {


        Usuario.findOne({ email: data.email }, (err, usuarioDB) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            } else {
                if (!usuarioDB) {
                    res.json({
                        exito: false,
                        err: {
                            message: '(Usuario) O Contraseña Incorrectoe'
                        }
                    });
                } else {

                    if (usuarioDB) {

                        if (!bcrypt.compareSync(data.password, usuarioDB.password)) {
                            res.json({
                                exito: false,
                                err: {
                                    message: 'Usuario O (Contraseña) Incorrecto3'
                                }
                            });
                        } else {
                            //generar el jwt
                            const token = jwt.sign({
                                usuarioDB
                            }, process.env.SEED, {
                                expiresIn: process.env.CADUCIDAD_TOKEN // expires in 24 hours
                            });


                            res.json({
                                exito: true,
                                usuario: usuarioDB,
                                token
                            });
                        }
                    } else {
                        return;
                    }
                }
            }

        });
    }




});


module.exports = app;
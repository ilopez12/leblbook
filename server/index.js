require('./config/config');
var express = require('express');
const mongoose = require('mongoose')
// const cors = require('cors')
var app = express();
// app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var path = require('path');


const body_parse = require('body-parser');

//middleware
app.use(body_parse.urlencoded({ extended: false }));
app.use(body_parse.json({ limit: '50mb' }));
/* app.use(express.static(path.resolve(__dirname, '../upload'))); */
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(require('./routes/Routeindex'));

app.get('/', (req, res) => {

    res.sendfile('./public/index.html');
});

//Conexion a mongoose
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log('Base de datos Conectada ONLINE');
    })

app.listen(process.env.PORT, function() {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});
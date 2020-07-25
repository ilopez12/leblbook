/*====*/
/*====*/
/*====================================
Importacion de los rutas para que puedan ser leidas por los el index
==================================== */

var express = require('express');
var app = express();
app.use(require('./Routeusuario'))
app.use(require('./Routelogin'))
app.use(require('./Routecategorias'));
app.use(require('./RouteProductos'));
app.use(require('./RouteUpload'));
app.use(require('./RouterAutos'));
app.use(require('./RouteMarcas'));
app.use(require('./RouterContactos'));
app.use(require('./RouterCompra'));


module.exports = app;
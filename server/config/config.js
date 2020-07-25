/*
Puertos

*/

process.env.PORT = process.env.PORT || 3001;

/*
 *ENTORNO
 */

//process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*========================================
Base de datos
======================================== */
// let urlDB;
// if (process.env.NODE_ENV == 'dev') {

// urlDB = 'mongodb://127.0.0.1:27017/proyecto_final';
urlDB = 'mongodb+srv://joeljr111005:zs26Kf3pfT740LZj@cluster0-v7gsp.mongodb.net/cafe';
// } else {
//     urlDB = process.env.MONGO_URI;
// }



process.env.URLDB = urlDB;


/* Entorno de caducidad  y SEED */
process.env.CADUCIDAD_TOKEN = '5h';
process.env.SEED = process.env.SEED || 'KEY_DsESARROLLO';
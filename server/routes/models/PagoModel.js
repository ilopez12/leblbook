const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const categorieShema = new Schema({
    id_usuario: {
        type: String, 
        require: [true, 'El id es Necesario']
    },
    nombre_producto: {
        type: String,
        required: [true, ['La nombre_producto es Necesario']]
    },
    precio:{
        type:String
    },
    fecha: {
        type: Date, 
    }
});


 

module.exports = mongoose.model('pago', categorieShema);
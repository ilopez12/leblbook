const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const categorieShema = new Schema({
    nombre: {
        type: String,
        unique: true,
        require: [true, 'El nombre es Necesario']
    },
    descripcion: {
        type: String,
        required: [true, ['La Descripcion es Necesario']]
    },
    slug:{
        type:String
    },
    estado: {
        type: Boolean,
        default: true
    },
    img:{
        type: String,
    }


});


categorieShema.plugin(uniqueValidator, { message: '{PATH} Debe de ser Unico' });

module.exports = mongoose.model('categorias', categorieShema);
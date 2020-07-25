const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const ContactShema = new Schema({
    nombre: {
        type: String, 
        require: [true, 'El nombre es Necesario']
    },
    email: {
        type: String,
        required: [true, ['La Descripcion es Necesario']]
    },
    telefono:{
        type:String
    },
    descripcion: {
        type: String,
        default: true
    }


});
module.exports = mongoose.model('contactos', ContactShema);
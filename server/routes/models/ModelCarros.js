const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const AutoSchema = new Schema({
    marca: {
        type: String,
        require: [true, 'El nombre es Necesario'],
        unique: true,
    },
    modelo: {
        type: String,
        required: true,
        unique: true

    },
    anio: {
        type: String,
        require: [true, 'El Año es Necesario']
    },
    img: {
        type: String,
        require: false

    },
    estado: {
        type: Boolean,
        default: true
    }

});



AutoSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser Unico' });

module.exports = mongoose.model('autos', AutoSchema);
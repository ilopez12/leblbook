const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const MarcaSchema = new Schema({
    marca: {
        type: String,
        unique: true,
        require: [true, 'El nombre es Necesario']
    },
    img:{
        type: String,
    }


});


MarcaSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser Unico' });

module.exports = mongoose.model('marcas', MarcaSchema);
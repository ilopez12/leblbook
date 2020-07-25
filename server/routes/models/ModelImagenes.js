const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Imagenechema = new Schema({
    img: {
        type: String,
        require: [true, 'El nombre es Necesario'],
    },
    id_producto: {
        type: String
    }

});

module.exports = mongoose.model('img_Producto', Imagenechema);
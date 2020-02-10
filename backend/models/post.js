const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    contenido: { type: String, required: true },
    image: { type: String, required: true },
    fechaCreacion: { type: Date, required: true }
});

// para crear datos o modelos de objetos
module.exports = mongoose.model('Post', postSchema);
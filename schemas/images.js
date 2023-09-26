const mongoose = require('mongoose');

const imageSchema=new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: false,
        trim: true
    },
    mood: {
        type: String,
        required: false,
        trim: true
    },
    date: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    image_id: {
        type: String,
        required: true
    }
})

const Images = mongoose.model('Image', imageSchema);

module.exports = { Images }
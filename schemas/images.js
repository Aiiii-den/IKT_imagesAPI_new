/**
 * id
 * file
 * date
 * location
 */

const mongoose = require('mongoose');

const imageSchema=new mongoose.Schema({
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
        type: Date,
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
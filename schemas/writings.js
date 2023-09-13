/**
 * id
 * text
 * date
 * location
 */

const mongoose = require('mongoose');

const writingsSchema=new mongoose.Schema({
    text: {
        type: String,
        required: true,
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
    prompt_id: {
        type: String,
        required: true,
        trim: true
    }
})

const Writings = mongoose.model('Writings', writingsSchema);

module.exports = { Writings }
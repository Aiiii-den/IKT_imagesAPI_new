/**
 *
 * id
 * question
 * topic
 *
 */

const mongoose = require('mongoose');

const promptSchema=new mongoose.Schema({
    promptQuestion: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: false,
        trim: true
    }
})

const Prompts = mongoose.model('Prompts', promptSchema);

module.exports = { Prompts }
const mongoose=require('mongoose');

const TranslSchema=new mongoose.Schema({
    sourceText: {
        type: String,
        required: true,
        trim: true,
    },
    translText: {
        type: String,
        required: true,
        trim: true
    },
    sourceLang: {
        type: String,
        required: true,
        trim: true
    },
    translLang: {
        type: String,
        required: true,
        trim: true
    },

    _langId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
})

const Translations = mongoose.model('Translations', TranslSchema);

module.exports = { Translations }
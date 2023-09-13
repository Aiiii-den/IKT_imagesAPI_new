//handles mongoose connection
const { mongoose } = require('mongoose');
const { MongoClient } = require("mongodb");
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

module.exports={mongoose}
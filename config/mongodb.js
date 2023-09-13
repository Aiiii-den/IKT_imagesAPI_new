//handles mongoose connection
const { mongoose } = require('mongoose');
const { MongoClient } = require("mongodb");
require('dotenv').config();

//mongoose.Promise=global.Promise;

mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

/*
const credentials = process.env.PATH_TO_PEM

const client = new MongoClient(process.env.DB_CONNECTION);

const dbconnection = client.connect();
const database = client.db(process.env.DB_NAME);
const collection = database.collection(process.env.COLLECTION);
console.log(`Connected to DB ... `);

module.exports.client = client;
module.exports.dbconnection = dbconnection;
module.exports.database = database;
module.exports.collection = collection;

*/
module.exports={mongoose}
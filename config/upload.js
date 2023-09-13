const multer = require("multer");
const {
    GridFsStorage
} = require("multer-gridfs-storage");
require('dotenv').config()

const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    dbName: process.env.DATABASE,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            console.log('file.mimetype === -1')
            return `${Date.now()}-ab-${file.originalname}`;
        }
        console.log('store');
        return {
            bucketName: 'images',
            filename: `${Date.now()}-ab-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });

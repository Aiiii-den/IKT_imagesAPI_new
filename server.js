const express = require('express');
let { mongoose } = require('./config/mongodb');
const { Images } = require("./schemas/images");
const upload = require('./config/upload');
const connection = mongoose.createConnection(process.env.DB_CONNECTION);
require('dotenv').config();

const app = express();
const PORT = 8080;
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`server running on http://localhost:${PORT}`);
    }
});

/* ----------------- POST ---------------------------- */

// POST one image
app.post('/image', upload.single('file'), async(req, res) => {
    const newImage = new Images({
        title: req.body.title,
        mood: req.body.mood,
        location: req.body.location,
        date: req.body.date,
        image_id: req.file.filename
    })
    await newImage.save();
    res.send(newImage);
});

/* ----------------- GET ---------------------------- */


// GET one image via id
app.get('/image/:id', async(req, res) => {
    getOneImage(req.params.id)
        .then( (image) => {
            console.log('image', image);
            res.send(image);
        })
        .catch( () => {
            res.status(404);
            res.send({
                error: "Image does not exist!"
            });
        })
});

// GET all images
app.get('/image', async(req, res) => {
    getAllImages()
        .then( (images) => {
            res.send(images);
        })
        .catch( () => {
            res.status(404);
            res.send({
                error: "Images do not exist!"
            });
        })
});

function getOneImage(id) {
    return new Promise( async(resolve, reject) => {
        try {

            const image = await Images.findOne({ _id: id });
            let fileName = image.image_id;
            const files = connection.collection('images.files');
            const chunks = connection.collection('images.chunks');

            const cursorFiles = files.find({filename: fileName});
            const allFiles = await cursorFiles.toArray();
            const cursorChunks = chunks.find({files_id : allFiles[0]._id});
            const sortedChunks = cursorChunks.sort({n: 1});
            let fileData = [];
            for await (const chunk of sortedChunks) {
                fileData.push(chunk.data.toString('base64'));
            }
            let base64file = 'data:' + allFiles[0].contentType + ';base64,' + fileData.join('');
            let getImage = new Images({
                "title": image.title,
                "mood": image.mood,
                "location": image.location,
                "date": image.date,
                "image_id": base64file
            });
            resolve(getImage)
        } catch {
            reject(new Error("Image does not exist!"));
        }
    })
}

function getAllImages() {
    return new Promise( async(resolve, reject) => {
        const sendAllImages = [];
        const allImages = await Images.find({});
        try {
            for(const image of allImages) {
                console.log('image', image)
                const oneImage = await getOneImage(image._id);
                sendAllImages.push(oneImage);
            }
            console.log('sendAllImages', sendAllImages)
            resolve(sendAllImages)
        } catch {
            reject(new Error("Images do not exist!"));
        }
    });
}


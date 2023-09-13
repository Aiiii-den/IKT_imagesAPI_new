const express = require('express');
let { mongoose } = require('./config/mongodb');
const { Images } = require("./schemas/images")

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

/**
 *  Routes
 */
const upload = require('./config/upload');
require('dotenv').config();

/* ----------------- POST ---------------------------- */

// POST one image
app.post('/image', upload.single('file'), async(req, res) => {
    const newPost = new Images({
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        image_id: req.file.filename
    })
    await newPost.save();
    res.send(newPost);
});

/* ----------------- GET ---------------------------- */

const connection = mongoose.createConnection(process.env.DB_CONNECTION);
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
                "location": image.location,
                "date": image.date,
                "image_id": base64file
            });
            resolve(getImage)
        } catch {
            reject(new Error("Post does not exist!"));
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
                error: "Post does not exist!"
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
                error: "Post do not exist!"
            });
        })
});

/* ----------------- DELETE ---------------------------- */

// DELETE one post via id
app.delete('/image/:id', async(req, res) => {
    try {
        const image = await Images.findOne({ _id: req.params.id })
        let fileName = image.image_id;
        await Images.deleteOne({ _id: req.params.id });
        await files.find({filename: fileName}).toArray( async(err, docs) => {
            await chunks.deleteMany({files_id : docs[0]._id});
        })
        await files.deleteOne({filename: fileName});
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});


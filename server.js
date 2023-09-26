const express = require('express');
let { mongoose } = require('./config/mongodb');
const { Images } = require("./schemas/images");
const upload = require('./config/upload');
const  ObjectId = require('mongodb').ObjectId
const connection = mongoose.createConnection(process.env.DB_CONNECTION);
require('dotenv').config();
const webpush = require('web-push')


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


/* ----------------- PUSH NOTIF -------------------------- */
const publicVapidKey = process.env.PUBLIC_KEY;
const privateVapidKey = process.env.PRIVATE_KEY;
const pushSubscription = {
    endpoint: process.env.ENDPOINT,
    keys: {
        p256dh: process.env.P256DH_KEY,
        auth: process.env.AUTH_KEY
    }
};

function sendNotification(message) {
    try{
        webpush.setVapidDetails('mailto:aiiden.dev@gmail.com', publicVapidKey, privateVapidKey);
        const payload = JSON.stringify({
            title: 'New Push Notification',
            content: message,
            openUrl: 'https://freiheit.f4.htw-berlin.de/ikt/'
        });
        webpush.sendNotification(pushSubscription,payload)
            .catch(err => console.error(err));
        console.log('push notification sent');
    }catch{
        console.log('push notif could not be send')
    }

}

/* ----------------- POST ---------------------------- */

// POST one image
app.post('/image', upload.single('file'), async(req, res) => {
    const newImage = new Images({
        _id: new ObjectId(),
        title: req.body.title,
        mood: req.body.mood,
        location: req.body.location,
        date: req.body.date,
        image_id: req.file.filename
    })
    await newImage.save();
    sendNotification('Entry was saved in database :)');
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
                "_id": image._id,
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


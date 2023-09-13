const express = require('express');

/*const promptRoutes = require('./routes/promptRoutes');
//const writingRoutes = require('./routes/writingRoutes');
//const imageRoutes = require('./routes/imageRoutes');
//app.use('/prompt', promptRoutes);
//app.use('/writing', writingRoutes);
//app.use('/picture', imageRoutes);*/

let { mongoose } = require('./config/mongodb');
const { Prompts } = require("./schemas/prompts");
const { Writings } = require("./schemas/writings");
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
 * PROMPT API
 */
app.post('/prompt', async(req, res) => {
    try {
        const newPrompt = new Prompts({
            promptQuestion: req.body.promptQuestion,
            topic: req.body.topic
        })
        const result = await newPrompt.save();
        res.status(201);
        res.send(result);
    }catch {
        res.status(404);
        res.send({
            error: "Prompt could not be saved!"
        })
    }
});

app.get('/prompt', async (req, res) => {
    try{
        Prompts.find({
        }).then(async (Prompts) => {
            console.log(Prompts);
            res.send(Prompts);
        })
    } catch {
        res.status(404);
        res.send({
            error: "Prompts could not be read!"
        })
    }
});

app.get('/prompt/:id', async (req, res) => {
    try{
        const prompt = await Prompts.findOne({_id: req.params.id});
        console.log(prompt);
        res.send(prompt);
    } catch {
        res.status(404);
        res.send({
            error: "Prompt could not be read!"
        })
    }
});

app.get('prompt/random', async(req, res) => {
    try{
        const allPrompts = Prompts.find({})
        let random = Math.floor(Math.random()*allPrompts.length)
        let randPrompt = allPrompts[random]
        console.log(randPrompt)
        res.send(randPrompt)
    } catch {
        res.status(404);
        res.send({
            error: "Random prompt could not be read!"
        })
    }
});

app.delete('/prompt/:id', async (req, res) => {
    try {
        await Prompts.deleteOne({_id: req.params.id})
        console.log('Entry was deleted')
        res.send()
    }
    catch {
        res.status(404)
        res.send({
            error: "Prompt could not be deleted!"
        })
    }
});

/**
 * WRITING & IMAGES API
 */
app.post('/writing', async(req, res) => {
    try {
        const newWriting = new Writings ({
            text: req.body.text,
            date: req.body.date,
            location: req.body.location
        })
        const result = await newWriting.save();
        res.status(201);
        res.send(result);

    }catch {
        res.status(404);
        res.send({
            error: "Writing could not be saved! "
        })
    }
});

app.get('/writing', async(req, res) => {
    try{
        Writings.find({
        }).then(async (Writings) => {
            console.log(Writings);
            res.send(Writings);
        })
    } catch {
        res.status(404);
        res.send({
            error: "Writings could not be read!"
        })
    }
});

/*
app.delete('/writing/:id', async(req, res) => {
    try {
        const writing = await Writings.deleteOne({ _id: req.params.id })
        console.log('writing', writing)
        if(writing.deletedCount === 1) {
            res.status(204)
            res.send( { message: "Writing deleted" })
        } else {
            res.status(404)
            res.send({ error: "Writing does not exist!" })
        }
    } catch {
        res.status(404)
        res.send({ error: "Something went wrong :(" })
    }
}); */

/*
const upload = require('./config/upload');
const { connection } = require("mongoose");
const { database } = require('./config/mongodb')

// POST one new image
app.post('/image', upload.single('file'), async(req, res) => {
    if (req.file === undefined) {
        return res.send({
            "message": "no file selected"
        });
    } else {
        try {
            const newImage = new Images({
                date: req.body.date,
                location: req.body.location,
                image_id: req.file.filename
            })
            const result = await newImage.save();
            res.status(201);
            res.send(result);
        } catch {
            res.status(404);
            res.send({
                error: "Image not saved"
            });
        }}
}); NEU */


/*
require('dotenv').config();
const bucket = new mongodb.GridFSBucket(IKT , {
    bucketName: 'images'
});*/
/*
app.get('/image/:filename', async(req, res) => {
    try {
        const filename = req.params.filename;
        let downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.on("data", (data) => res.status(200).write(data));
        downloadStream.on("error", (err) => res.status(404).send({ message: filename + " does not exist" }));
        downloadStream.on("end", () => res.end());
    } catch (error) {
        console.log('error', error);
        res.send("not found");
    }
});*/

/*
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
/*
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
                "filename": image.filename,
                "date": image.date,
                "location": image.location,
                "image_id": base64file
            });
            resolve(getImage)
        } catch {
            reject(new Error("Image does not exist!"));
        }
    })
} NEU */
 /*
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
} NEU */



const upload = require('./config/upload');
require('dotenv').config();

/* ----------------- POST ---------------------------- */

// POST one post
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
//IT WORKS!!!!!
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
            //console.log('getPost', getPost)
            resolve(getImage)
        } catch {
            reject(new Error("Post does not exist!"));
        }
    })
}

//DOESNT WORK, but maybe I wont need it
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

// GET one post via id
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

// GET all posts
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


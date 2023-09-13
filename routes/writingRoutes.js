/**
 * implement
 * POST one
 * GET ALL
 * DELETE
**/


const express = require('express');
const router = express.Router();
const { Writings } = require('../schemas/writings');
const ObjectId = require('mongodb').ObjectId;


// POST one new prompt
router.post('/', async(req, res) => {
    try {
        const newWriting = {
            id: new ObjectId(),
            text: req.body.text,
            date: req.body.date,
            location: req.body.location
        }
        const result = await Writings.insertOne(newWriting);
        res.status(201);
        res.send(result);

    }catch {
        res.status(404);
        res.send({
            error: "Writing could not be saved! "
        })
    }
});

// GET all prompts
router.get('/all', async(req, res) => {
    const allWritings = await Writings.find().toArray();
    res.status(200);
    res.send(allWritings);
});

// DELETE prompt by id
router.delete('/:id', async(req, res) => {
    try {
        const id_obj = new ObjectId(req.params.id);
        const writing = await Writings.deleteOne({ _id: id_obj })
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
        res.send({ error: "something went wrong :(" })
    }
});

module.exports = router;

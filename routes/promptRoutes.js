/**
 * implement
 * POST -- done
 * GET RANDOM -- done
 * GET ALL -- done
 * DELETE -- done
 */

const express = require('express');
const router = express.Router();
const mongoose = require('../config/mongodb');
const { Prompts } = require('../schemas/prompts');




// GET random
router.get('/random', async(req, res) => {
    const allPrompts = await Prompts.find().toArray();
    let random = Math.floor(Math.random()*allPrompts.length);
    const randomPrompt = allPrompts[random];
    res.status(200);
    res.send(randomPrompt);
});

// DELETE prompt by id
router.delete('/:id', async(req, res) => {
    try {
        const id_obj = new ObjectId(req.params.id);
        const prompt = await Prompts.deleteOne({ _id: id_obj })
        console.log('prompt', prompt)
        if(prompt.deletedCount === 1) {
            res.status(204)
            res.send( { message: "Prompt deleted" })
        } else {
            res.status(404)
            res.send({ error: "Prompt does not exist!" })
        }
    } catch {
        res.status(404)
        res.send({ error: "something went wrong :(" })
    }
});

module.exports = router;

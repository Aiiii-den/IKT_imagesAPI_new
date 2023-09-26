const express = require('express');
const webpush = require('web-push');
const router = express.Router();
require('dotenv').config();

const publicVapidKey = process.env.PUBLIC_KEY;
const privateVapidKey = process.env.PRIVATE_KEY;

router.post('/', async(req, res) => {
    const subscription = req.body;
    console.log('subscription', subscription);
    res.status(201).json({ message: 'subscription received'});

    webpush.setVapidDetails('mailto:aiiden.dev@gmail.com', publicVapidKey, privateVapidKey);
});

module.exports = router;

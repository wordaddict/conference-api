const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('../config/config');
const talksModel = require('../models/talks')
const attendeesModel = require('../models/attendees')

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Add a talk
router.post('/talk', (req, res) => {
    console.log('body', req.body);
    const { title, abstract, room, speaker } = req.body;
    const data = {
        title,
        abstract,
        room,
        speaker
    }

    return talksModel.create(data)
        .then(() => {
            res.send({
                message: 'we are live'
            })
        })
        .catch((err) => {
            console.log('Error from saving questions', err);
            res.send({
                message: 'ERROR'
            })
        })


});

// Add an attendee

router.post('/attendee', (req, res) => {
    console.log('body', req.body);
    const { name, company, email, registered } = req.body;
    const data = {
        name,
        company,
        email,
        registered
    }

    return attendeesModel.create(data)
        .then(() => {
            res.send({
                message: 'we are live'
            })
        })
        .catch((err) => {
            console.log('Error from saving questions', err);
            res.send({
                message: 'ERROR'
            })
        })
});

// Add attendees to a talk

router.post('/conf', (req, res) => {
    console.log('body', req.body);
    const { name, title } = req.body;

    return attendeesModel.create(data)
        .then(() => {
            res.send({
                message: 'we are live'
            })
        })
        .catch((err) => {
            console.log('Error from saving questions', err);
            res.send({
                message: 'ERROR'
            })
        })
});

module.exports = router;
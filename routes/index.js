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
    const { name, title } = req.body;
    console.log('req.body', req.body)
    return attendeesModel.findByName(name)
        .then((data) => {
                const att = {
                    name: data[0].name,
                    company: data[0].company,
                    email: data[0].email,
                    registered: data[0].registered
                }
                const query = { title: title }
                console.log('d', data)
                talksModel.findOneAndUpdate(query, { $push: { attendees : att }} )
                    .then((da) => {
                        console.log('update data', da);
                        res.send({
                            message: 'update succesful'
                        })
                    })
                    .catch((err) => {
                        console.log('update error', err)
                        res.send({
                            message: 'unable to update'
                        })
                    })
        })
        .catch((err) => {
            console.log('Error finding by name', err);
            res.send({
                message: 'ERROR finding by name'
            })
        })
});

module.exports = router;
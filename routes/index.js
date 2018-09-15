const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('../config/config');
const Response = require('../response/response');
const talksModel = require('../models/talks');
const attendeesModel = require('../models/attendees')

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

function emptyBody(res) {
    const reject = new Response(400, 'The payload body is empty', res, true)
    return reject.res_message();
}

// Add a talk
router.post('/talk', (req, res) => {
    console.log('body', req.body);
    if (Object.keys(req.body).length === 0) {
        return emptyBody(res)
    }
    const { title, abstract, room, speaker } = req.body;
    if (!title){
        const incomplete_data = new Response(400, 'Kindly provide all title for the talk', res, true)
        return incomplete_data.res_message();  
    }
    const data = {
        title,
        abstract,
        room,
        speaker
    }

    return talksModel.create(data)
        .then(() => {
            const savedTalk = new Response(200, 'Talk has been registered successfully', res, false);
            return savedTalk.res_message();
        })
        .catch((err) => {
            console.log('Error from saving talk', err);
            const unsavedTalk = new Response(404, 'Unable to register Talk', res, true);
            return unsavedTalk.res_message();
        })
});

// Add an attendee

router.post('/attendee', (req, res) => {
    console.log('body', req.body);
    if (Object.keys(req.body).length === 0) {
        return emptyBody(res)
    }
    const { name, company, email, registered } = req.body;
    const data = {
        name,
        company,
        email,
        registered
    }

    return attendeesModel.create(data)
        .then(() => {
            const savedAttendee = new Response(200, 'Attendee has been registered successfully', res, false);
            return savedAttendee.res_message();
        })
        .catch((err) => {
            console.log('Error from saving Attendee', err);
            const unsavedAttendee = new Response(404, 'Unable to register attendee', res, true);
            return unsavedAttendee.res_message();
        })
});

// Add attendees to a talk

router.post('/conf', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return emptyBody(res)
    }
    const { name, title } = req.body;
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
            return talksModel.findOneAndUpdate(query, { $push: { attendees : att }} )
                .then(() => {
                    const updatedTalk = new Response(200, 'Attendee has been added to talk successfully', res, false);
                    return updatedTalk.res_message();
                })
                .catch((err) => {
                    console.log('update error', err)
                    const unUpdatedTalk = new Response(404, 'Unable to add attendee to talk', res, true);
                    return unUpdatedTalk.res_message();
                })
        })
        .catch((err) => {
            console.log('Error finding by name', err);
            const unFoundName = new Response(400, 'Unable to find attendee name', res, true);
            return unFoundName.res_message();
        })
});

// remove a talk

router.delete('/talk/:title', (req, res) => {
    const { title } = req.params;
    talksModel.deleteOne({ title: title })
        .then(() => {
            const removeTalk = new Response(200, 'Talk has been removed successfully', res, false);
            return removeTalk.res_message();
        })
        .catch((err) => {
            console.log('err from deleting', err);
            const unremovedTalk = new Response(404, 'Unable to remove talk', res, true);
            return unremovedTalk.res_message();
        })
})

module.exports = router;
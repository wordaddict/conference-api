const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const AttendeesSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    registered: {
        type: Date,
        default: moment(),
    },
    default: []
});

AttendeesSchema.static('findByName', function(name, callback) {
    return this.find({ name }, callback);
  });

const attendeesModel = mongoose.model('attendees', AttendeesSchema);
module.exports = attendeesModel;
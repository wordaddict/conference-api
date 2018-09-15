const mongoose = require('mongoose');
const { Schema } = mongoose;
const attendeesModel = require('./attendees')

const TalksSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    abstract: {
        type: String,
        required: false
    },
    room: {
        type: Number,
        required: false
    },
    speaker: {
        name: {
            type: String,
            required: true,
            unique: true
        },
        company: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        bio: {
            type: String,
            required: false,
        },
        type: {String}
    },
    attendees: [attendeesModel.schema.obj]
});

TalksSchema.static('findByTitle', function(title, callback) {
    return this.find({ title }, callback);
  });

const talksModel = mongoose.model('talks', TalksSchema);
module.exports = talksModel;
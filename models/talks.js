const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    attendees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendees'
    }
});

const talksModel = mongoose.model('talks', TalksSchema);
module.exports = talksModel;
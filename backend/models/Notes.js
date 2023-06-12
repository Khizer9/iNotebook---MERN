const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type : "string",
        required: true,
    },
    decription: {
        type : "string",
        required: true,
    },
    tag: {
        type : "string",
        default: "General"
    },
    date: {
        type : Date,
        required: Date.now,
    }
  });

  module.exports = mongoose.model('notes', NotesSchema)
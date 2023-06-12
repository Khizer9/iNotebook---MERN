const mongoose = require('mongoose');

const UserSchema = new Schema({
    name: {
        type : "string",
        required: true,
    },
    email: {
        type : "string",
        required: true,
        unique : true,
    },
    password: {
        type : "string",
        required: true,
    },
    date: {
        type : Date,
        required: Date.now,
    }
  });

  module.exports = mongoose.model('User', UserSchema)
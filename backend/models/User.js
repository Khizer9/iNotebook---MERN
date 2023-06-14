const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type : "string",
        required: true,
    },
    email: {
        type : "string",
        required: true,
    }, 
    password: {
        type : "string",
        required: true,
    },
    date: {
        type : Date,
        default: Date.now,
    }
  });

  const User = mongoose.model('User', UserSchema)
  User.createIndexes();
  module.exports = User
//used for post login on server/server.js
const mongoose = require('mongoose');

var Login = mongoose.model('Login', {
  email: {
    type: String,
    required: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  }
});

module.exports = {Login};

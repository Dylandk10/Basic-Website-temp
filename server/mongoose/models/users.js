/*
DO NOT USE!!!!!
*/

const mongoose = require('mongoose');

var Users = mongoose.model('Users', {
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    minlength: 1
  },
  screenName: {
    type: String,
    required: true,
    minlength: 1
  }
});

module.exports = {Users};

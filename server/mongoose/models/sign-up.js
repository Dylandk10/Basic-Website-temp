const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
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
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not a valid Email'
    }
  },
  screenName: {
    type: String,
    required: true,
    minlength: 1
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//return email and id
userSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};
//generate tokens for login...
userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
}
userSchema.statics.findByToken = function() {
  var SignUp = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  //return promise??
  return SignUp.findOne({
    '_id':decoded._id,
    'tokens.token': token,
    'token.access': 'auth'
  });
}
//middlewere to pre hash password...
userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    })
  } else {
    next();
  }
});
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

var SignUp = mongoose.model('SignUp', userSchema);

module.exports = {SignUp};

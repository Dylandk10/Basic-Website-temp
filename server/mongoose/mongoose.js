var mongoose = require('mongoose');

mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/project2');

module.exports = {
  mongoose
};

//Not done and prob wont work
const MongoClient = require('mongodb');
const jwt = require('jsonwebtoken');

var isLoggedIn = (req, res) => {
  var token = req.header('x-auth');
  var decoded = jwt.verify(token, 'abc123');
  var url = 'mongodb://localhost:27017/project2';
  var promise1 = new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        return console.log(`Error ${err}`);
      }
      db.collection('signups').findOne({'tokens[token]': decoded}, function(err, user) {
        if(err) {
          console.log(err);
        }
        resolve(user.name);
      })
    });
  });
  promise1.then((user) => {
    return user;
  });
  return promise1;
};
module.exports = {isLoggedIn};

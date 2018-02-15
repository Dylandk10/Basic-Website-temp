const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs');

var loginAttempt = (tryEmail, password) => {
  var promise1 = new Promise((resolve, reject) => {
    var url = 'mongodb://localhost:27017/project2';
    var log = MongoClient.connect(url, (err, db) => {
      if (err) {
        return console.log(err);
      }
      db.collection('signups').findOne({
        "email": tryEmail
      }, function(err, user) {
        var result = bcrypt.compareSync(password, user.password);
        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  });
  promise1.then((res)=> {
    console.log(`Resturn true from res ${res}`);
    return res;
  });
  return promise1;
};
module.exports = {
  loginAttempt
};

//for finding asyn name in databse using email.
const mongoose = require('mongoose');
const MongoClient = require('mongodb');
var assert = require('assert');

var findName = (param) => {
  var promise1 = new Promise((resolve, reject) => {
    var url = 'mongodb://localhost:27017/project2';
    var log = MongoClient.connect(url, (err, db) => {
      if(err) {
        return console.log(err);
      }
      db.collection('signups').findOne({
        "email": param
      }, function(err, user) {
        if(err) {
          console.log(`Cant find user in DB ${err}`);
        }
        resolve(user.name);
      });
    });
  });
  promise1.then((res) => {
    return res;
  });
  return promise1;
};
module.exports = {
  findName
};

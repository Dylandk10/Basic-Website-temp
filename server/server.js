const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const passport = require('passport');
//signup required
var {SignUp} = require('./mongoose/models/sign-up');

var {Users} = require('./mongoose/models/users');
var {Login} = require('./mongoose/models/login');
var {loginAttempt} = require('./mongoose/models/loginAttempt');
var {isLoggedIn} = require('./middleware/isLoggedIn');
var {findName} = require('./mongoose/findName');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

//register partials
hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');

//user body parser to format json
app.use(bodyParser.json());
app.use(session({secret: 'anything'}));
app.use(passport.initialize());
app.use(passport.session());


//write to server log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server/sever.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to request server');
    }
  });
  console.log(log);
  next();
});

app.use(express.static(__dirname + '../../views'));
//full year for footer
hbs.registerHelper('getDate', () => {
  return new Date().getFullYear()
});
//acyn-btn for initials
var acyn = (name) => { hbs.registerHelper('acyn', () => {
  var str;
  name = name.split(' ');
    str = name.map((el) => {
      return el.slice(0, 1);
    });
    return str.join('.').toUpperCase();
});
}
//home page
app.get('/', (req, res) => {
  //******Come back and work on finishing promises to load page****//
  // var promise1 = new Promise((resolve, reject) => {
  //   var res2 = isLoggedIn(req);
  //   resolve(res2);
  // });
  // promise1.then((res) => {
  //   acyn(res);
  //   res.render('homePageLoggin.hbs', {
  //     titleName: '-K3LLY-'
  //   });
  // })
  res.render('homePage.hbs', {
    titleName: '-K3LLY-'
  });
});
//square Wars!!!
app.get('/game', (req, res) => {
  res.render('game.hbs', {
    titleName:'Square Wars V2 (Under Construction)'
  });
});
//square Wars Play again...reload page..
app.get('/playAgain', (req, res) => {
  res.render('game.hbs');
});
//contact page
app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});
//sign up page
app.get('/sign-up', (req, res) => {
  res.render('sign-up.hbs');
});


//sign up page rejester info to database!
app.get('/signup', (req, res) => {
   var signIn = new SignUp({
     name: req.query.name,
     email: req.query.email,
     screenName: req.query.screenName,
     password: req.query.password
  });

  signIn.save().then((user) => {
    console.log(req.query.name);
    //call function to acyn-btn
    acyn(req.query.name);
    res.render('homePageLoggin.hbs', {
      titleName: "-K3LLY-"
    });
    return user.generateAuthToken();
  }).then((token) => {
    //res.header('x-auth', token).send(user)
    console.log('Sign up successfull!...')
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/login', (req, res) => {
  var promise1 = new Promise((resolve1, reject1) => {
    var promise2 = new Promise((res, rej) => {
      var result = loginAttempt(req.query.email, req.query.password);
      res(result);
    });
    promise2.then((result) => {
      console.log(`Server result from login ${result}`);
      //call first promise with result to load page..
      resolve1(result);
    }).catch((e) => {
      console.log(`promise2 failed... ${e}`);
    });
  });
  promise1.then((result) => {
    if(!result) {
      res.render('sign-up.hbs');
    } else {
      var promise3 = new Promise((res, rej) => {
        var name = findName(req.query.email);
        res(name);
      });
      promise3.then((result) => {
        acyn(result);
        console.log(result);
        res.render('homePageLoggin.hbs', {
          titleName: "-K3LLY-"
        });
      })
    }
  }).catch((e) => console.log(`Error from server.js ${e}`));
});


app.listen(3000, () => {
  console.log('Starting sever on port 3000...');
});

module.export = {app};

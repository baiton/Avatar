const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const passport = require('passport');                 //passport related
const LocalStrategy = require('passport-local').Strategy; //passport
const session = require('express-session');
const bluebird = require('bluebird');
const bcrypt = require('bcryptjs')                 //passport related
const flash = require('express-flash-messages');   // passport related

bcrypt.compareSync(password, hash);           // passport related
let password = newUser.psw;                   //passport related
const hash = bcrypt.hashSync(password, 8);    //passport related

const app = express();
const session = require('express-session')
const dal = require('./dal.js')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


// session below and passport init
app.use(session({
  expires: null,
  secret:'this is a secret',
  resave: false,
  saveUninitialized: false,
  cookie:{maxAge: null},
  avatar:{
    skintone: "",
    expression: "",
    hair: ""
  }
  })
)

app.use(passport.initialize());         //passport related
app.use(passport.session());            //passport related
app.use(flash());                       //passport related

app.use(express.static('public'));


// bcryptjs below, put on your hardhats and lets go to work people!
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  passwordHash: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

userSchema.virtual('password')
  .get(function () { return null })
  .set(function (value) {
    const hash = bcrypt.hashSync(value, 8);
    this.passwordHash = hash;
  })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

// passport attempt below, fasten your seatbelts people. cat5 passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.authenticate(username, password, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: "There is no user with that username and password."
                })
            }
        })
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// -------------Login--------------------
app.get('/login', function(req,res) {
  res.render("login", {                      // passport related
        messages: res.locals.getMessages()   //passport related
    });
})

app.post('/login', function(req, res){       //passport related
  passport.authenticate('local', {           //passport related
    successRedirect: '/',                    // passport related
    failureRedirect: '/login',              //passport related
    failureFlash: true                      //passport related
  })
  return dal.getUserByUsername(req.body.username).then(function(loginUser){
  console.log('loginUser, loginUser.password, req.body.psw', loginUser, loginUser.password, req.body.psw)
  if(loginUser.password == req.body.psw){
    req.session.usr = {username: loginUser.username}
    res.redirect('/')
  }
  else{
    res.redirect('/login')
  }
})
})
// -------------Logout--------------------
app.get('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/login')
})
// -------------Register-----------------
app.get('/register', (req,res) =>{
  console.log("req.session", req.session);
  res.render('./register')
})
app.post('/register', function(req, res){
  console.log('register', req.body)
    if(req.body.psw === req.body.psw_repeat){
      console.log('psw and psw_repeat', req.body.psw, req.body.psw_repeat)
      return dal.addUser(req.body).then(function(){
        console.log('new user', req.body);
        res.redirect('/create/skintones')
      })
    }
    else{
      res.send('Passwords must Match')
    }
  })
// -------------All Avatars--------------
app.get('/', (req,res) =>{
  return dal.getAllCharacters().then(function(characters){
    res.render('./allAvatars', {characters})
    console.log('characters', characters)
  })
})
// -------------Skintone-----------------
app.get('/create/skintones', (req,res) =>{
  res.render('./skintone')
})

app.post('/create/skintones', (req, res) =>{
  req.session.avatar.skintone = req.body
  res.redirect('/create/expressions')
})
// -------------Expressions--------------
app.get('/create/expressions', (req,res) =>{
  let skinColor = req.session.avatar.skintone
  res.render('./expressions', skinColor)
})
app.post('/create/expressions', (req, res) =>{
  req.session.avatar.expression = req.body
  res.redirect('/create/hair')
})
// -------------Hair---------------------
app.get('/create/hair', (req,res) =>{
  let facialExpression = req.session.avatar.expression
  res.render('./hair', facialExpression)
})

app.post('/create/hair', (req, res) =>{
  req.session.avatar.hair = req.body
  updateCharacter(session.avatar).then() (req,res) =>{
    res.redirect('/', hairStyle)
  }
  // let hairStyle = req.session.avatar.hair
})




app.listen(3000, function() {
  console.log('server started on port: 3000')
})

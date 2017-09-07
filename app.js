const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
// const session = require('express-session')
const dal = require('./dal.js')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
//app.use(session({
  //secret:'this is a secret',
  //resave:false,
  //saveUninitialized:true,
  //cookie:{maxAge: null}
  //})
//)
app.use(express.static('public'));


// -------------Login--------------------
app.get('/login', (req,res) =>{
  res.render('./login')
})
app.post('/login', function(req, res){
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
<<<<<<< HEAD
    res.render('./allAvatars', {characters})
=======
    res.render('allAvatars', {characters})
>>>>>>> f03576870558d8f8180b98f3054f3272a0da348c
    console.log('characters', characters)
  })
})
// -------------Skintone-----------------
app.get('/create/skintones', (req,res) =>{
  res.render('./skintone')
})
// -------------Hair---------------------
app.get('/create/hair', (req,res) =>{
  res.render('./hair')
})
// -------------Expressions--------------
app.get('/create/expressions', (req,res) =>{
  res.render('./expressions')
})




app.listen(3000, function() {
  console.log('server started on port: 3000')
})

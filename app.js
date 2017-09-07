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
  const loginUser = dal.getUserByUsername(req.body.username)
  console.log('loginUser', loginUser)
  if(loginUser.password === req.body.password){
    req.session.usr = {username: loginUser.username}
    res.redirect('/')
  }
  else{
    res.redirect('login')
  }
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
app.post('/addUser', function(req, res){
    return dal.addUser(req.body).then(function(){
    console.log('new user', req.body);
    res.redirect('/')
    })
  })
// -------------All Avatars--------------
app.get('/', (req,res) =>{
  return dal.getAllCharacters().then(function(characters){
    res.render('allAvatars', {characters})
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

const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
// const session = require('express-session')
const {
} = require('./dal.js')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'));


// -------------Login--------------------
app.get('/login', (req,res) =>{
  res.render('./login')
})
// -------------Register-----------------
app.get('/register', (req,res) =>{
  res.render('./register')
})
// -------------All Avatars--------------
app.get('/Avatars', (req,res) =>{
  res.render('./allAvatars')
})
// -------------Skintone-----------------
app.get('/:id/create/skintones', (req,res) =>{
  res.render('./skintones')
})
// -------------Hair---------------------
app.get('/:id/create/hair', (req,res) =>{
  res.render('./hair')
})
// -------------Expressions--------------
app.get('/:id/create/expressions', (req,res) =>{
  res.render('./expressions')
})




app.listen(3000, function() {
  console.log('server started on port: 3000')
})

const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({
  username:{ type:String, required: true},
  password:{ type:String, required: true},
  avatar: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]  // references the other model's sting schema name
})
const User = mongoose.model('User', UserSchema)
module.exports = User

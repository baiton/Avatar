const mongoose = require('mongoose')

const CharacterSchema =  new mongoose.Schema({
  skintone:{ type:String, required: true},
  expression:{ type:String, required: true},
  hair:{type: String, required: true},
  userCreated: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const Character = mongoose.model('Character', CharacterSchema)
module.exports = Character

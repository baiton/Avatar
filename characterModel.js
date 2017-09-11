const mongoose = require('mongoose')

const CharacterSchema =  new mongoose.Schema({
  skin_tone:{ type:String, required: true},
  expression:{ type:String, required: true},
  hair:{type: String, required: true}
})
const Character = mongoose.model('Character', CharacterSchema)
module.exports = Character

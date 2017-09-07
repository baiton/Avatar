const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const User = require('./userModel.js');
const Character = require('./characterModel.js')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/avatardb');  //I will make your DB!
function getAllCharacters{
  return Character.find();
}
function addCharacter(newCharacter){
  const character = new Character({
    skin_tone:{ type:String, required: true},
    expression:{ type:String, required: true},
    hair:{type: String, required: true}
  })
  console.log('Xman', Xperson);
  Xperson.save(function(err){
    console.log(err)
  })
  return Promise.resolve('success')
}

// function getAllCharacters(){
//   return CharacterModel.find();
// }
//
// function getAllUsers(){
//   return UserModel.find();
// }
//
// function newUser(info){
//     let newGuy = new UserModel(info)
//     newGuy.save(function(err){
//       console.log('err from newGuy', err);
//     })
//     return Promise.resolve('success');
// }
//
// module.exports = {
//   getAllUsers, getAllCharacters, newUser
// }

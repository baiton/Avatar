const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const User = require('./userModel.js');
const Character = require('./characterModel.js')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/avatardb');  //I will make your DB!
function getAllCharacters(){
  return Character.find();
}

function getUserByUsername (username) {
  return User.find({ username: username }).exec().catch(function (err) {
    console.log('error', err)
  })
}

function addCharacter(newCharacter){
  const character = new Character({
    skin_tone: newCharacter.skin_tone,
    expression:newCharacter.expression,
    hair:newCharacter.hair
  })
  console.log('character', character);
  character.save(function(err){
    console.log(err)
  })
  return Promise.resolve('success')
}

function addUser(newUser){
  const user = new User({
    username: newUser.username,
    password: newUser.password
  })
  console.log('user', user);
  user.save(function(err){
    console.log(err)
  })
  return Promise.resolve('success')
}

function updateCharacter(character){
  Character.update({_id: character.id}, {$set:{
    skin_tone: Character.skin_tone,
    expression: Character.expression,
    hair: Character.hair
      }
    },
    function(err, data){
			if (err) return handleError(err);
			console.log("Mongo data", data)
      }
  )
}
module.exports = {
    getAllCharacters,
    getUserByUsername,
    addCharacter,
    addUser,
    updateCharacter
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

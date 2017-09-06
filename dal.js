const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Snippets');  //I will make your DB!
const CharacterModel = require('/characterModel')
const UserModel = require('/userModel')

function getAllCharacters(){
  return CharacterModel.find();
}

function getAllUsers(){
  return UserModel.find();
}

function newUser(info){
    let newGuy = new UserModel(info)
    newGuy.save(function(err){
      console.log('err from newGuy', err);
    })
    return Promise.resolve('success');
}

module.exports = {
  getAllUsers, getAllCharacters, newUser
}

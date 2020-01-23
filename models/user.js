const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  role: {
    type: String,
    enum: ["baby", "nurse", "parent"]
  },
  age: String,
  contrats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contrat",
    }
  ],
  // myChildren: [ // dans profil.js au get de l'url je n'arrive pas à findById sur un tableau
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //     name: String,
  //     age: String,
  //   }
  // ],
  myChildren: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      name: String,
      age: String,
    }
  ]
  ,
  isNurse: Boolean,
  isParent: Boolean,
  // nursename: String,
  // parentname: String,
  // confirmationCode: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

////////
//// https://stackoverflow.com/questions/38639248/mongoose-model-for-multi-types-of-users
///////

/*
const babySchema = Schema({
  username: String,
  contrats: [{
      parents: {type: Schema.Types.ObjectId, ref: 'Parent' },
      nurse: {type: Schema.Types.ObjectId, ref: 'Nurse' }
    }],
  age: String,
  sexe: String,
})

const postSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  picPath: String,
  picName: String,
  comments: {
    content: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User'}
  }
})


const cardSchema = Schema({
  _id: '<Obj8>',
  date: String,
  status: enum:['in', 'out'], // off || on 
  postId: '<Obj7>'
})
*/

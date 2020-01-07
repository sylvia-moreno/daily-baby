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
  contrats: [
    {
      baby: [
        {
          type: Schema.Types.ObjectId,
          ref: "baby"
        }
      ],
      parent: [
        {
          type: Schema.Types.ObjectId,
          ref: "parent"
        }
      ],
      nurse: { type: Schema.Types.ObjectId, ref: "nurse" }
    }
  ],
  babyname: String,
  nursename: String,
  parentname: String,
  isNurse: Boolean,
  isParent: Boolean,
  confirmationCode: String,
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

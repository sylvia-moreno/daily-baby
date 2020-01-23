require('./user.js');
const format = require("date-fns/format");

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String,
  comments: [
    {
      content: String,
      authorId: {type: Schema.Types.ObjectId, ref: 'User'},
      imagePath: String,
      imageName: String
    }
  ],
  created: { 
    type: Date,
    default: Date.now()
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

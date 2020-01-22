const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post");

const contratSchema = Schema({
  baby: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  parent: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  nurse: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
const Contrat = mongoose.model("Contrat", contratSchema);

module.exports = Contrat;

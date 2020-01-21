const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contratSchema = Schema({
  baby: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  nurse: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  messages: [
    {
      content: String,
      creatorId: { type: Schema.Types.ObjectId, ref: "User" },
      picPath: String,
      picName: String,
      comments: [
        {
          content: String,
          authorId: { type: Schema.Types.ObjectId, ref: "User" },
          imagePath: String,
          imageName: String
        }
      ],
      created: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});
const Contrat = mongoose.model("Contrat", contratSchema);

module.exports = Contrat;

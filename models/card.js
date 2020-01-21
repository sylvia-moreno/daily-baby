const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cardSchema = Schema({
  day: String,
  month: String,
  year: String,
  status: {
    enum:['in', 'out']
  }, 
})
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

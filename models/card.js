const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cardSchema = Schema({
  date: String,
  status: {
    enum:['in', 'out']
  }, 
})
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

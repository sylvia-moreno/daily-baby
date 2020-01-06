const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BabySchema = Schema({
    username: String,
    contrats: [{
        parents: {type: Schema.Types.ObjectId, ref: 'Parent' },
        nurse: {type: Schema.Types.ObjectId, ref: 'Nurse' }
      }],
    age: String,
    sexe: String,
});

const Baby = mongoose.model('User', BabySchema);

module.exports = Baby;
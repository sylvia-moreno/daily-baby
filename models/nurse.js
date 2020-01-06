const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const NurseSchema = Schema({
    username: String,
    contrats: [{
        baby: {type: Schema.Types.ObjectId, ref: 'Baby' },
        parent: {type: Schema.Types.ObjectId, ref: 'Parent' }
      }],
    age: String,
    sexe: String,
});

const Nurse = mongoose.model('User', NurseSchema);

module.exports = Nurse;
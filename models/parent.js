const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ParentSchema = Schema({
    username: String,
    contrats: [{
        baby: {type: Schema.Types.ObjectId, ref: 'Baby' },
        nurse: {type: Schema.Types.ObjectId, ref: 'Nurse' }
      }],
    age: String,
    sexe: String,
});

const Parent = mongoose.model('User', ParentSchema);

module.exports = Parent;
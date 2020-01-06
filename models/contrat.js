const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const contratSchema = Schema({
    parents: {type: Schema.Types.ObjectId, ref: 'User'},
    nurse: {type: Schema.Types.ObjectId, ref: 'User'},
    baby: {type: Schema.Types.ObjectId, ref: 'User'},
    startDate: String,
    endDate: String,
    price: Number,
    status: { type: string, enum: ['NOT_STARTED', 'IN_PROGRESS', 'ENDED'] }
})
const Contrat = mongoose.model('Contrat', contratSchema);

module.exports = Contrat;

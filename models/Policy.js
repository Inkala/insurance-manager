const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const policySchema = new Schema({
  amountInsured: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  inceptionDate: {
    type: Date,
    default: new Date()
  },
  installmentPayment: {
    type: Boolean,
    required: true
  },
  clientId: String,
  client: {
    type: ObjectId,
    ref: 'Client'
  }
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;

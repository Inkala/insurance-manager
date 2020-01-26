const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

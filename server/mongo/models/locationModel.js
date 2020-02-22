const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new mongoose.Schema({
  offeredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false, 
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['dirty without event', 'dirty with event', 'clean']
  }
});

module.exports = mongoose.model('Event', locationSchema);

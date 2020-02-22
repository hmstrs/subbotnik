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
  },
  photo: {
    url: {
      type: String
    },
    public_id: {
      type: String
    }
  }
});

module.exports = mongoose.model('Event', locationSchema);

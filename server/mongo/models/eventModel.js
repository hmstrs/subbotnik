const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: [],
    },
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Locations',
      required: true,
    },
  ],
  needed_people: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ['closed', 'opened'],
  },
});

module.exports = mongoose.model('Event', eventSchema);

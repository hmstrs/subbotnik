const mongoose = require('mongoose');
const { Schema, models, model } = mongoose;

const eventSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: false,
      default: [],
    },
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'locations',
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

module.exports = models.events || model('events', eventSchema);

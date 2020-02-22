const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  visited_events: [{
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: false,
    default: [],
  }],
  created_events: [{
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: false,
    default: [],
  }],
  added_locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Locations',
    required: false,
    default: [],
  }],
});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

module.exports = mongoose.model('User', userSchema);

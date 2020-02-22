const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema, models, model } = mongoose;

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
  photo: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  visited_events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'events',
      required: false,
      default: [],
    },
  ],
  created_events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'events',
      required: false,
      default: [],
    },
  ],
  added_locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'locations',
      required: false,
      default: [],
    },
  ],
});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

module.exports = models.users || model('users', userSchema);

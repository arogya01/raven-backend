
// models/device.js
import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  messages: {
    type: [String],
    default: [],
  },
});

export const Device = mongoose.model('Device', deviceSchema);
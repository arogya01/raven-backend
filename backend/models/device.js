// models/device.js
import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [{
    _id: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    dateSent: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  }],
});

export const Device = mongoose.model('Device', deviceSchema);

// server.js
import express from 'express';
import mongoose from 'mongoose';
import { Device } from './models/device.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deviceMessages';

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Health check route
app.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// POST route to add or update device messages
app.post('/messages', async (req, res) => {
  console.log("request recieved in /messages");
  try {
    const { deviceName, messages } = req.body;

    if (!deviceName || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const device = await Device.findOneAndUpdate(
      { name: deviceName },
      { $set: { messages } },
      { upsert: true, new: true }
    );

    res.status(200).json(device);
  } catch (error) {
    console.error('Error in POST /messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to retrieve all device messages
app.get('/messages', async (req, res) => {
  try {
    const devices = await Device.find({});
    res.status(200).json(devices);
  } catch (error) {
    console.error('Error in GET /messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

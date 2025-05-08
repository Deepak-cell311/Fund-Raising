const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const donationRoutes = require('./routes/donation');
const paymentsRoutes = require('./routes/payment');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
  // origin: "https://fund-raising-psi.vercel.app/",
  origin: ["https://fund-raising-psi.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
// Middleware
app.use(cors(corsOption));
app.options('', cors(corsOption));
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('MongoDB connected') })
  .catch((err) => { console.log('MongoDB connection error:', err) });


// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: "API is running" })
})
app.use('/api/donations', donationRoutes);
app.use('/api/payments', paymentsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const donationRoutes = require('./routes/donation');
const paymentsRoutes = require('./routes/payment');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
  origin: "https://fund-raising-psi.vercel.app/",
  methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
  credentials: true,
};
// Middleware
app.use(cors(corsOption));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
     res.status(200).json({message: "API is running"})
})
app.use('/api/donations', donationRoutes);
app.use('/api/payments', paymentsRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

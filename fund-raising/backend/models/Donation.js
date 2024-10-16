const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    referralCode: { type: String },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', DonationSchema);
module.exports = Donation;


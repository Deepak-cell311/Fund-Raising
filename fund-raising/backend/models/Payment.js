// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;

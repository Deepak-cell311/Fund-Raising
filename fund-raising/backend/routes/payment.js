// routes/payments.js
const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Received data:', req.body);
    const { donorName, amount, date } = req.body;
    const newPayment = new Payment({ donorName, amount, date });

    try {
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(400).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

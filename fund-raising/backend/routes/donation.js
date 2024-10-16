const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Create a new donation
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, referralCode, amount } = req.body;

        const newDonation = new Donation({ name, email, phone, referralCode, amount });
        await newDonation.save();

        // Here you can add logic to update the transaction dashboard if needed

        res.status(201).json({ message: "Donation successful!", donation: newDonation });
    } catch (error) {
        res.status(500).json({ message: "Error processing donation", error: error.message });
    }
});

module.exports = router;

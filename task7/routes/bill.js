const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Create Bill
router.post('/', async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Bill by Transaction ID
router.get('/:transactionId', async (req, res) => {
  try {
    const bill = await Bill.findOne({ transactionId: req.params.transactionId });
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

// Tạo hóa đơn mới
router.post('/', async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách hóa đơn
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().populate('table');
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy chi tiết hóa đơn
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('table');
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật hóa đơn
router.put('/:id', async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa hóa đơn
router.delete('/:id', async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

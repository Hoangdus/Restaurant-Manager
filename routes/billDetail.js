const express = require('express');
const router = express.Router();
const BillDetail = require('../models/billDetail'); // Mẫu BillDetail cần được định nghĩa tương ứng

// Thêm chi tiết hóa đơn
router.post('/', async (req, res) => {
  try {
    const newBillDetail = new BillDetail(req.body);
    await newBillDetail.save();
    res.status(201).json(newBillDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách chi tiết hóa đơn
router.get('/', async (req, res) => {
  try {
    const billDetails = await BillDetail.find().populate('bill meal');
    res.status(200).json(billDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật chi tiết hóa đơn
router.put('/:id', async (req, res) => {
  try {
    const updatedBillDetail = await BillDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBillDetail) return res.status(404).json({ message: 'Bill Detail not found' });
    res.status(200).json(updatedBillDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa chi tiết hóa đơn
router.delete('/:id', async (req, res) => {
  try {
    const deletedBillDetail = await BillDetail.findByIdAndDelete(req.params.id);
    if (!deletedBillDetail) return res.status(404).json({ message: 'Bill Detail not found' });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

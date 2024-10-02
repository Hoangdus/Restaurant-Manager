const express = require('express')
const router = express.Router();

const Bill = require('../models/bill');
const BillDetail = require('../models/billDetail');
const Ingredient = require('../models/ingredient');

// Tạo hóa đơn mới
router.post('/bill/add-bill', async (req, res) => {
    try {
      const newBill = new Bill(req.body);
      await newBill.save();
      res.status(201).json({
        message: 'Bill created successfully',
        data: newBill
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating bill', error: error.message });
    }
  });
  
  // Lấy danh sách hóa đơn
  router.get('/bill/get-list-bill', async (req, res) => {
    try {
      const bills = await Bill.find();
      res.status(200).json({
        message: 'Bills retrieved successfully',
        data: bills
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving bills', error: error.message });
    }
  });
  
  // Tìm hóa đơn theo ID
  router.get('/bill/:id', async (req, res) => {
    try {
      const bill = await Bill.findById(req.params.id);
      if (!bill) return res.status(404).json({ message: 'Bill not found' });
      
      res.status(200).json({
        message: 'Bill retrieved successfully',
        data: bill
      });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid bill ID' });
      }
      res.status(500).json({ message: 'Error retrieving bill', error: error.message });
    }
  });
  
  // Cập nhật hóa đơn
router.put('/bill/update-by-id/:id', async (req, res) => {
    try {
      // Cập nhật hóa đơn
      const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
  
      res.status(200).json({
        message: 'Bill updated successfully',
        data: updatedBill
      });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid bill ID' });
      }
      res.status(500).json({ message: 'Error updating bill', error: error.message });
    }
  });
  
  // Xóa hóa đơn
  router.delete('/bill/delete-by-id/:id', async (req, res) => {
    try {
      const deletedBill = await Bill.findByIdAndDelete(req.params.id);
      if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });
  
      res.status(200).json({
        message: 'Bill deleted successfully'
      });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid bill ID' });
      }
      res.status(500).json({ message: 'Error deleting bill', error: error.message });
    }
  });

  // Thêm chi tiết hóa đơn
router.post('/billDetail/add', async (req, res) => {
    try {
      const newBillDetail = new BillDetail(req.body);
      await newBillDetail.save();
      res.status(201).json({
        message: 'Bill Detail added successfully',
        data: newBillDetail
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Lấy danh sách chi tiết hóa đơn
  router.get('/billDetail/get-list-billDetail', async (req, res) => {
    try {
      const billDetails = await BillDetail.find();
      res.status(200).json({
        message: 'Bill Details retrieved successfully',
        data: billDetails
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Cập nhật chi tiết hóa đơn
  router.put('/billDetail/update-billDetail/:id', async (req, res) => {
    try {
      const updatedBillDetail = await BillDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBillDetail) return res.status(404).json({ message: 'Bill Detail not found' });
      
      res.status(200).json({
        message: 'Bill Detail updated successfully',
        data: updatedBillDetail
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Xóa chi tiết hóa đơn
  router.delete('/billDetail/delete-by-id/:id', async (req, res) => {
    try {
      const deletedBillDetail = await BillDetail.findByIdAndDelete(req.params.id);
      if (!deletedBillDetail) return res.status(404).json({ message: 'Bill Detail not found' });
      
      res.status(200).json({
        message: 'Bill Detail deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // Thêm nguyên liệu mới
router.post('/ingredient/add', async (req, res) => {
    try {
      const newIngredient = new Ingredient(req.body);
      await newIngredient.save();
      res.status(201).json({
        message: 'Ingredient added successfully',
        data: newIngredient
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Lấy danh sách nguyên liệu
  router.get('/ingredient/get-list', async (req, res) => {
    try {
      const ingredients = await Ingredient.find();
      res.status(200).json({
        message: 'Ingredients retrieved successfully',
        data: ingredients
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Cập nhật nguyên liệu
  router.put('/ingredient/update-by-id/:id', async (req, res) => {
    try {
      const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedIngredient) return res.status(404).json({ message: 'Ingredient not found' });
      
      res.status(200).json({
        message: 'Ingredient updated successfully',
        data: updatedIngredient
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Xóa nguyên liệu
  router.delete('/ingredient/delete-by-id/:id', async (req, res) => {
    try {
      const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
      if (!deletedIngredient) return res.status(404).json({ message: 'Ingredient not found' });
      
      res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router

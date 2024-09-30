const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient'); // Mẫu Ingredient cần được định nghĩa tương ứng

// Thêm nguyên liệu mới
router.post('/', async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách nguyên liệu
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật nguyên liệu
router.put('/:id', async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIngredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa nguyên liệu
router.delete('/:id', async (req, res) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!deletedIngredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

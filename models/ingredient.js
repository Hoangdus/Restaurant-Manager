const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  ingredient_name: {
    type: String,
    required: true 
  },
  ingredients_amount: {
    type: Number,
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('ingredient', ingredientSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billDetailSchema = new Schema({
    id_bill: {
      type: Schema.Types.ObjectId,
      ref: 'bill', 
      required: true
    },
    id_meal: {
      type: Schema.Types.ObjectId,
      ref: 'meal', 
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('bill_detail', billDetailSchema);
  
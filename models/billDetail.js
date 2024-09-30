const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billDetailSchema = new Schema({
    bill: {
      type: Schema.Types.ObjectId,
      ref: 'bill', 
      required: true
    },
    meal: {
      type: Schema.Types.ObjectId,
      ref: 'meal', 
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('billDetail', billDetailSchema);
  
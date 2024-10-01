const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  id_table: { 
    type: Schema.Types.ObjectId, 
    ref: 'table', 
    required: true 
  },
  total: {
    type: Number,
    required: true
  },
  bill_status: {
    type: Number,
    enum: [0,1], //0:đang cho,1:da thanh toán
    default: 0
  },
 
}, { timestamps: true });

module.exports = mongoose.model('bill', billSchema);

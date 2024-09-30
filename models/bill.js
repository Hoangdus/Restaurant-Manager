const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  table: { 
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
    enum: [0,1], 
    default: 0
  },
 
}, { timestamps: true });

module.exports = mongoose.model('bill', billSchema);

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meal = new Schema({
    name: {type: String, required:true},
    price: {type: Number, required:true},
    status: {type: Number, required:true},
    type_id: {type: Schema.Types.ObjectId, ref:'meal_type', required:true},
    info: {type: String, required:true},
    rating: {type: Number, required:true},
},{
    timestamps:true
})

module.exports = mongoose.model("meal", meal)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meal = new Schema({
    name:{type: String},
    price: String,
    status: Number,
    type_id: {type: Schema.Types.ObjectId, ref:'meal_type'},
    info: String,
    rating: Number,
},{
    timestamps:true
})

module.exports = mongoose.model("meal", meal)
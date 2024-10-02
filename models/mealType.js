const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealType = new Schema({
    name:{type: String, required: true}
},{
    timestamps:true
})

module.exports = mongoose.model("meal_type", mealType)
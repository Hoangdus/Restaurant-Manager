const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menu = new Schema({
    id_meal:{type: Schema.Types.ObjectId, ref: 'meal'}
},{
    timestamps:true
})

module.exports = mongoose.model("menu", menu)
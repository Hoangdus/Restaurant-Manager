const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const localDB = 'mongodb://localhost:27017/Restaurant-Data'

const connect = async()=>{
    try{
        await mongoose.connect(localDB)
        console.log("connect to database success")
    }catch(error){
        console.log(error)
    }
}

module.exports = {connect}
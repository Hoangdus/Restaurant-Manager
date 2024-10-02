require("dotenv").config();
const express = require('express')
const Meal = require('../models/meal')
const MealType = require('../models/mealType')
const Menu = require('../models/menu')
const {jwtVerify} = require("jose");
var router2 = express.Router()

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)//check for token present
    var result = await jwtVerify(token, secret).catch((err)=>{res.sendStatus(403)})
    if(result){
        next()
    }
}

//meal
router2.get('/meal/get-meals/:mealID?', authenticateToken, async(req,res)=>{
    try{
        const mealID = req.params.mealID || null
        if (mealID){
            const aMeal = await Meal.findById(mealID)
            res.status(200).json({
                "message":"1 meal",
                "data": aMeal
            })
        }else{
            const mealList = await Meal.find()
            res.status(200).json({
                "message":"meal list",
                "data": mealList
            })    
        }
    }catch(error){
        res.sendStatus(500)
        console.log(error)
    }
})

router2.get('/meal/search-meal',authenticateToken, async(req,res)=>{
    try{
        const mealname = req.query.mealname
        const searchedMeal = await Meal.find({name: {"$regex": mealname, "$options":"i"}}).sort({createdAt:1})
        res.status(200).json({
            "message":"searched for meal",
            "data":searchedMeal
        })
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

router2.post('/meal/add-meal',authenticateToken, async(req,res)=>{
    try{
        const data = req.body
        console.log(data)
        const newMeal = new Meal(data)
        const result = await newMeal.save()
        if(result){
            res.status(200).json({
                "message":"add meal success",
                "meal-data":result
            })
        }else{
            res.status(400).json({
                "message":"add meal not success",
                "meal-data":{}
            })
        }
    }catch(error){
        res.status(500).json({
            "message":error
        })
        console.log(error)
    }
})

router2.put('/meal/update-meal/:mealID',authenticateToken, async(req,res)=>{
    try{
        const {mealID} = req.params
        const newData = req.body
        newData._id = mealID
        const meal = await Meal.findByIdAndUpdate(mealID, newData)
        if(meal){
            res.status(200).json({
                "message":"update meal ok",
                "data":newData
            })
        }else{
            res.status(400).json({})
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

router2.delete('/meal/delete-meal/:mealID',authenticateToken, async(req,res)=>{
    try{
        const {mealID} = req.params
        const result = await Meal.findByIdAndDelete(mealID)
        if(result){
            res.status(200).json({
                "message":"delete meal ok",
                "data":result
            })
        }else{
            res.status(400).json({})
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

//meal type
router2.get('/meal-type/get-meal-types/:mealTypeID?', authenticateToken, async(req,res)=>{
    try{
        const mealTypeID = req.params.mealTypeID || null
        if (mealTypeID){
            const aMealType = await MealType.findById(mealTypeID)
            res.status(200).json({
                "message":"1 meal type",
                "data": aMealType
            })
        }else{
            const mealTypes = await MealType.find()
            res.status(200).json({
                "message":"meal list",
                "data": mealTypes
            })    
        }
    }catch(error){
        res.sendStatus(500)
        console.log(error)
    }
})

router2.post('/meal-type/add-meal-type',authenticateToken, async(req,res)=>{
    try{
        const data = req.body
        console.log(data)
        const newMealType = new MealType(data)
        const result = await newMealType.save()
        if(result){
            res.status(200).json({
                "message":"add meal type success",
                "meal-type-data":result
            })
        }else{
            res.status(400).json({
                "message":"add meal type not success",
                "meal-type-data":{}
            })
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

router2.put('/meal-type/update-meal-type/:mealTypeID',authenticateToken, async(req,res)=>{
    try{
        const {mealTypeID} = req.params
        const newData = req.body
        newData._id = mealTypeID
        const mealtype = await MealType.findByIdAndUpdate(mealTypeID, newData)
        if(mealtype){
            res.status(200).json({
                "message":"update meal type ok",
                "data":newData
            })
        }else{
            res.status(400).json({
                "message":"update meal type not ok",
                "data":{}
            })
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

router2.delete('/meal-type/delete-meal-type/:mealTypeID',authenticateToken, async(req,res)=>{
    try{
        const {mealTypeID} = req.params
        const result = await MealType.findByIdAndDelete(mealTypeID)
        if(result){
            res.status(200).json({
                "message":"delete meal type ok",
                "data":result
            })
        }else{
            res.status(400).json({
                "message":"delete meal type not ok",
                "data":{}
            })
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

//menu
router2.get('/menu/get-menu-items/:menuItemID?', authenticateToken, async(req,res)=>{
    try{
        const menuItemID = req.params.mealTypeID || null
        if (menuItemID){
            const aMenuItem = await Menu.findById(menuItemID)
            res.status(200).json({
                "message":"a menu item",
                "data": aMenuItem
            })
        }else{
            const menuItems = await Menu.find()
            res.status(200).json({
                "message":"menu items",
                "data": menuItems
            })    
        }
    }catch(error){
        res.sendStatus(500)
        console.log(error)
    }
})

router2.post('/menu/add-menu',authenticateToken, async(req,res)=>{
    try{
        const data = req.body
        console.log(data)
        const newMenuItem = new Menu(data)
        const result = await newMenuItem.save()
        if(result){
            res.status(200).json({
                "message":"add menu item success",
                "meal-type-data":result
            })
        }else{
            res.status(400).json({
                "message":"add menu item not success",
                "meal-type-data":{}
            })
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

router2.put('/menu/update-menu/:menuItemID',authenticateToken, async(req,res)=>{
    try{
        const {menuItemID} = req.params
        const newData = req.body
        newData._id = menuItemID
        const menuItem = await Menu.findByIdAndUpdate(menuItemID, newData)
        if(menuItem){
            res.status(200).json({
                "message":"update menu item ok",
                "data":newData
            })
        }else{
            res.status(400).json({
                "message":"update menu item not ok",
                "data":{}
            })
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

router2.delete('/menu/delete-menu/:menuItemID',authenticateToken, async(req,res)=>{
    try{
        const {menuItemID} = req.params
        const result = await Menu.findByIdAndDelete(menuItemID)
        if(result){
            res.status(200).json({
                "message":"delete menu item ok",
                "data":result
            })
        }else{
            res.status(400).json({
                "message":"delete menu item not ok",
                "data":{}
            })
        }
    }catch(error){
        res.status(500).json({})
        console.log(error)
    }
})

module.exports = router2
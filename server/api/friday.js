const { Router } = require("express")
const fileUpload = require("express-fileupload")
const mongodb = require('mongodb')
const router = Router()
const FridayHours = require('../models/FridayHours')

router.use(fileUpload())

router.get('/', (req, res) => {
    try {
        FridayHours.find({}, function(err, foundData) { 
            if(err) {
                console.log(err);
                return res.status(500).send();
            } else {
                return res.status(200).send(foundData)
            }
          })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.put('/booking/', async (req, res)=> {
    try {
        const {children, hourTitle} = req.body
        let hour = await FridayHours.findOne({title: hourTitle})

        hour.booking = true
        hour.user = {...children}

        await hour.save()

        return res.status(200).send({message: "User booked"})

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
  
})

router.put('/onbooking/', async (req, res)=> {
    try {
        const {hourTitle} = req.body
        let hour = await FridayHours.findOne({title: hourTitle})

        hour.booking = false
        hour.user = {}

        await hour.save()
        
        return res.status(200).send({message: "User unbooked"})

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
  
})

module.exports = router;
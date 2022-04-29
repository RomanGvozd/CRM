const { Router } = require("express")
const fileUpload = require("express-fileupload")
const mongodb = require('mongodb')
const router = Router()
const MondayHours = require('../models/MondayHours')

router.use(fileUpload())

router.get('/', (req, res) => {
    try {
        MondayHours.find({}, function(err, foundData) { 
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
        let hour = await MondayHours.findOne({title: hourTitle})

        hour = {
            ...hour,
            booking : true,
            children: {...children}
        }

        // await hour.save()

        console.log(hour)

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
  
})

router.put('/onbooking/', async (req, res)=> {
    try {
        const {hourTitle} = req.body
        let hour = await MondayHours.findOne({title: hourTitle})

        hour.booking = false

        await hour.save()

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
  
})

module.exports = router;

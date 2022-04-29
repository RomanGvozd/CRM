const { Router } = require("express");
const fileUpload = require("express-fileupload")
const mongodb = require('mongodb')
const fs = require("fs")
const router = Router()
const Group = require('../models/Group')

router.use(fileUpload())

router.post("/", async (req, res) => {
    try{
      const {body} = req
  
      const group = new Group({ ...body, showChildren: false })
      await group.save()
      return res.status(201).send({message: "Group was created"})

    } catch (e) {

      console.log(e)
      res.send({message: "Server error"})

    }

});

router.get('/', async (req, res)=> {
  try {
    Group.find({}, function(err, foundData) { 
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

router.put('/', async (req, res)=> {
  try {
    const {children, groupId} = req.body
    const group = await Group.findOne({_id: groupId})
    group.users.push(children)
    await group.save()
    return res.status(200).send({message: "User added to group"})

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }

})

router.delete('/users/:id', async (req, res)=> {
  try {
    const id = req.params.id

    const idArray =  id.split(',')
    const userId = idArray[0]
    const groupId = idArray[1]
  
    const group = await Group.findOne({_id: groupId})
  
    const filteredGroup = group.users.filter((user)=>user._id !== userId)
  
    group.users = filteredGroup
  
    await group.save()
    res.json({ success: userId })

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }

});


router.delete('/:id', async (req, res)=> {
  try {
    const id = req.params.id

    await Group.deleteOne({ _id: id }, function (err, results) {
    });
  
    res.json({ success: id })

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
});

module.exports = router;

const { Router } = require("express");
const fileUpload = require("express-fileupload");
const mongodb = require('mongodb');
const fs = require("fs");
const router = Router();
const User = require('../models/User');
const { nextTick } = require("process");

router.use(fileUpload());

router.post("/",

  async (req, res) => {

    try{
      const { files, body } = req

      const image = files.image;
      
      const user = new User({ ...body })
      await user.save()
      return res.status(201).send({message: "User was created"})

    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }

});

router.get('/', async(req, res)=> {

  try {
    User.find({}, function(err, foundData) { 
      if(err) {
          console.log(err);
          return res.status(500).send();
      } else {
          return res.status(200).send(foundData);
      }
  });

  } catch (error) {
      console.log(e)
      res.send({message: "Server error"})
  }

});

router.delete('/:id', async (req, res)=> {
  const id = req.params.id;

  User.deleteOne({ _id: id }, function (err, results) {
  });

  res.json({ success: id })
});

module.exports = router;

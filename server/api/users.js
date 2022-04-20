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
      const imageName = Date.now() + "" + image.name
      fs.writeFile("./images/" + imageName, image.data, () => {
        res.send(body)
      });
  
      const user = new User({ ...body, img: imageName })
      await user.save()
      return res.status(200).send({message: "User was created"})

    } catch (e) {

      console.log(e)
      res.send({message: "Server error"})

    }

});

router.get('/', function(req, res) {
  User.find({}, function(err, foundData) { 
      if(err) {
          console.log(err);
          return res.status(500).send();
      } else {
          return res.status(200).send(foundData);
      }
  });
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  const collection = db.get().collection('users');

  collection.deleteOne({ _id: new mongodb.ObjectId(id) }, function (err, results) {
  });

  res.json({ success: id })
});

module.exports = router;

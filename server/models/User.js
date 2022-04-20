const {Schema, model, ObjectId} = require("mongoose");

const User = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: Number, required: true},
    specialization: {type: String, required: true},
    files: [{type: ObjectId, ref: 'file'}]
});

module.exports = model('User', User);
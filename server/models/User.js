const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: Number, required: true},
    number: {type: Number, required: true},
    specialization: {type: String, required: true},
    // img: [{type: ObjectId, ref: 'file'}]
});

module.exports = model('User', schema);
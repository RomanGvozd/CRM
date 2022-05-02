const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    specialization: {type: String, required: true},
    showChildren: {type: Boolean, required: true},
    users: [{type: Object}]
});

module.exports = model('Group', schema);
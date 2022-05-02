const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    title: {type: String, required: true},
    booking: {type: Boolean, required: true},
    user: {type: Object}
});

module.exports = model('SundayHours', schema);
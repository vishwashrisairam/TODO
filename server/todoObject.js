const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    // id:{type:Number,requried:true},
    content:{type:String,requried:true},
    completed:{type:Boolean,default:false},
    date:{type:Date,default:Date.now}
});

module.exports = mongoose.model('TodoSchema',TodoSchema)
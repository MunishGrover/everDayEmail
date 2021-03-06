const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    timezone:{
        type:String,
        required:true
    }
})

module.exports=User=mongoose.model('users',UserSchema)
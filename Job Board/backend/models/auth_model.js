const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const authSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    appliedApplications:{
        type:ObjectId,
        ref:'jobModel'
    },
    jobPosted:{
        type:ObjectId,
        ref:'jobModel'
    }
},{timestamps:true})

const authModel = mongoose.model('authModel',authSchema);

module.exports = authModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const jobSchema = new Schema({
    postedBy:{
        type:ObjectId,
        ref:'authModel'
    },
    profile:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    skill:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
        required:true
    },
    eligibility:{
        type:String,
        required:true
    },
    openings:{
        type:Number,
        required:true
    },
    appliedBy:[{
        userId:{
            type:ObjectId,
            ref:'authModel'
        },
        resume:{
            type:String,
            required:true
        },
        coverLetter:{
            type:String,
            required:true
        },
        status:{
            type:String,
            default:"pending"
        }
    }]
},{timestamps:true});

const jobModel = mongoose.model('jobModel',jobSchema);
module.exports = jobModel;
const jobModel = require("../models/job_model");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});


const postJob = async (req, res) => {
    const { profile, jobDescription, salary, skill, location, companyName, aboutCompany, eligibility,openings } = req.body;
    const postedBy = req.user;

    try {
        if(!profile||!jobDescription||!salary||!skill||!location||!companyName||!aboutCompany||!eligibility||!openings){
            return res.status(400).json({message:"All fields are mandatory!"});
        }

        const post = new jobModel({postedBy, profile, jobDescription, salary, skill, location, companyName, aboutCompany, eligibility,openings});
        const job = await post.save();
        if(!job){
            return res.status(400).json({message:"Error while listing job!"});
        }

        return res.status(201).json({message:"Job posted successfully!",job:job});
    } catch (error) {
        return res.status(400).json({message:"Error Occurred!"});
    }
}

//check after making frontend for uploading resume
const jobApply = async (req, res) => {
    const { resume, coverLetter } = req.body;
    const jobId = req.params.id;
    const userId = req.user.id;

    try {
        if (!resume || !coverLetter) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const findJob = await jobModel.findById({ _id:jobId });
        if (!findJob) {
            return res.status(400).json({ message: "Job not found!" });
        }

        const updatedJob = await jobModel.findOneAndUpdate(
            { _id:jobId },
            { $push: { appliedBy: { userId, resume, coverLetter } } }
        );

        if (!updatedJob) {
            return res.status(400).json({ message: "Error while applying!" });
        }

        const info = await transporter.sendMail({
            from: `"Job Dekho"${process.env.SMTP_MAIL}`, // sender address
            to: req.user.email, // list of receivers
            subject: `Job Application`, // Subject line
            text: "Woohoooo, You have successfully applied for the job! Kindly wait for the response from the employer.", 
        });

        return res.status(200).json({ message: "Applied successfully!",mail:info.messageId });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error Occurred!" });
    }
};

const searchJob = async (req, res) => {
    const jobName = req.params.name;

    try {
        // Using a regular expression with 'i' flag for case-insensitive search
        const findJob = await jobModel.find({ profile: { $regex: jobName, $options: 'i' } });

        if (!findJob || findJob.length === 0) { 
            return res.status(404).json({ message: "Job not found!" });
        }

        return res.status(200).json({ message: "Jobs Found!",found:findJob.length, jobs: findJob });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!" });
    }
}

const allJobs = async(req,res) => {
    
    try {
        const allJob = await jobModel.find();
        if(!allJob){
            return res.status(400).json({message:"No jobs found!"});
        }

        return res.status(400).json({message:"Jobs Found!",found:allJob.length,jobs:allJob});
    } catch (error) {
        return res.status(400).json({message:"Error Occurred!"});
    }
}

module.exports = {
    postJob,
    jobApply,
    searchJob,
    allJobs
}
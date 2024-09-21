import { apiResponse } from "../utils/apiResponse.js";
import { Job } from "../models/job.model.js"
import { apiError } from "../utils/apiError.js";


// for companies
const postJob = async (req, res) => {
    try {
        // Extract data from the request body
        const {
            title,
            description,
            projectType,
            experienceLevel,
            jobCategory,
            budget,
            duration,
            numberOfFreelancers,
            skills,
            postedBy // Ensure the company ID is included in the request
        } = req.body;

        // Create a new job instance using the Job schema
        const newJob = new Job({
            title,
            description,
            projectType,
            experienceLevel,
            jobCategory,
            budget,
            duration,
            numberOfFreelancers,
            skills,
            postedBy, // Set the company ID
            freelancersApplied: [], // Initialize as an empty array
            status: 'open', // Set initial job status to 'open'
            hiredFreelancers: [], // Initialize as an empty array
            isActive: true
        });

        // Save the job to the database
        const savedJob = await newJob.save();

        // Send the response back to the client
        res.status(201).json(new apiResponse(200, {
            success: true,
            message: 'Job posted successfully',
            job: savedJob
        }, 'Job posted successfully'));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error posting the job',
            error: error.message
        });
    }
};

const jobsPosted = async (req, res) => {
    try {
        const { postedBy } = req.params;
        const jobs = await Job.find({ postedBy });
        res.status(200).json(new apiResponse(200, {
            success: true,
            jobs
        }, 'Jobs fetched successfully'));
    } catch (error) {
        res.status(500)
            .json(new apiError(500, {
                success: false,
                message: 'Error fetching jobs',
                error: error.message
            }));
    }
};



// for freelancers
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
        res.status(200).json(new apiResponse(200, {
            success: true,
            jobs
        }, 'Jobs fetched successfully'));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching jobs',
            error: error.message
        });
    }
};

export { postJob, getAllJobs, jobsPosted };

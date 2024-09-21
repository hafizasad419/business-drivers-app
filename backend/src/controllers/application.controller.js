// application.controller.js
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { apiResponse } from "../utils/apiResponse.js";

//for company
const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Fetch all applications for the job and populate freelancer details
        const applications = await Application.find({ job: jobId })
            .populate('applicant', 'fullName email skills') // Populate freelancer's basic details
            .populate('job', 'title'); // Populate job title

        res.status(200).json({ message: 'Applications fetched successfully', applications });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        // Ensure the status is either accepted or rejected
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Update the application status
        const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });

        if (!application) return res.status(404).json({ message: 'Application not found' });

        res.status(200).json({ message: 'Application status updated', application });
    } catch (error) {
        res.status(500).json({ message: 'Error updating application status', error });
    }
};

// for freelancer
const applyForJob = async (req, res) => {
    const { jobId, applicantId, coverLetter, proposedRate, estimatedCompletionTime } = req.body;

    try {
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        // Create new application
        const newApplication = new Application({
            applicant: applicantId,
            job: jobId,
            coverLetter,
            proposedRate,
            estimatedCompletionTime,
        });

        await newApplication.save();
        return res.status(201).json(new apiResponse(201, { message: "Application submitted successfully", application: newApplication }));
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};


export const getFreelancerApplications = async (req, res) => {
    const { freelancerId } = req.body; 

    try {
        const applications = await Application.find({ applicant: freelancerId }).populate('job');

        return res.status(200).json({
            success: true,
            data: applications,
        });
    } catch (error) {
        console.error('Error fetching user applications:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch applications',
        });
    }
};





export { applyForJob, getJobApplications, updateApplicationStatus }
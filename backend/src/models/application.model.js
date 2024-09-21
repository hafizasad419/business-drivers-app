import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the freelancer or user applying for the job
        ref: 'Freelancer', 
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the job being applied to
        ref: 'Job', 
        required: true
    },
    coverLetter: {
        type: String,
        required: true,
        trim: true
    },
    proposedRate: {
        type: Number, // The rate the freelancer is proposing
        required: true
    },
    estimatedCompletionTime: {
        type: String, // A string describing the estimated time, e.g., "1 week", "3 days"
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Basic status options
        default: 'pending'
    },
}, { timestamps: true });

export const Application = mongoose.model('Application', applicationSchema);

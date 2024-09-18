import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    projectType: {
        type: String,
        enum: ['ongoing', 'one-time'],
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ['entry', 'intermediate', 'expert'],
        required: true
    },
    jobCategory: {
        type: String,
        required: true,
        trim: true
    },
    budget: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    numberOfFreelancers: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    // New fields
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Assuming there's a 'Company' model
        required: true
    },
    freelancersApplied: [{
        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Freelancer' // Assuming there's a 'Freelancer' model
        },
        proposal: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ['applied', 'interview', 'hired', 'rejected'],
            default: 'applied'
        }
    }],
    status: {
        type: String,
        enum: ['open', 'closed', 'hiring', 'completed'],
        default: 'open'
    },
    hiredFreelancers: [{
        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Freelancer'
        },
        agreedBudget: {
            type: Number
        },
        startDate: {
            type: Date
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);

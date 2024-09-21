import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, DollarSign, Clock, Users, Briefcase, Star, User, FileText, Calendar } from 'lucide-react';
import { getJobApplications, updateApplicationStatus } from '../../../apis';

const ClientPostedJob = ({ job }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const fetchApplications = async () => {
            if (isExpanded) {
                try {
                    setLoading(true);
                    const fetchedApplications = await getJobApplications(job._id);
                    setApplications(fetchedApplications);
                } catch (error) {
                    console.error('Error fetching applications:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchApplications();
    }, [isExpanded, job._id]);

    const handleStatusUpdate = async (applicationId, status) => {
        try {
            const updatedApplication = await updateApplicationStatus(applicationId, status);
            setApplications((prev) =>
                prev.map(app => app._id === applicationId ? updatedApplication : app)
            );
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const experienceLevelIcon = {
        entry: 1,
        intermediate: 2,
        expert: 3
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden my-6 border-2 border-orange">
            <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={toggleExpand}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-darkBlue">{job.title}</h2>
                    {isExpanded ? <ChevronUp className="text-orange" size={24} /> : <ChevronDown className="text-orange" size={24} />}
                </div>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-orange" />
                        <span>{job.budget}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-orange" />
                        <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-orange" />
                        <span>{job.numberOfFreelancers} needed</span>
                    </div>
                    <div className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-orange" />
                        <span>{job.projectType} project</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 border-t border-gray-200">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-darkBlue mb-2">Job Details</h3>
                                <p className="text-gray-600 mb-4">{job.description}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-darkBlue mb-2">Experience Level</h4>
                                        <p className="flex items-center">
                                            {[...Array(experienceLevelIcon[job.experienceLevel])].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-orange mr-1" />
                                            ))}
                                            <span className="ml-2">{job.experienceLevel}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-darkBlue mb-2">Category</h4>
                                        <p>{job.jobCategory}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-orange mb-4">Applications</h3>
                                {loading ? (
                                    <p className="text-gray-600">Loading applications...</p>
                                ) : applications.length === 0 ? (
                                    <p className="text-gray-600">No applications found for this job.</p>
                                ) : (
                                    <div className="space-y-6">
                                        {applications.map(application => (
                                            <div key={application._id} className="bg-gray-200 rounded-lg p-6 shadow-sm">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-darkBlue">{application.applicant.fullName}</h4>
                                                        <p className="text-gray-600">{application.applicant.email}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div className="flex items-center">
                                                        <DollarSign className="w-5 h-5 mr-2 text-orange" />
                                                        <span>Proposed Rate: ${application.proposedRate}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-5 h-5 mr-2 text-orange" />
                                                        <span>Estimated Time: {application.estimatedCompletionTime}</span>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-semibold text-darkBlue mb-2">Skills</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {application.applicant.skills?.map((skill, index) => (
                                                            <span key={index} className="bg-lightBlue text-white px-2 py-1 rounded-full text-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h5 className="font-semibold text-darkBlue mb-2">Cover Letter</h5>
                                                    <p className="text-gray-600">{application.coverLetter}</p>
                                                </div>
                                                {application.status === 'pending' && (
                                                    <div className="flex gap-4">
                                                        <button
                                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                                            onClick={() => handleStatusUpdate(application._id, 'accepted')}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientPostedJob;
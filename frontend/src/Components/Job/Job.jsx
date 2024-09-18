import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, DollarSign, Clock, Users, Briefcase, Star } from 'lucide-react'


const Job = ({ job }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => setIsExpanded(!isExpanded)

    const experienceLevelIcon = {
        entry: 1,
        intermediate: 2,
        expert: 3
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={toggleExpand}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-darkBlue">{job.title}</h2>
                    {isExpanded ? <ChevronUp className="text-orange" /> : <ChevronDown className="text-orange" />}
                </div>
                <div className="mt-2 text-gray-600">
                    <span className="mr-4"><DollarSign className="inline w-4 h-4 mr-1" />{job.budget}</span>
                    <span className="mr-4"><Clock className="inline w-4 h-4 mr-1" />{job.duration}</span>
                    <span><Users className="inline w-4 h-4 mr-1" />{job.numberOfFreelancers} needed</span>
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
                        <div className="p-4 border-t border-gray-200">
                            <p className="text-gray-700 mb-4">{job.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-semibold text-darkBlue mb-2">Project Details</h3>
                                    <p><Briefcase className="inline w-4 h-4 mr-2 text-orange" />{job.projectType} project</p>
                                    <p>
                                        <span className="inline-block mr-2">
                                            {[...Array(experienceLevelIcon[job.experienceLevel])].map((_, i) => (
                                                <Star key={i} className="inline w-4 h-4 text-orange" />
                                            ))}
                                        </span>
                                        {job.experienceLevel} level
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-darkBlue mb-2">Category</h3>
                                    <p>{job.jobCategory}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold text-darkBlue mb-2">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span key={index} className="bg-lightBlue text-white px-2 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button className="bg-orange text-white px-4 py-2 rounded-md hover:bg-darkBlue transition-colors duration-200">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Job  
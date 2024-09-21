import React, { useState, useEffect } from 'react'
import { Job } from '../../Components'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { X, Send } from 'lucide-react'
import { getCurrentUser } from '../../utils'
import { applyForJob, getFreelancerApplications } from '../../apis'


function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedRate: '',
    estimatedCompletionTime: ''
  })
  const [appliedJobs, setAppliedJobs] = useState({});

  const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/jobs/all-jobs`

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get(apiUrl)
      if (response.status === 200) {
        const { jobs } = response.data.data
        return jobs
      } else {
        console.error('Failed to fetch jobs:', response.statusText)
        return []
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      return []
    }
  }
  useEffect(() => {
    const getJobsAndApplications = async () => {
      try {
        // Step 1: Fetch all jobs
        const fetchedJobs = await fetchAllJobs();
        setJobs(fetchedJobs);

        // Step 2: Fetch freelancer applications
        const freelancer = getCurrentUser(); // Assume you have a function to get current user
        const applications = await getFreelancerApplications(freelancer._id);

        // Step 3: Map applied jobs
        const appliedJobsMap = {};
        applications?.forEach((app) => {
          appliedJobsMap[app.job._id] = true; // Mark jobs as applied
        });

        // Update applied jobs state
        setAppliedJobs(appliedJobsMap);
      } catch (error) {
        console.error('Error fetching jobs or applications:', error);
      }
    };

    getJobsAndApplications();
  }, []);

  const handleApply = (job) => {
    const applied = appliedJobs[job._id] || false; // Get the applied state
    if (!applied) {
      setSelectedJob(job);
      setIsApplyPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsApplyPopupOpen(false)
    setApplicationData({
      coverLetter: '',
      proposedRate: '',
      estimatedCompletionTime: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationData(prev => ({ ...prev, [name]: value }))
  }

  const freelancer = getCurrentUser()
  const handleSubmitApplication = async (e) => {
    e.preventDefault()
    try {
      await applyForJob({
        jobId: selectedJob._id, // Use selectedJob's ID
        applicantId: freelancer?._id,
        coverLetter: applicationData.coverLetter,
        proposedRate: applicationData.proposedRate,
        estimatedCompletionTime: applicationData.estimatedCompletionTime,
      });


      // Update the appliedJobs state for the specific job
      setAppliedJobs(prev => ({ ...prev, [selectedJob._id]: true }));

      // Close popup and open success dialog
      setIsApplyPopupOpen(false);
      setIsSuccessDialogOpen(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1 className="text-3xl font-bold text-darkBlue mb-6">Available Jobs</h1>
      <div className="">
        {jobs.map(job => (
          <Job key={job._id} disabled={appliedJobs[job._id] || false} job={job} handleApply={() => handleApply(job)} />
        ))}
      </div>

      <AnimatePresence>
        {isApplyPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-orange">
                  <span
                    className='text-darkBlue'
                  >Apply for</span> {selectedJob?.title}</h2>
                <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                  <textarea
                    placeholder='Tell them about yourself and why they should hire you?'
                    id="coverLetter"
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="proposedRate" className="block text-sm font-medium text-gray-700 mb-1">Proposed Rate</label>
                  <input
                    placeholder='eg., 20000 PKR'
                    type="number"
                    id="proposedRate"
                    name="proposedRate"
                    value={applicationData.proposedRate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
                  />
                </div>
                <div>
                  <label htmlFor="estimatedCompletionTime" className="block text-sm font-medium text-gray-700 mb-1">Estimated Completion Time</label>
                  <input
                    type="text"
                    id="estimatedCompletionTime"
                    name="estimatedCompletionTime"
                    value={applicationData.estimatedCompletionTime}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 2 weeks"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-darkBlue transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} />
                  Submit Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuccessDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-lg p-6 w-full max-w-sm text-center"
            >
              <h3 className="text-xl font-bold text-darkBlue mb-4">Application Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">Good Luck With Your Job Buddy!</p>
              <button
                onClick={() => setIsSuccessDialogOpen(false)}
                className="bg-orange text-white px-4 py-2 rounded-md hover:bg-darkBlue transition-colors duration-200"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default JobsPage
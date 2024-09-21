import axios from 'axios';

// Fetch all applications for a job
export const getJobApplications = async (jobId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/application/job-applications/${jobId}`);
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};
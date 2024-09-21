import axios from 'axios';

/**
 * Applies for a job by submitting the application details.
 * 
 * @param {Object} applicationData - The application data to be submitted.
 * @param {String} applicationData.jobId - The ID of the job.
 * @param {String} applicationData.applicantId - The ID of the applicant (freelancer).
 * @param {String} applicationData.coverLetter - The cover letter for the application.
 * @param {Number} applicationData.proposedRate - The proposed rate for the job.
 * @param {String} applicationData.estimatedCompletionTime - The estimated time for job completion.
 * @returns {Object} The response containing the status and application details.
 */
export const applyForJob = async (applicationData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/application/apply`, {
            jobId: applicationData.jobId,
            applicantId: applicationData.applicantId,
            coverLetter: applicationData.coverLetter,
            proposedRate: applicationData.proposedRate,
            estimatedCompletionTime: applicationData.estimatedCompletionTime,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error applying for the job:', error);
        throw error.response?.data || { message: "Failed to apply for the job" };
    }
};

import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/application/all-applications`;

export const getFreelancerApplications = async (freelancerId) => {
    try {
        const response = await axios.post(apiUrl, { freelancerId });
        // console.log(response.data)
        return response.data.data;
        
    } catch (error) {
        console.error('Error fetching user applications:', error);
        throw error;
    }
};

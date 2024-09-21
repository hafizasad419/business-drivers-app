import axios from "axios";


export const getFreelancerProfile = async (id) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/freelancer/profile`, { id });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Error fetching freelancer profile:", error);
        throw error;
    }
};

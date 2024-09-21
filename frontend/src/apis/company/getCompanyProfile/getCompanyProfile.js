import axios from "axios";

export const getCompanyProfile = async (id) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/company/profile`, { id });

        if (response.status === 200) {
            return response.data;
        } else {

            throw new Error(`Error: ${response.statusText}`);
        }
    }
    catch (error) {
        request
        console.error("Error fetching company profile:", error);
        throw error;
    }
};

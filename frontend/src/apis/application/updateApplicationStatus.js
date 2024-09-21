import axios from "axios";

// Update application status (accept/reject)
export const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_API_URL}/application/status/${applicationId}`,
        { status }
      );
      return response.data.application;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentCompany } from './getCurrentCompany';

export const useLogout = () => {
    const company = getCurrentCompany()
    const id = company?._id
    // console.log(id);
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend to clear cookies
            await axios
                .post(`${import.meta.env.VITE_API_URL}/company/logout`, {id}, { withCredentials: true });
            navigate('/login');



            // Redirect to login page
            localStorage.removeItem('company');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return { handleLogout };
};

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser } from './getCurrentUser';
export const useLogout = () => {
    const freelancer = getCurrentUser()
    const id = freelancer?._id
    // console.log(id);
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend to clear cookies
            await axios
                .post(`${import.meta.env.VITE_API_URL}/freelancer/logout`, {id}, { withCredentials: true });
            navigate('/login');



            // Redirect to login page
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return { handleLogout };
};

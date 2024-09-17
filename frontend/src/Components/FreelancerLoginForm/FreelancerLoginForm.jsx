// FreelancerLoginForm.jsx
import React, { useEffect, useState } from 'react';
import InputField from '../../utils/InputField.jsx';
import { loginFields } from '../../utils/formFields.js';
import { MyButton } from '../index.js';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


  
function FreelancerLoginForm() {
 
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Check if both email and password fields are filled
        console.log('Form Data:', formData.email, formData.password); // Debug log
        if (!formData.email || !formData.password) {
            setErrorMessage('Please Enter Both, Email and Password.');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/freelancer/login`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true, // Ensure cookies are handled properly
                }
            );
            console.log(response);


            if (response.status === 200 && response.data.success) {
                console.log("Login successful!", response.data);
            
                // Save user data to localStorage and cookies
                localStorage.setItem('user', JSON.stringify(response.data));
                Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
            
           
            
                // Redirect to dashboard
                navigate("/freelancer-dashboard");
            }
            

        } catch (err) {
            console.log(err.message);
            console.error('Login failed:', err?.message || 'Something went wrong.');
            setErrorMessage(err?.message || 'Failed to log in. Please try again.');
        }
    };
  

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg">
                <h2 className="text-4xl font-bold mb-2 text-darkBlue text-center">Login</h2>
                <p className="text-center text-gray-600 mb-8">
                    Find top talent or get your work done seamlessly.
                </p>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={onSubmitHandler}>
                    {loginFields.map((field) => (
                        <InputField
                            key={field.id}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                            className="rounded-full mb-4 w-full p-3 border border-gray-300"
                            value={formData[field.name]} // Bind the value to formData
                            onChange={handleInputChange} // Bind the onChange handler
                        />
                    ))}
                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-darkBlue rounded-full" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>
                    <div className="login-btn-container flex justify-center">
                        <MyButton
                            type="submit"
                            textColor=""
                            className="w-full py-3 text-2xl rounded-full text-white hover:text-orange"
                        >
                            Login
                        </MyButton>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don’t have an account?{' '}
                        <NavLink to="/signup" className="text-darkBlue font-bold">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FreelancerLoginForm;

import React, { useState } from 'react';
import SkillDropdown from '../../utils/SkillDropdown';
import { MyButton } from '..';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function FreelancerSignupForm() {


    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        number: '',
        cnic: '',
        skill: '',
        proofOfRegistration: null,
        bankAccount: '',
        currentlyDoingJob: '',
        companyName: '',
        agree: false,
        avatar: null, // New field for Avatar
        bio: '', // New field for Bio
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData to handle file uploads
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('number', formData.number);
        formDataToSend.append('CNIC', formData.cnic);
        formDataToSend.append('skills', formData.skill);
        formDataToSend.append('bankAccount', formData.bankAccount);
        formDataToSend.append('currentlyEmployed', formData.currentlyDoingJob === 'yes');
        formDataToSend.append('companyName', formData.companyName);
        formDataToSend.append('proofOfRegistrationFee', formData.proofOfRegistration);
        formDataToSend.append('avatar', formData.avatar); // Append avatar file
        formDataToSend.append('bio', formData.bio); // Append bio

        try {
            const response = await axios.post(`
                ${import.meta.env.VITE_API_URL}/freelancer/register`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            navigate("/login")
        } catch (error) {
            console.error('Failed to register:', error);
            // Handle error response (e.g., show error message)
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen text-orange p-4"
        >
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold mb-8 text-center">Freelancer Signup</h2>
                <form onSubmit={handleSubmit}>
                    {/* Existing input fields */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cnic" className="block text-gray-700 text-sm font-bold mb-2">
                            CNIC Number
                        </label>
                        <input
                            type="text"
                            id="cnic"
                            name="cnic"
                            value={formData.cnic}
                            onChange={handleChange}
                            placeholder="CNIC Number"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>

                    <SkillDropdown
                        id="skill"
                        name="skill"
                        value={formData.skill}
                        onChange={handleChange}
                    />

                    <div className="mb-4">
                        <label htmlFor="proofOfRegistration" className="block text-gray-700 text-sm font-bold mb-2">
                            Proof of Registration Fee
                        </label>
                        <input
                            type="file"
                            id="proofOfRegistration"
                            name="proofOfRegistration"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>

                    {/* New Avatar Field */}
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
                            Avatar
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                        />
                    </div>

                    {/* New Bio Field */}
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell companies about yourself"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bankAccount" className="block text-gray-700 text-sm font-bold mb-2">
                            Bank Account Number
                        </label>
                        <input
                            type="text"
                            id="bankAccount"
                            name="bankAccount"
                            value={formData.bankAccount}
                            onChange={handleChange}
                            placeholder="Bank Account Number"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Currently Doing Job?</label>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id="currentlyDoingJobYes"
                                name="currentlyDoingJob"
                                value="yes"
                                checked={formData.currentlyDoingJob === 'yes'}
                                onChange={handleChange}
                                className="form-radio"
                                required
                            />
                            <label htmlFor="currentlyDoingJobYes" className="ml-2 text-sm text-gray-600">Yes</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id="currentlyDoingJobNo"
                                name="currentlyDoingJob"
                                value="no"
                                checked={formData.currentlyDoingJob === 'no'}
                                onChange={handleChange}
                                className="form-radio"
                                required
                            />
                            <label htmlFor="currentlyDoingJobNo" className="ml-2 text-sm text-gray-600">No</label>
                        </div>

                        {formData.currentlyDoingJob === 'yes' && (
                            <div className="mb-4">
                                <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="agree" className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="agree"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="form-checkbox"
                                required
                            />
                            <span className="ml-2 text-sm text-gray-600">I agree that all information is correct</span>
                        </label>
                    </div>

                    <div className="flex justify-center my-4 ">
                        <MyButton
                            className='hover:text-orange'
                            children='Signup'
                            type="submit" />
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <NavLink to="/login" className="text-orange">Login</NavLink>
                </p>
            </div>
        </motion.div>
    );
}

export default FreelancerSignupForm;

import React, { useState } from 'react';
import SkillDropdown from './SkillDropdown';
import { MyButton } from '../Components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function FreelancerSignupForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        number: '',
        cnic: '',
        skill: '',
        proofOfRegistration: null,
        bankAccount: '',
        currentlyDoingJob: '',
        companyName: '',
        agree: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen text-orange p-4">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold mb-8   text-center">Freelancer Signup</h2>
                <form onSubmit={handleSubmit}>
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
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
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
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
                            Number
                        </label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
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
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
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
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
                            required
                        />
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
                            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
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
                                className="form-radio  "
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
                                className="form-radio  "
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
                                    className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange "
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="agree"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="form-checkbox  "
                                required
                            />
                            <span className="ml-2 text-sm text-gray-600">I agree that all information is correct</span>
                        </label>
                    </div>

                    <div className="flex justify-center">
                        <MyButton
                            type="submit"
                            textColor=""
                            className="w-full py-3 text-lg rounded-full bg-orange text-white hover:text-orange"
                        >
                            Sign Up
                        </MyButton>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-darkBlue">
                        Already have an account?{' '}
                        <NavLink to="/login" className="  font-bold">
                            <span className='text-orange hover:underline'>Login</span>
                        </NavLink>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default FreelancerSignupForm;

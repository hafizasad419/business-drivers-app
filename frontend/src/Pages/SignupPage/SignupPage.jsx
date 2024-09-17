// SignupPage.jsx
import React from 'react';
import {CompanySignupForm, FreelancerSignupForm} from '../../Components';
import { motion } from 'framer-motion';
import { MyButton } from '../../Components';

function SignupPage() {
    const [userType, setUserType] = React.useState('');

    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl flex items-center justify-center px-4 py-24 ">
            {userType === '' ? (
                <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold mb-8 text-darkBlue text-center">Select Signup Type</h2>
                    <div className="flex flex-col items-center">
                        <MyButton
                            onClick={() => setUserType('freelancer')}
                            className="text-white hover:text-orange"
                        >
                            Sign up as Freelancer
                        </MyButton>
                        <MyButton
                            onClick={() => setUserType('company')}
                            className="mt-4 text-white hover:text-orange"
                        >
                            Sign up as Company
                        </MyButton>
                    </div>
                </div>
            ) : userType === 'freelancer' ? (
                <FreelancerSignupForm />
            ) : (
                <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                   <CompanySignupForm/>
                </div>
            )}
        </motion.div>
    );
}

export default SignupPage;

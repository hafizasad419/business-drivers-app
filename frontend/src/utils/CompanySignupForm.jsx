// CompanySignupForm.jsx
import React from 'react';
import { MyButton } from '../Components'; // Adjust the import path as needed
import InputField from './InputField'; // Adjust the import path as needed
import { motion } from 'framer-motion';

const companyFields = [
    {
        labelText: "Company Name",
        labelFor: "company-name",
        id: "company-name",
        name: "companyName",
        type: "text",
        autoComplete: "organization",
        isRequired: true,
        placeholder: "Company Name"
    },
    {
        labelText: "POC Name",
        labelFor: "poc-name",
        id: "poc-name",
        name: "pocName",
        type: "text",
        autoComplete: "name",
        isRequired: true,
        placeholder: "Proof of Concept"
    },
    {
        labelText: "POC National ID Number",
        labelFor: "poc-id",
        id: "poc-id",
        name: "pocId",
        type: "text",
        autoComplete: "id",
        isRequired: true,
        placeholder: "POC National ID Number"
    },
    {
        labelText: "Company NTN",
        labelFor: "company-ntn",
        id: "company-ntn",
        name: "companyNtn",
        type: "text",
        autoComplete: "ntn",
        isRequired: true,
        placeholder: "Company NTN"
    },
    {
        labelText: "Email Address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email Address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "new-password",
        isRequired: true,
        placeholder: "Password"
    }
];


function CompanySignupForm() {


const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('Form submitted');
};

    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        
        className="max-w-lg w-full bg-white p-8 rounded-lg">
            <h2 className="text-4xl font-bold mb-8 text-orange text-center">Company Signup</h2>
            <form onSubmit={onSubmitHandler}>
                {companyFields.map((field) => (
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
                        className="mb-4" // Ensure spacing between input fields
                    />
                ))}
                <div className="mb-6">
                    <label className="block text-sm font-medium">
                        Proof of Registration Fee
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="mt-1 block w-full rounded-lg  focus:ring-darkBlue focus:border-darkBlue sm:text-sm"
                        />
                    </label>
                </div>
                <div className="login-btn-container flex justify-center">
                    <MyButton
                        type="submit"
                        textColor=""
                        className="w-full py-3 text-lg rounded-full  text-white hover:text-orange"
                    >
                        Sign Up
                    </MyButton>
                </div>
            </form>
        </motion.div>
    );
}

export default CompanySignupForm;

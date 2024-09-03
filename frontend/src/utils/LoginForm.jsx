// LoginForm.jsx
import React from 'react';
import InputField from './InputField';
import { loginFields } from './formFields'; // Assuming the fields are exported from 'formFields.js'
import { MyButton } from '../Components';
import { NavLink } from 'react-router-dom';

function LoginForm() {

const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
};


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg">
                <h2 className="text-4xl font-bold mb-2 text-darkBlue text-center">Login</h2>
                <p className="text-center text-gray-600 mb-8">
                    Find top talent or get your work done seamlessly.
                </p>
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
                            className="rounded-full mb-4 w-full p-3 border border-gray-300" // Ensure spacing and styling
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
                            className="w-full py-3 text-2xl rounded-full text-white  hover:text-orange"
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

export default LoginForm;

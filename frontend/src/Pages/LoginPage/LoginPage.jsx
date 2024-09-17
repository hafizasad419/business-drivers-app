import React, { useState } from 'react'
import { FreelancerLoginForm, CompanyLoginForm } from '../../Components'
import { motion } from 'framer-motion'
import { MyButton } from '../../Components'

function LoginPage() {
  const [userType, setUserType] = useState('')

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-white px-4 py-24"
    >
      {userType === '' ? (
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-8 text-darkBlue text-center">Select Login Type</h2>
          <div className="flex flex-col items-center">
            <MyButton
              onClick={() => setUserType('freelancer')}
              className="text-white hover:text-orange"
            >
              Login as Freelancer
            </MyButton>
            <MyButton
              onClick={() => setUserType('company')}
              className="mt-4 text-white hover:text-orange"
            >
              Login as Company
            </MyButton>
          </div>
        </div>
      ) : userType === 'freelancer' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <FreelancerLoginForm />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <CompanyLoginForm />
        </motion.div>
      )}
    </motion.div>
  )
}

export default LoginPage
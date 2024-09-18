import React from 'react'
import { getCurrentUser } from '../../utils/getCurrentUser'
import { motion } from 'framer-motion'

function FreelancerDashboardDefault() {

    const freelancer = getCurrentUser()

    return (
        <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='md:text-6xl text-orange font-bold'>
            Hello, {freelancer?.fullName.split(" ")[0]}.
        </motion.div>
    )
}

export default FreelancerDashboardDefault
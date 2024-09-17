import React from 'react'
import { getCurrentUser } from '../../utils/getCurrentUser'

function FreelancerDashboardDefault() {

    const freelancer = getCurrentUser()

    return (
        <div className='md:text-6xl text-orange font-bold'>
            Hello, {freelancer?.fullName.split(" ")[0]}.
        </div>
    )
}

export default FreelancerDashboardDefault
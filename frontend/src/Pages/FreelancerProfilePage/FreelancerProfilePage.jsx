import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { FreelancerProfile } from '../../Components';


function FreelancerProfilePage() {

  let stateData = useSelector(state => state.auth)
  if (!stateData) {
    return <div>Loading...</div>; // Show loading or any appropriate fallback while the data is being fetched
  }
  const freelancer = getCurrentUser()

  return (
    <div className="container mx-auto py-8">
      <FreelancerProfile {...freelancer} />
    </div>
  );
}

export default FreelancerProfilePage;

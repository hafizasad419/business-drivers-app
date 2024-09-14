import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../../utils/Profile';
import { getCurrentUser } from '../../utils/getCurrentUser';


function ProfilePage() {

  let stateData = useSelector(state => state.auth)
  if (!stateData) {
    return <div>Loading...</div>; // Show loading or any appropriate fallback while the data is being fetched
  }
  const freelancer = getCurrentUser()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Freelancer Profile</h1>
      <Profile userType="Freelancer" user={freelancer} />
    </div>
  );
}

export default ProfilePage;

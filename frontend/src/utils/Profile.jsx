import React from 'react';

function Profile({ userType, user }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{userType} Profile</h1>
      <div className="space-y-2">
        <div>
          <strong>Name:</strong> {user.fullName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        {userType === 'Freelancer' && (
          <>
            <div>
              <strong>Skills:</strong> {user.skills?.join(', ')}
            </div>
          </>
        )}
        {userType === 'Company' && (
          <>
            <div>
              <strong>Company Name:</strong> {user.companyName}
            </div>
            <div>
              <strong>Number of Employees:</strong> {user.employees}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

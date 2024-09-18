import React, { useEffect } from 'react';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { FreelancerProfile } from '../../Components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function FreelancerProfilePage() {
  const navigate = useNavigate();
  const freelancer = getCurrentUser();

  useEffect(() => {
    if (!freelancer) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [freelancer, navigate]);

  if (!freelancer) {
    return <div>Loading...</div>; // Show loading or any fallback
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8">
      <FreelancerProfile {...freelancer} />
    </motion.div>
  );
}

export default FreelancerProfilePage;

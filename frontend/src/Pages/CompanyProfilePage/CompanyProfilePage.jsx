import React from 'react';
import { getCurrentCompany } from '../../utils/getCurrentCompany';
import { CompanyProfile } from '../../Components';
import { motion } from 'framer-motion';


function CompanyProfilePage() {

  const company = getCurrentCompany()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8">

      <CompanyProfile {...company} />

    </motion.div>
  );
}

export default CompanyProfilePage;

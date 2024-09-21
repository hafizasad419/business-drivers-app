import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ClientPostedJob, LoadingComponent } from '../../Components';
import { getCurrentCompany } from '../../utils';

const JobsPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const company = getCurrentCompany();
  const postedBy = company._id;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/jobs/jobs-posted/${postedBy}`)

        // console.log(response.data.data.jobs)
        const data = response.data.data.jobs
        setJobs(data)
      } catch (err) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <p>{error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >

      <h1 className="text-3xl font-bold text-darkBlue mb-6">Posted Jobs</h1>
      {jobs?.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs?.map((job) => (
          <ClientPostedJob
            key={job._id}
            job={job}
          />
        ))
      )}
    </motion.div>
  );
};

export default JobsPosted;

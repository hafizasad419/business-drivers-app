import React from 'react';
import { NavLink } from 'react-router-dom';
import MyButton from '../MyButton/MyButton';
import { motion } from 'framer-motion';
import { OurHistory, TrustedFamily,OurMission,Benefits } from '../';

// Placeholder image URL from Pexels
const placeholderImage = 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800';

function Home() {
  return (
    <main>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-center bg-white py-8 md:py-20">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-center flex-1 mb-8 md:mb-0 md:mr-8">
          <h1 className="text-darkBlue text-4xl md:text-7xl  leading-tight mb-4">
            Empower Your Business with Top Talent
          </h1>
          <p className="text-lightBlue text-lg md:text-xl mb-6">
            Connect with talented freelancers to boost your business productivity and achieve your goals.
          </p>
          <NavLink to="/signup">
            <MyButton
              className='hover:text-orange py-4 text-xl md:text-2xl'
              children='Get Started' />
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 justify-center items-center">
          <motion.img
            src={placeholderImage}
            alt="Professional Portfolio"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl rounded-lg shadow-lg"
          />
        </div>
      </motion.div>

      <TrustedFamily />
      <OurHistory />
      <OurMission />
      <Benefits/>
    </main>
  );
}

export default Home;

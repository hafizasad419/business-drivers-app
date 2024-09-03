import React from 'react';
import { NavLink } from 'react-router-dom';
import MyButton from '../../MyButton/MyButton';

function Benefits() {
  // Array of objects for each benefit section
  const benefitSections = [
    {
      heading: 'Looking For Talent?',
      paragraph: "Whether you're a startup or an established company, find the right talent to bring your projects to life. We connect you with skilled professionals ready to take on your challenges.",
    },
    {
      heading: 'Looking For Work?',
      paragraph: 'Join our platform to showcase your skills, apply for jobs, and connect with companies looking for your expertise. Take your career to the next level with exciting opportunities.',
    },
  ];

  return (
    <div className="bg-white py-10 md:py-24">
      <div className="container mx-auto px-4">
        {benefitSections.map((section, index) => (
          <div key={index} className={index === 0 ? 'mb-12' : 'mt-12'}>
            <h2 className="text-darkBlue text-3xl md:text-4xl font-bold text-center md:text-left">
              {section.heading}
            </h2>
            <p className="text-gray-600 text-center md:text-left mt-4">
              {section.paragraph}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-16">
      <NavLink to="/signup">
            <MyButton
              className='hover:text-orange px-12 py-4  text-2xl'
              children='Join Now' />
          </NavLink>
      </div>
    </div>
  );
}

export default Benefits;

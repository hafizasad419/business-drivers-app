import React from 'react';

const Blog = ({ title, date, bannerImage, content, contentImage }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <img src={bannerImage} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-darkBlue mb-2">
          {title} <span className="text-sm font-normal text-gray-500">(Updated {currentMonth} {currentYear})</span>
        </h2>
        <p className="text-gray-600 mb-4">{formattedDate}</p>
        <div className="prose max-w-none">
          <p className="mb-4">{content.substring(0, content.indexOf('.') + 1)}</p>
          <img src={contentImage} alt="Related content" className="w-full h-48 object-cover rounded-md mb-4" />
          <p>{content.substring(content.indexOf('.') + 1)}</p>
        </div>
      </div>
    </article>
  );
};

export default Blog;
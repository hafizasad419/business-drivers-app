import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [apiResponse, setApiResponse] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    // Call the test API using axios
    axios.get(`${apiUrl}/test`)
      .then(response => {
        setApiResponse(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching the API:', error);
        setApiResponse('Failed to fetch data.');
      });
  }, [apiUrl]);

  return (
    <div className="App">
      <nav>
        <ul className="flex justify-evenly">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/free-courses">Free Courses</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/contact-us">Contact Us</NavLink></li>
        </ul>
      </nav>
      <div>
        <h1>{apiResponse}</h1>
      </div>
    </div>
  );
}

export default Home;

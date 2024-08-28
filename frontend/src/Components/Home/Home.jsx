import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Home() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/test`)
      .then(response => setApiResponse(response.data.message))
      .catch(error => console.error('Error fetching the API:', error));
  }, []);

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

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Project Showcase</h1>
      <p>Explore innovative student projects across AI, Web Development, Machine Learning, and more!</p>

      <Link to="/projects" className="explore-btn">
        Explore Projects
      </Link>
    </div>
  );
};

export default Home;

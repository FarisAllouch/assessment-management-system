import React from 'react';
import './about.css'; 
import NavBar from '../NavBar/NavBar';

const About = () => {
  return (
    <div className='layout-container'>
      <NavBar className='navbar' /> {/* Dodajemo klasu za stilizaciju */}
      <div className="main-content">
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">About Our Grading Management System</h1>
            <p className="about-description">
              Our assessment management system is designed to simplify the grading process while ensuring accuracy and efficiency across educational institutions. With an intuitive interface and powerful features, the platform allows teachers to manage grades effortlessly and helps students stay informed about their academic progress.
            </p>
            <p className="about-description">
              Our assessment management system is built to modernize and simplify the grading process, delivering accuracy, transparency, and efficiency for educational institutions. Featuring a user-friendly interface, real-time updates, and a dynamic dashboard, the platform empowers educators to manage assessments with ease while providing students with clear insights into their academic performance. With powerful reporting tools and seamless navigation, our goal is to elevate the educational experience through smart, reliable technology.
            </p>
            <div className="administration-section">
              <p>For further information, please reach out to our Administration Team.</p>
              <ul>
                <li>Faris Allouch</li>
                <li>Harun Dzemic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

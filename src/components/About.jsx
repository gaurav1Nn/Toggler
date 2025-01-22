import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function About() {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="page-container">
      <h1>About LinkedInAuto</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>We aim to simplify your job search process using AI-powered automation.</p>
        </section>
        
        <section className="about-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Connect</h3>
              <p>Link your LinkedIn profile to our platform</p>
            </div>
            <div className="step">
              <h3>2. Configure</h3>
              <p>Set your job preferences and criteria</p>
            </div>
            <div className="step">
              <h3>3. Automate</h3>
              <p>Let our AI handle your job applications</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About; 
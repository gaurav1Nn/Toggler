import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

function Home() {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="hero-section">
      <h1>Automate Your Job Search on LinkedIn</h1>
      <p className="subtitle">Let AI handle your job applications while you focus on what matters</p>
      
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Enter your LinkedIn username"
          className="linkedin-input"
        />
        <button className="cta-button">Start Automation</button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Smart Job Matching</h3>
          <p>AI-powered job matching based on your resume and preferences</p>
        </div>
        <div className="feature-card">
          <h3>Automated Applications</h3>
          <p>Automatically apply to relevant positions daily</p>
        </div>
        <div className="feature-card">
          <h3>Progress Tracking</h3>
          <p>Monitor your application status and success rate</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 
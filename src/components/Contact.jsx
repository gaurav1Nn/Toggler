import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Contact() {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>123 Tech Street, Silicon Valley, CA</p>
          </div>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>support@linkedinautomation.com</p>
          </div>
          <div className="info-item">
            <h3>📱 Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact; 
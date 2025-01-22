import { useContext, useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'
import ThemeButton from './components/ThemeButton'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Waves from './components/Waves'
import ShootingStars from './components/ShootingStars'
import './index.css'
import './App.css'

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <h2>Linkedin Auto</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <ThemeButton />
      </div>
    </nav>
  );
}

// Home Component
function Home() {
  const [showContent, setShowContent] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight * 0.5) {
        setShowContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <div className="hero-image">
        <div className="hero-overlay">
          <div className="grid-overlay"></div>
          <div className="hero-decoration"></div>
          <div className="hero-content">
            <h1 className="hero-title">Linkedin Auto</h1>
            <p className="hero-subtitle">Revolutionize Your Career Journey</p>
            <div className="scroll-indicator">
              Explore More ↓
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="hero-section">
          <h2>Automate Your Job Search on Linkedin</h2>
          <p className="subtitle">Let AI handle your job applications while you focus on what matters</p>
          
          <div className="form-container">
            <input 
              type="text" 
              placeholder="Enter your Linkedin username"
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
      </div>
    </div>
  );
}

// Layout Component
function Layout() {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <ShootingStars
        starColor={darkMode ? "#64ffda" : "#0077b5"}
        trailColor={darkMode ? "#ff64ff" : "#00a0dc"}
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={3000}
        starWidth={3}
        starHeight={1}
      />
      <ShootingStars
        starColor={darkMode ? "#ff64ff" : "#00a0dc"}
        trailColor={darkMode ? "#64ffda" : "#0077b5"}
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={4000}
        starWidth={2}
        starHeight={1}
      />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <footer>
        <p>© 2024 Linkedin Auto. Made by Gaurav</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeButton() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    
    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}

export default ThemeButton; 
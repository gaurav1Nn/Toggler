import { useRef, useEffect } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}

export default CustomCursor; 
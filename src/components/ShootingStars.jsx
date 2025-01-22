import { useEffect, useState, useRef } from 'react';
// this is the fle which i have not used in my project
const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

function ShootingStars({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#64ffda",
  trailColor = "#0077b5",
  starWidth = 10,
  starHeight = 1,
}) {
  const [stars, setStars] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };

      setStars(prev => [...prev, newStar]);
      timeoutId = setTimeout(createStar, Math.random() * (maxDelay - minDelay) + minDelay);
    };

    createStar();
    return () => clearTimeout(timeoutId);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    let animationFrameId;
    const moveStar = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          const newX = star.x + star.speed * Math.cos(star.angle * Math.PI / 180);
          const newY = star.y + star.speed * Math.sin(star.angle * Math.PI / 180);
          const newDistance = star.distance + star.speed;
          const newScale = 1 + newDistance / 100;

          if (newX < -20 || newX > window.innerWidth + 20 || 
              newY < -20 || newY > window.innerHeight + 20) {
            return null;
          }

          return {
            ...star,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        }).filter(Boolean)
      );
      animationFrameId = requestAnimationFrame(moveStar);
    };

    moveStar();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      {stars.map(star => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#gradient-${star.id})`}
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
          style={{ opacity: 0.6 }}
        />
      ))}
      <defs>
        {stars.map(star => (
          <linearGradient key={star.id} id={`gradient-${star.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

export default ShootingStars; 
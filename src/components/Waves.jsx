import { useEffect, useRef } from 'react';
import { Noise } from '../utils/Noise';

// we tried this bu not implemented it  leter removed this
function Waves({
  lineColor = 'rgba(255, 255, 255, 0.3)',
  backgroundColor = 'transparent',
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100
}) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, lx: 0, ly: 0, sx: 0, sy: 0 });
  const noiseRef = useRef(new Noise(Math.random()));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const initPoints = () => {
      const { width, height } = canvas;
      pointsRef.current = [];
      
      for (let x = 0; x <= width + xGap; x += xGap) {
        const column = [];
        for (let y = 0; y <= height + yGap; y += yGap) {
          column.push({
            x,
            y,
            baseX: x,
            baseY: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000
          });
        }
        pointsRef.current.push(column);
      }
    };

    const updatePoints = () => {
      const noise = noiseRef.current;
      const mouse = mouseRef.current;
      
      pointsRef.current.forEach(column => {
        column.forEach(point => {
          // Perlin noise movement
          const noiseX = noise.perlin2(point.noiseOffsetX + time * waveSpeedX, 0) * waveAmpX;
          const noiseY = noise.perlin2(0, point.noiseOffsetY + time * waveSpeedY) * waveAmpY;

          // Mouse interaction
          const dx = mouse.x - point.baseX;
          const dy = mouse.y - point.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - distance / maxCursorMove);

          point.x = point.baseX + noiseX + dx * force * 0.5;
          point.y = point.baseY + noiseY + dy * force * 0.5;
        });
      });
    };

    const drawLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Draw vertical lines
      pointsRef.current.forEach(column => {
        ctx.beginPath();
        ctx.moveTo(column[0].x, column[0].y);
        column.forEach((point, i) => {
          if (i > 0) {
            const xc = (point.x + column[i - 1].x) / 2;
            const yc = (point.y + column[i - 1].y) / 2;
            ctx.quadraticCurveTo(column[i - 1].x, column[i - 1].y, xc, yc);
          }
        });
        ctx.stroke();
      });

      // Draw horizontal lines
      for (let i = 0; i < pointsRef.current[0].length; i++) {
        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0][i].x, pointsRef.current[0][i].y);
        pointsRef.current.forEach((column, j) => {
          if (j > 0) {
            const xc = (column[i].x + pointsRef.current[j - 1][i].x) / 2;
            const yc = (column[i].y + pointsRef.current[j - 1][i].y) / 2;
            ctx.quadraticCurveTo(pointsRef.current[j - 1][i].x, pointsRef.current[j - 1][i].y, xc, yc);
          }
        });
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 0.001;
      updatePoints();
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initPoints();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        background: backgroundColor,
        touchAction: 'none'
      }}
    />
  );
}

export default Waves; 
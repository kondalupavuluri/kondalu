// Stopwatch.tsx
// A reusable stopwatch component with start, pause, reset, and elapsedTime (seconds).
import React, { useState, useRef, useEffect } from 'react';

interface StopwatchProps {
  onTick?: (elapsed: number) => void; // Optional callback every second
}

const pad = (n: number, len = 2) => n.toString().padStart(len, '0');

const Stopwatch: React.FC<StopwatchProps> = ({ onTick }) => {
  const [elapsedMs, setElapsedMs] = useState(0); // ms
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsedMs(prev => {
          const next = prev + 10;
          if (onTick && next % 1000 === 0) onTick(Math.floor(next / 1000));
          return next;
        });
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, onTick]);

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setElapsedMs(0);
    if (onTick) onTick(0);
  };

  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  const hundredths = Math.floor((elapsedMs % 1000) / 10);

  return (
    <div>
      <div style={{ fontSize: 32, fontWeight: 700, margin: '24px 0', fontFamily: 'monospace' }}>
        {pad(minutes)}:{pad(seconds)}:{pad(hundredths)}
      </div>
      <div>
        <button onClick={handleStart} style={{ marginRight: 12 }} disabled={running}>Start</button>
        <button onClick={handlePause} style={{ marginRight: 12 }} disabled={!running}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch; 
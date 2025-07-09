// Workout.tsx
// The workout page: shows stopwatch, live calories, exercise GIF, and motivational popups.
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Stopwatch from '../components/Stopwatch';
import { getExerciseMET, calculateCalories } from '../utils/exerciseData';
import Popup from '../components/Popup';

interface LocationState {
  exercise: string;
  weight: number;
}

const exerciseGifs: Record<string, string> = {
  running: 'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif',
  cycling: 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
  walking: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
  pushups: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
  skipping: 'https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif',
};

const Workout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  // Move hooks above any early return
  const [calories, setCalories] = React.useState(0);
  const [popup, setPopup] = React.useState<string | null>(null);
  const popupTimers = React.useRef<NodeJS.Timeout[]>([]);

  // Motivational milestones in seconds
  const milestones: Record<number, string> = {
    60: 'Great Start! Keep going 💪',
    120: '🔥 You crossed 2 mins!',
    300: 'Halfway there. Stay strong!',
    600: '💯 Champion mode activated!',
  };

  const isValid = !!state && !!state.exercise && !!state.weight;
  const met = isValid ? getExerciseMET(state.exercise) : 1;
  const handleTick = (elapsed: number) => {
    if (isValid && state) setCalories(calculateCalories(met, state.weight, elapsed));
    if (milestones[elapsed]) {
      setPopup(milestones[elapsed]);
      // Hide popup after 3 seconds
      const t = setTimeout(() => setPopup(null), 3000);
      popupTimers.current.push(t);
    }
  };

  React.useEffect(() => {
    return () => {
      // Cleanup timers on unmount
      popupTimers.current.forEach(clearTimeout);
    };
  }, []);

  if (!isValid) {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h2>Missing workout data</h2>
        <p>Please start your workout from the Home page.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 24px', borderRadius: 6, background: '#4caf50', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', maxWidth: 800, margin: '40px auto', gap: 32, alignItems: 'flex-start' }}>
      {/* Left: Stopwatch and Calories */}
      <div style={{ flex: 1, minWidth: 260 }}>
        {/* Stopwatch component will go here */}
        <div style={{ marginBottom: 32, padding: 24, border: '1px solid #eee', borderRadius: 12, minHeight: 120 }}>
          <h3>Stopwatch</h3>
          <Stopwatch onTick={handleTick} />
        </div>
        {/* Calories burned */}
        <div style={{ padding: 18, border: '1px solid #eee', borderRadius: 12, minHeight: 60, background: '#f9fff9' }}>
          <div style={{ fontWeight: 600 }}>Calories Burned:</div>
          <div style={{ fontSize: 24, color: '#4caf50', fontWeight: 700 }}>{calories.toFixed(2)} kcal</div>
        </div>
      </div>
      {/* Right: GIF and Popups */}
      <div style={{ flex: 1, minWidth: 260, textAlign: 'center' }}>
        {/* Exercise GIF animation */}
        <div style={{ marginBottom: 24 }}>
          <img
            src={exerciseGifs[state.exercise]}
            alt={state.exercise}
            style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}
          />
        </div>
        {/* Motivational popups will go here */}
        <div style={{ minHeight: 40 }}>
          {popup && <Popup message={popup} visible={!!popup} />}
        </div>
      </div>
    </div>
  );
};

export default Workout; 
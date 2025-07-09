// Home.tsx
// The landing page for Fitness Burn Tracker. Lets user select exercise, enter weight, and start workout.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const exercises = [
  { label: 'Running', value: 'running' },
  { label: 'Cycling', value: 'cycling' },
  { label: 'Walking', value: 'walking' },
  { label: 'Pushups', value: 'pushups' },
  { label: 'Skipping', value: 'skipping' },
];

const Home: React.FC = () => {
  const [exercise, setExercise] = useState(exercises[0].value);
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      alert('Please enter a valid weight.');
      return;
    }
    navigate('/workout', { state: { exercise, weight: Number(weight) } });
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Fitness Burn Tracker</h2>
      <form onSubmit={handleStart}>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="exercise" style={{ display: 'block', marginBottom: 8 }}>Select Exercise:</label>
          <select
            id="exercise"
            value={exercise}
            onChange={e => setExercise(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          >
            {exercises.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label htmlFor="weight" style={{ display: 'block', marginBottom: 8 }}>Your Weight (kg):</label>
          <input
            id="weight"
            type="number"
            min="1"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: 12, background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
        >
          Start Workout
        </button>
      </form>
    </div>
  );
};

export default Home; 
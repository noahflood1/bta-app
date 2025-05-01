import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; 

export default function WorkoutSession({ onEndWorkout }) {
  const [seconds, setSeconds] = useState(0);
  const [makes, setMakes] = useState(0);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndWorkout = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
  
      const uid = user.uid;
      const now = new Date();
      const sessionId = uuidv4();
  
      const workoutRef = doc(db, 'users', uid, 'workouts', sessionId);
      const startTimestamp = now.toISOString();
      const endTimestamp = new Date(now.getTime() + seconds * 1000).toISOString();
  
      await setDoc(workoutRef, {
        date: startTimestamp,
        start_time: startTimestamp,
        end_time: endTimestamp,
        duration: seconds,
        focus: 'threes',
      });
  
      const segmentRef = doc(
        db,
        'users',
        uid,
        'workouts',
        sessionId,
        'segments',
        uuidv4()
      );
  
      await setDoc(segmentRef, {
        type: 'threes',
        makes: makes || 0,
        misses: misses || 0,
        start_time: startTimestamp,
        end_time: endTimestamp,
        hand: null,
        shot_record: null,
        user_note: null,
        location: null,
      });
  
      console.log('Workout saved');
      onEndWorkout(); // ✅ This now happens after successful write
    } catch (err) {
      console.error('🔥 Error saving workout:', err);
      alert('Failed to save workout. Check console.');
    }
  };
  

  return (
    <div className="min-h-screen p-6 bg-black text-white space-y-6">
      <div className="text-center">
        <div className="text-sm uppercase tracking-wide">Workout Time</div>
        <div className="text-4xl font-bold">{formatTime()}</div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm">3PT Makes</label>
          <input
            type="number"
            value={makes}
            onChange={(e) => setMakes(parseInt(e.target.value) || 0)}
            className="w-full bg-gray-800 text-white p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">3PT Misses</label>
          <input
            type="number"
            value={misses}
            onChange={(e) => setMisses(parseInt(e.target.value) || 0)}
            className="w-full bg-gray-800 text-white p-2 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleEndWorkout}
        className="w-full bg-red-600 mt-10 py-3 rounded-xl font-semibold"
      >
        End Workout
      </button>
    </div>
  );
}

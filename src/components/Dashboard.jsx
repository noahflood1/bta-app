import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import { fetchUserWorkouts } from '../hooks/useWorkoutData';
import { calculateGlobalStats } from '../hooks/useStatsCalculator';
import StatsDashboard from './StatsDashboard'; // or '../components/StatsDashboard' depending on location

export default function Dashboard({ user, onStartWorkout, onLogout }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      console.log(user)
      console.log("user value should be non-null ^")
      console.log()
      const segments = await fetchUserWorkouts();
      const globalStats = calculateGlobalStats(segments);
      setStats(globalStats);
    }

    loadStats();
  }, []);

  if (!user) {
    return <p className="text-white text-center mt-8">Loading user info...</p>;
  }

  return (
   <main className="flex flex-col min-h-screen px-4 py-6 text-white">
   <h1 className="text-2xl font-semibold mb-4 text-center">
      Welcome, {user.displayName || 'Athlete'}
   </h1>

   {stats ? (
      <StatsDashboard stats={stats} />
   ) : (
      <p className="text-center text-gray-400 mt-8">No stats yet.</p>
   )}

   <div className="mt-8 text-center">
      <button
         onClick={onStartWorkout}
         className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
      >
         Start Workout
      </button>
   </div>

   <div className="mt-auto pt-10 flex justify-center">
      <button
         className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition"
         onClick={() => {
         signOut(auth);
         onLogout();
         }}
      >
         Log Out
      </button>
   </div>
   </main>
  );
}

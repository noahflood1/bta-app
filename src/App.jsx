import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import WorkoutSession from './pages/WorkoutSession';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [view, setView] = useState('landing'); // 'landing' | 'dashboard' | 'workout'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
      setView(firebaseUser ? 'dashboard' : 'landing');
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div className="text-white p-4">Loading...</div>;

  return (
    <>
      {view === 'landing' && <LandingPage />}
      {view === 'dashboard' && (
        <Dashboard
          user={user}
          onStartWorkout={() => setView('workout')}
          onLogout={() => {
            setUser(null);
            setView('landing');
          }}
        />
      )}
      {view === 'workout' && (
        <WorkoutSession onEndWorkout={() => setView('dashboard')} />
      )}
    </>
  );
}

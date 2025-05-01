import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import WorkoutSession from './pages/WorkoutSession';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div className="text-white p-4">Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <LandingPage />}
      />
      <Route
        path="/workout"
        element={user ? <WorkoutSession /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LandingPage from './components/LandingPage';

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

  if (!user) return <LandingPage />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Welcome, {user.displayName}</h1>
      <img src={user.photoURL} alt="Profile" className="rounded-full w-16 h-16 mb-4" />
      <p className="text-gray-400">You're logged in! We'll build the dashboard next.</p>
    </main>
  );
}

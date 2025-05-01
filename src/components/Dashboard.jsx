import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Try to fetch shooting and training statistics from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setStats(userDoc.data());
        } else {
          setStats(null); // New user, no data yet
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p className="text-white text-center mt-8">Loading user info...</p>;
  }

  return (
    <main className="min-h-screen px-4 py-6 text-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Welcome, {user.displayName || 'Athlete'}
      </h1>

      {stats ? (
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold">Shooting Statistics</h2>
            <pre className="bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              {JSON.stringify(stats.shooting_stats || {}, null, 2)}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Training Statistics</h2>
            <pre className="bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              {JSON.stringify(stats.training_stats || {}, null, 2)}
            </pre>
          </section>
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-400">
          No stats available yet. You haven't completed a workout.
        </p>
      )}
      <button
         className="absolute top-4 right-4 gray hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
         onClick={() => signOut(auth)}
         >
         Log Out
      </button>
    </main>
  );
}
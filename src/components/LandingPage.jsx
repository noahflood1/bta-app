import { signInWithGoogle } from '../firebase';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Basketball TEST Training Assistant</h1>
      <p className="text-gray-400 max-w-sm">
        Sign in to track and review your training sessions.
      </p>
      <button
        onClick={signInWithGoogle}
        className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
    </main>
  );
}

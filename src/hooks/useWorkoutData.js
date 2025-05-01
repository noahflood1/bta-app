import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';

export async function fetchUserWorkouts() {
  const user = auth.currentUser;
  if (!user) {
    console.error('User is not authenticated.');
    return [];
  }

  const uid = user.uid;
  if (!uid) {
    console.error('User UID is undefined.');
    return [];
  }

  try {
    const workoutCol = collection(db, 'users', uid, 'workouts');
    const sessions = await getDocs(workoutCol);

    let allSegments = [];
    for (const session of sessions.docs) {
      const sessionId = session.id;
      const segmentCol = collection(db, 'users', uid, 'workouts', sessionId, 'segments');
      const segmentSnap = await getDocs(segmentCol);

      segmentSnap.forEach((doc) => {
        allSegments.push(doc.data());
      });
    }

    return allSegments;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}

import { doc, setDoc } from 'firebase/firestore';

export async function writeToDoc(refPath, data, db) {
  const ref = doc(db, ...refPath.split('/'));
  await setDoc(ref, data, { merge: true });
}

import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function createOrUpdateUserProfile(user) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || '',
      email: user.email,
      avatar: user.photoURL || '',
      createdAt: new Date(),
      progress: { embedded: { completed: [], total: 10, streak: 0 } }
    });
  }
}

export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}

export async function markChallengeComplete(uid, challengeId) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'progress.embedded.completed': arrayUnion(challengeId)
  });
} 
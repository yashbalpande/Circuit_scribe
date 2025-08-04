import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastLoginDate: string;
  arduino: {
    completedDays: string[];
    quizScores: Record<string, number>;
    totalQuizzesTaken: number;
    currentDay: string;
  };
  embedded: {
    completed: string[];
    total: number;
    streak: number;
  };
}

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
      progress: {
        xp: 0,
        level: 1,
        streak: 0,
        lastLoginDate: new Date().toISOString().split('T')[0],
        arduino: {
          completedDays: [],
          quizScores: {},
          totalQuizzesTaken: 0,
          currentDay: '1'
        },
        embedded: { 
          completed: [], 
          total: 10, 
          streak: 0 
        }
      } as UserProgress
    });
  } else {
    // Update last login date and check streak
    const userData = userSnap.data();
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = userData.progress?.lastLoginDate || today;
    
    let newStreak = userData.progress?.streak || 0;
    if (lastLogin !== today) {
      const lastLoginDate = new Date(lastLogin);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate.getTime() - lastLoginDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 0;
      }
    }
    
    await updateDoc(userRef, {
      'progress.lastLoginDate': today,
      'progress.streak': newStreak
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

export async function addXP(uid: string, xpAmount: number) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const userData = userSnap.data();
    const currentXP = userData.progress?.xp || 0;
    const currentLevel = userData.progress?.level || 1;
    const newXP = currentXP + xpAmount;
    
    // Calculate new level (every 100 XP = 1 level)
    const newLevel = Math.floor(newXP / 100) + 1;
    
    await updateDoc(userRef, {
      'progress.xp': newXP,
      'progress.level': newLevel
    });
    
    return { newXP, newLevel, leveledUp: newLevel > currentLevel };
  }
}

export async function markArduinoDayComplete(uid: string, day: string) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    [`progress.arduino.completedDays`]: arrayUnion(day)
  });
  
  // Add XP for completing a day
  await addXP(uid, 25);
}

export async function updateQuizScore(uid: string, quizId: string, score: number) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    [`progress.arduino.quizScores.${quizId}`]: score,
    'progress.arduino.totalQuizzesTaken': increment(1)
  });
  
  // Add XP based on score (0-100 points)
  const xpEarned = Math.floor(score / 10); // 10% of score as XP
  if (xpEarned > 0) {
    await addXP(uid, xpEarned);
  }
  
  return xpEarned;
}

export async function updateCurrentArduinoDay(uid: string, day: string) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'progress.arduino.currentDay': day
  });
} 
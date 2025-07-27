
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './FirebaseAuthProvider';
import { getUserProfile, UserProgress } from '../lib/userProfile';
import { Trophy, Star, Zap, BookOpen, Target, TrendingUp } from 'lucide-react';

interface ProgressTrackerProps {
  className?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserProgress();
    } else {
      setProgress(null);
      setLoading(false);  
    }
  }, [user]);

  const loadUserProgress = async () => {
    try {
      const userData = await getUserProfile(user?.uid);
      if (userData?.progress) {
        setProgress(userData.progress);
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400 text-center">No progress data available</p>
      </div>
    );
  }

  const xpToNextLevel = 100 - (progress.xp % 100);
  const progressPercentage = ((progress.xp % 100) / 100) * 100;

  return (
    <motion.div 
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Progress Tracker
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Star className="w-4 h-4 text-yellow-500" />
          Level {progress.level}
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Experience Points
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {progress.xp} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {xpToNextLevel} XP to next level
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Streak</span>
          </div>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {progress.streak} days
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Arduino Days</span>
          </div>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {progress.arduino.completedDays.length}/5
          </p>
        </div>
      </div>

      {/* Arduino Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-green-500" />
            Arduino Course
          </h4>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round((progress.arduino.completedDays.length / 5) * 100)}% Complete
          </span>
        </div>
        <div className="space-y-2">
          {['1', '2', '3', '4', '5'].map((day) => (
            <div key={day} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                progress.arduino.completedDays.includes(day)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {progress.arduino.completedDays.includes(day) ? '✓' : day}
              </div>
              <span className={`text-sm ${
                progress.arduino.completedDays.includes(day)
                  ? 'text-green-600 dark:text-green-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                Day {day}
              </span>
              {progress.arduino.currentDay === day && !progress.arduino.completedDays.includes(day) && (
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Stats */}
      {progress.arduino.totalQuizzesTaken > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quiz Performance
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {progress.arduino.totalQuizzesTaken} quizzes completed
          </p>
          {Object.keys(progress.arduino.quizScores).length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average score: {Math.round(
                Object.values(progress.arduino.quizScores).reduce((a, b) => a + b, 0) / 
                Object.values(progress.arduino.quizScores).length
              )}%
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProgressTracker;

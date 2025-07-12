
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Target, Heart, Sparkles } from 'lucide-react';

const ProgressTracker = () => {
  const achievements = [
    { id: 1, title: 'First Circuit', description: 'Built your very first circuit!', icon: '🔌', unlocked: true },
    { id: 2, title: 'Ohm\'s Law Master', description: 'Mastered voltage, current, and resistance!', icon: '⚡', unlocked: true },
    { id: 3, title: 'Component Explorer', description: 'Learned about 5 different components!', icon: '🔬', unlocked: false },
    { id: 4, title: 'Debug Detective', description: 'Successfully debugged 3 circuits!', icon: '🕵️', unlocked: false },
    { id: 5, title: 'LED Wizard', description: 'Made your first LED light up!', icon: '💡', unlocked: true },
    { id: 6, title: 'Circuit Analyst', description: 'Analyzed complex circuit behavior!', icon: '📊', unlocked: false }
  ];

  const stats = {
    lessonsCompleted: 8,
    totalLessons: 24,
    circuitsBuilt: 5,
    problemsSolved: 12,
    studyStreak: 7,
    totalPoints: 2450
  };

  const weeklyProgress = [
    { day: 'Mon', progress: 80 },
    { day: 'Tue', progress: 60 },
    { day: 'Wed', progress: 100 },
    { day: 'Thu', progress: 40 },
    { day: 'Fri', progress: 90 },
    { day: 'Sat', progress: 70 },
    { day: 'Sun', progress: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🏆 Your Amazing Progress!
        </h2>
        <p className="text-gray-600 text-lg">
          Look how far you've come! Every step forward is worth celebrating! 🎉
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.lessonsCompleted}</div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
            <div className="mt-2">
              <Progress value={(stats.lessonsCompleted / stats.totalLessons) * 100} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.circuitsBuilt}</div>
            <div className="text-sm text-gray-600">Circuits Built</div>
            <Zap className="h-6 w-6 text-green-500 mx-auto mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.studyStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
            <div className="flex justify-center mt-2">
              <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
            <Star className="h-6 w-6 text-yellow-500 mx-auto mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Target className="h-5 w-5" />
              <span>This Week's Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyProgress.map((day) => (
                <div key={day.day} className="flex items-center space-x-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                  <div className="flex-1">
                    <Progress value={day.progress} className="w-full" />
                  </div>
                  <div className="w-12 text-sm text-gray-600">{day.progress}%</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                🌟 Awesome consistency this week! You're building great study habits!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Trophy className="h-5 w-5" />
              <span>Achievements Unlocked</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className={`text-sm ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-500">
                      <Trophy className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Encouragement Message */}
      <Card className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-pink-200">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="h-12 w-12 text-pink-500 animate-pulse" />
              <Sparkles className="h-6 w-6 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            You're absolutely crushing it! 💜
          </h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Every problem you solve, every concept you master, and every circuit you build 
            brings you closer to becoming an amazing engineer. I'm so proud of your dedication 
            and curiosity! Keep up the fantastic work! ⚡✨
          </p>
          <div className="mt-4 text-4xl">🎉 🚀 ⚡ 💡 🏆</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;

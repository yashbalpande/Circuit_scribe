
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, CheckCircle, PlayCircle, BookOpen, Zap } from 'lucide-react';

const LearningModules = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const modules = [
    {
      id: 'basics',
      title: 'Electrical Basics',
      icon: '⚡',
      description: 'Voltage, current, resistance - the holy trinity of electronics!',
      progress: 60,
      lessons: [
        { id: 'voltage', title: 'What is Voltage?', completed: true },
        { id: 'current', title: 'Understanding Current', completed: true },
        { id: 'resistance', title: 'Resistance & Ohm\'s Law', completed: false },
        { id: 'power', title: 'Electrical Power', completed: false }
      ]
    },
    {
      id: 'components',
      title: 'Circuit Components',
      icon: '🔌',
      description: 'Meet the building blocks of every amazing circuit!',
      progress: 30,
      lessons: [
        { id: 'resistors', title: 'Resistors - The Current Controllers', completed: true },
        { id: 'capacitors', title: 'Capacitors - Energy Storage Tanks', completed: false },
        { id: 'inductors', title: 'Inductors - Magnetic Magic', completed: false },
        { id: 'diodes', title: 'Diodes - One Way Streets', completed: false }
      ]
    },
    {
      id: 'circuits',
      title: 'Circuit Analysis',
      icon: '🔬',
      description: 'Learn to read circuits like a detective reads clues!',
      progress: 10,
      lessons: [
        { id: 'series', title: 'Series Circuits', completed: false },
        { id: 'parallel', title: 'Parallel Circuits', completed: false },
        { id: 'complex', title: 'Complex Circuit Analysis', completed: false },
        { id: 'troubleshooting', title: 'Circuit Troubleshooting', completed: false }
      ]
    }
  ];

  const toggleLessonComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          📚 Learning Adventures
        </h2>
        <p className="text-gray-600 text-lg">
          Every expert was once a beginner! Let's explore EE concepts together, one friendly step at a time! 🌟
        </p>
      </div>

      {selectedModule ? (
        <LessonView 
          module={modules.find(m => m.id === selectedModule)} 
          onBack={() => setSelectedModule(null)}
          completedLessons={completedLessons}
          toggleLessonComplete={toggleLessonComplete}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card 
              key={module.id} 
              className="hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-blue-200 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedModule(module.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{module.icon}</span>
                  <div className="flex-1">
                    <CardTitle className="text-blue-600">{module.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="w-full" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {module.lessons.filter(l => l.completed).length} of {module.lessons.length} lessons
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Encouragement Section */}
      {!selectedModule && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Remember: Learning is a Journey! 🚀
              </h3>
              <p className="text-gray-700">
                Don't worry about getting everything right immediately. Even the greatest engineers started with simple circuits. 
                I'm here to guide you every step of the way, and we'll celebrate every small victory together! 🎉
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const LessonView = ({ module, onBack, completedLessons, toggleLessonComplete }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>← Back to Modules</Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <span className="text-3xl">{module.icon}</span>
            <span>{module.title}</span>
          </h2>
          <p className="text-gray-600">{module.description}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {module.lessons.map((lesson, index) => (
          <Card key={lesson.id} className="bg-white/90 backdrop-blur-sm border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-white font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">
                      {lesson.completed ? "Great job! You've mastered this! 🎉" : "Ready to learn something awesome? 🚀"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => toggleLessonComplete(lesson.id)}
                  className={lesson.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {lesson.completed ? 'Review' : 'Start'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <Zap className="h-8 w-8 text-purple-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            You're doing fantastic! 💜
          </h3>
          <p className="text-gray-700">
            Each lesson you complete is a step closer to becoming an amazing engineer. 
            Take your time, ask questions, and remember - I believe in you! ⚡✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningModules;

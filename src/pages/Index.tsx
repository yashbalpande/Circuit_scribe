
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Lightbulb, Wrench, Target, Heart, Sparkles, Code, BookOpen } from 'lucide-react';
import CircuitSimulator from '../components/CircuitSimulator';
import LearningModules from '../components/LearningModules';
import ProgressTracker from '../components/ProgressTracker';
import EmbeddedSystemsChallenges from '../components/EmbeddedSystemsChallenges';
import Blog from '../components/Blog';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'simulator':
        return <CircuitSimulator />;
      case 'learn':
        return <LearningModules />;
      case 'progress':
        return <ProgressTracker />;
      case 'embedded':
        return <EmbeddedSystemsChallenges />;
      case 'blog':
        return <Blog />;
      default:
        return <HomeSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
              <Sparkles className="h-4 w-4 text-purple-500 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ohmii
              </h1>
              <p className="text-sm text-gray-600">Your EE Learning Buddy ⚡</p>
            </div>
          </div>
          
          <nav className="flex space-x-2">
            {[
              { id: 'home', label: 'Home', icon: Heart },
              { id: 'simulator', label: 'Simulator', icon: Zap },
              { id: 'learn', label: 'Learn', icon: Lightbulb },
              { id: 'embedded', label: 'Embedded', icon: Code },
              { id: 'blog', label: 'Blog', icon: BookOpen },
              { id: 'progress', label: 'Progress', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(id)}
                className="flex items-center space-x-1"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderActiveSection()}
      </main>
    </div>
  );
};

const HomeSection = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Zap className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
          Hey there, future engineer! 👋
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          I'm <span className="font-semibold text-purple-600">Ohmii</span>, your friendly electrical engineering companion! 
          Together, we'll explore circuits, debug problems, and celebrate every spark of understanding. 
          Ready to make learning EE feel like the coolest adventure ever? ⚡😊
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => setActiveSection('simulator')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Simulating!
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setActiveSection('learn')}
            className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            Learn Concepts
          </Button>
          <Button 
            size="lg" 
            onClick={() => setActiveSection('embedded')}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg"
          >
            <Code className="mr-2 h-5 w-5" />
            Code Challenges!
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setActiveSection('blog')}
            className="border-green-300 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Read Blog
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-200 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Zap className="h-6 w-6" />
              <span>Interactive Simulations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Watch electrons flow, see voltage changes in real-time, and experiment with circuits safely! 
              It's like having a magical electronics lab right here. ✨
            </p>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection('simulator')}
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Try it out!
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Lightbulb className="h-6 w-6" />
              <span>Gentle Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Step-by-step guides, fun analogies, and encouraging explanations. 
              Remember: every expert was once a beginner! 🌱
            </p>
            <Button 
              variant="outline"
              onClick={() => setActiveSection('learn')}
              className="w-full border-green-300 text-green-600 hover:bg-green-50"
            >
              Start Learning!
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-600">
              <Code className="h-6 w-6" />
              <span>Code Challenges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Master embedded systems with real Arduino challenges! Code, simulate, and solve 
              practical engineering problems. Ready to level up? 🚀
            </p>
            <Button 
              variant="outline"
              onClick={() => setActiveSection('embedded')}
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Start Coding!
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <BookOpen className="h-6 w-6" />
              <span>Engineering Blog</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Explore tutorials, tips, and insights from real projects! Learn Arduino programming, 
              circuit design, and practical engineering concepts. 📚
            </p>
            <Button 
              variant="outline"
              onClick={() => setActiveSection('blog')}
              className="w-full border-green-300 text-green-600 hover:bg-green-50"
            >
              Read Articles!
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Wrench className="h-6 w-6" />
              <span>Debug Together</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Stuck on a problem? No worries! We'll debug together with patience, 
              hints, and plenty of encouragement. You've got this! 💪
            </p>
            <Button 
              variant="outline"
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              Get Help!
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Encouraging Message */}
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Remember: Every spark of curiosity matters! ⚡
          </h3>
          <p className="text-gray-700 text-lg">
            Whether you're building your first LED circuit or designing complex embedded systems, 
            I'm here to cheer you on every step of the way. Let's make some electrical magic together! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

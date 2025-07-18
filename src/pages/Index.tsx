import { useAuth } from '../components/FirebaseAuthProvider';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Lightbulb, Wrench, Target, Sparkles, Code, BookOpen } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import CircuitSimulator from '../components/CircuitSimulator';
import LearningModules from '../components/LearningModules';
import ProgressTracker from '../components/ProgressTracker';
import EmbeddedSystemsChallenges from '../components/EmbeddedSystemsChallenges';
import Blog from '../components/Blog';
import CircuitTroubleshooting from './CircuitTroubleshooting';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { user, login, logout, loading, signup, resetPassword, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [message, setMessage] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await signup(email, password);
      setMessage('Account created! You are now logged in.');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await resetPassword(email);
      setMessage('Password reset email sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setMessage(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  const handleHeaderLoginClick = () => {
    setAuthOpen(true);
    setMode('login');
    setError(null);
    setMessage(null);
  };

  const HomeSection = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => (
    <div className="text-center py-6 sm:py-12">
      <div className="relative inline-block mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <Zap className="h-12 w-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
          <Zap className="h-4 w-4 text-white" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Welcome to CircuitCode! ⚡
      </h1>
      
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        I'm <span className="font-semibold text-purple-600 dark:text-purple-400">CircuitCode</span>, your friendly electrical engineering companion! 
        Together, we'll explore circuits, debug problems, and celebrate every spark of understanding. 
        Ready to make learning EE feel like the coolest adventure ever? ⚡😊
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8">
        <Button 
          size="lg"
          variant="outline"
          onClick={() => setActiveSection('learn')}
          className="w-full sm:w-auto border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-6 py-2 text-base sm:text-lg"
          disabled
        >
          <Lightbulb className="mr-2 h-5 w-5" />
          Start Learning!
        </Button>
        <Button 
          size="lg"
          onClick={() => setActiveSection('embedded')}
          className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2 text-base sm:text-lg"
          disabled
        >
          <Code className="mr-2 h-5 w-5" />
          Code Challenges!
        </Button>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'simulator':
        return <CircuitSimulator />;
      case 'learn':
        // return <LearningModules />;
      case 'progress':
        // return <ProgressTracker />;
      case 'embedded':
        return <EmbeddedSystemsChallenges />;
      case 'blog':
        return <Blog />;
      case 'troubleshooting':
        return <CircuitTroubleshooting />;
      default:
        return <HomeSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CircuitCode
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Your EE Learning Buddy ⚡</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-2">
              {[
                { id: 'home', label: 'Home', icon: Zap },
                // { id: 'simulator', label: 'Simulator', icon: Zap },
                // { id: 'learn', label: 'Learn', icon: Lightbulb },
                { id: 'embedded', label: 'Embedded', icon: Code },
                { id: 'blog', label: 'Blog', icon: BookOpen },
                { id: 'troubleshooting', label: 'Simulations ', icon: Wrench },
                // { id: 'progress', label: 'Progress', icon: Target }
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activeSection === id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(id)}
                  className="flex items-center space-x-1 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Button>
              ))}
            </nav>
            <ThemeToggle />
            {/* Auth controls in header, right-aligned */}
            {loading ? (
              <div className="ml-4">Loading...</div>
            ) : user ? (
              <div className="flex items-center ml-4 gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-200">{user.email}</span>
                <Button onClick={logout} size="sm" variant="outline">Logout</Button>
              </div>
            ) : (
              <Button type="button" onClick={handleHeaderLoginClick} className="ml-4 flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow-sm">
                <FcGoogle className="text-xl" /> Login
              </Button>
            )}
          </div>
        </div>
      </header>
      {/* Auth Modal */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="max-w-sm w-full p-6">
          <DialogHeader>
            <DialogTitle className="text-center">{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}</DialogTitle>
            <DialogClose asChild>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>
            </DialogClose>
          </DialogHeader>
          <Button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded shadow-sm mb-4">
            <FcGoogle className="text-xl" /> Sign in with Google
          </Button>
          <div className="relative flex items-center my-2">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="mx-2 text-gray-400 text-xs">or</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {message && <div className="text-green-600 text-sm">{message}</div>}
              <Button type="submit" className="w-full">Login</Button>
              <div className="flex justify-between text-sm mt-2">
                <button type="button" className="text-blue-600 hover:underline" onClick={() => { setMode('signup'); setError(null); setMessage(null); }}>Sign up</button>
                <button type="button" className="text-blue-600 hover:underline" onClick={() => { setMode('reset'); setError(null); setMessage(null); }}>Forgot password?</button>
              </div>
            </form>
          )}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {message && <div className="text-green-600 text-sm">{message}</div>}
              <Button type="submit" className="w-full">Sign Up</Button>
              <div className="flex justify-between text-sm mt-2">
                <button type="button" className="text-blue-600 hover:underline" onClick={() => { setMode('login'); setError(null); setMessage(null); }}>Back to Login</button>
              </div>
            </form>
          )}
          {mode === 'reset' && (
            <form onSubmit={handleReset} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {message && <div className="text-green-600 text-sm">{message}</div>}
              <Button type="submit" className="w-full">Send Reset Email</Button>
              <div className="flex justify-between text-sm mt-2">
                <button type="button" className="text-blue-600 hover:underline" onClick={() => { setMode('login'); setError(null); setMessage(null); }}>Back to Login</button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderActiveSection()}
      </main>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          {/* What You'll Learn ⚡ */}
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Zap className="h-6 w-6" />
                <span>Interactive Simulations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Watch electrons flow, see voltage changes in real-time, and experiment with circuits safely! 
                It's like having a magical electronics lab right here. ✨
              </p>
              {/* <Button 
                variant="outline" 
                onClick={() => setActiveSection('simulator')}
                className="w-full border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Try it out!
              </Button> */}
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Lightbulb className="h-6 w-6" />
                <span>Gentle Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Step-by-step guides, fun analogies, and encouraging explanations. 
                Remember: every expert was once a beginner! 🌱
              </p>
                {/* <Button 
                  variant="outline"
                  onClick={() => setActiveSection('learn')}
                  className="w-full border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  Start Learning!
                </Button> */}
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-700 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                <Code className="h-6 w-6" />
                <span>Code Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master embedded systems with real Arduino challenges! Code, simulate, and solve 
                practical engineering problems. Ready to level up? 🚀
              </p>
              {/* <Button 
                variant="outline"
                onClick={() => setActiveSection('embedded')}
                className="w-full border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                Start Coding!
              </Button> */}
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-700 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <Wrench className="h-6 w-6" />
                <span>Debug Together</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Stuck on a problem? No worries! We'll debug together with patience, 
                hints, and plenty of encouragement. You've got this! ⚡
              </p>
              <Button 
                variant="outline"
                className="w-full border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                Get Help!
              </Button>
            </CardContent>
          </Card>

          <Card className="border-pink-200 dark:border-pink-700 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-pink-600 dark:text-pink-400">
                <Wrench className="h-6 w-6" />
                <span>Simulations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Diagnose common circuit issues, learn why things go wrong, and see how to fix them. Interactive explanations and (soon) real simulations!
              </p>
              <Button 
                variant="outline"
                onClick={() => setActiveSection('troubleshooting')}
                className="w-full border-pink-300 dark:border-pink-600 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
              >
                Try Simulations
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Encouraging Message */}
        <div className="text-center py-8">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-8 border border-orange-200 dark:border-orange-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Remember: Every spark of curiosity matters! ⚡
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Whether you're building your first LED circuit or designing complex embedded systems, 
              I'm here to cheer you on every step of the way. Let's make some electrical magic together! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

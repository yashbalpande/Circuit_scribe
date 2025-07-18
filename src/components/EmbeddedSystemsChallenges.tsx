import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Zap, 
  Volume2, 
  Gauge, 
  RotateCcw, 
  Sliders, 
  Battery, 
  Play, 
  Square, 
  CheckCircle, 
  AlertCircle,
  Code,
  Lightbulb,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { verifyArduinoCode, getAllChallenges, type Challenge, type VerificationResult } from '../lib/arduinoVerifier';
import { useAuth } from './FirebaseAuthProvider';
import { markChallengeComplete, getUserProfile } from '../lib/userProfile';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Toast = ({ message, show }) => (
  <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> 
    <div className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
      <span role="img" aria-label="spark">⚡</span> {message}
    </div>
  </div>
);

const ProgressBar = ({ percent }) => (
  <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden mt-2 mb-4 shadow-inner">
    <div className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full transition-all animate-pulse" style={{ width: `${percent}%` }}></div>
  </div>
);

const DoodleDivider = () => (
  <svg viewBox="0 0 1440 100" className="w-full h-10 my-6" fill="none">
    <path d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" fill="#ede9fe" />
  </svg>
);

const encouragements = [
  "Great job! Keep the electrons flowing!",
  "You're sparking real progress!",
  "Every challenge solved is a win!",
  "You're building a bright future!",
  "Keep going, circuit master!",
  "Your curiosity is electric!"
];

const Confetti = ({ show }) => show ? (
  <div className="pointer-events-none fixed inset-0 z-50 animate-fade-in">
    {/* Simple SVG confetti burst */}
    <svg width="100vw" height="100vh" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <g>
        <circle cx="50" cy="50" r="8" fill="#fbbf24" />
        <circle cx="120" cy="80" r="6" fill="#a5b4fc" />
        <circle cx="200" cy="40" r="7" fill="#fca5a5" />
        <circle cx="300" cy="100" r="5" fill="#6ee7b7" />
        <circle cx="400" cy="60" r="6" fill="#f472b6" />
      </g>
    </svg>
  </div>
) : null;

const ProfileCard = ({ user, streak, xp, level, badges }) => (
  <div className="sticky top-8 bg-white/90 rounded-2xl shadow-lg p-4 flex flex-col items-center mb-8 animate-fade-in-up">
    <div className="mb-2">
      {user?.photoURL ? (
        <img src={user.photoURL} alt="avatar" className="w-16 h-16 rounded-full border-4 border-yellow-300" />
      ) : (
        <span className="inline-block text-4xl bg-yellow-200 rounded-full p-3 shadow">⚡</span>
      )}
    </div>
    <div className="font-bold text-lg text-purple-700">{user?.displayName || user?.email}</div>
    <div className="text-yellow-600 font-semibold text-sm">Streak: {streak} days</div>
    <div className="text-pink-600 font-semibold text-sm">XP: {xp} | Level: {level}</div>
    <div className="flex flex-wrap gap-2 mt-2">
      {badges.map((badge, i) => (
        <span key={i} className="bg-gradient-to-r from-yellow-200 to-pink-200 text-xs font-bold px-3 py-1 rounded-full shadow animate-pop">{badge}</span>
      ))}
    </div>
  </div>
);

const Leaderboard = ({ leaderboard }) => (
  <div className="bg-white/90 rounded-2xl shadow-lg p-4 mb-8 animate-fade-in-up">
    <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
      <Zap className="h-5 w-5 text-yellow-400" /> Leaderboard
    </h2>
    <div className="space-y-2">
      {leaderboard.map((user, i) => (
        <div key={user.uid} className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition">
          <span className="font-bold text-lg w-6 text-right">{i + 1}</span>
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full border-2 border-yellow-300" />
          ) : (
            <span className="inline-block text-2xl bg-yellow-100 rounded-full p-1">⚡</span>
          )}
          <span className="font-semibold text-purple-700 flex-1">{user.name || user.email}</span>
          <span className="text-blue-600 font-bold">{user.progress?.embedded?.completed?.length || 0} solved</span>
          <span className="text-pink-600 font-bold">XP: {user.xp || 0}</span>
        </div>
      ))}
    </div>
  </div>
);

const getLevel = (xp) => Math.floor(xp / 100) + 1;

const EmbeddedSystemsChallenges = () => {
  console.log('EmbeddedSystemsChallenges component rendering...');
  
  const { user } = useAuth();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [previousUserCode, setPreviousUserCode] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [encouragement, setEncouragement] = useState('');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Get challenges from the verifier
  const challenges = getAllChallenges();
  const totalChallenges = challenges.length;

  // Fetch user progress on mount or when user changes
  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        if (profile && profile.progress && profile.progress.embedded) {
          if (Array.isArray(profile.progress.embedded.completed)) {
            setCompletedChallenges(profile.progress.embedded.completed);
            // XP: 50 per challenge
            const xpVal = profile.progress.embedded.completed.length * 50;
            setXp(xpVal);
            setLevel(getLevel(xpVal));
            // Badges
            const newBadges = [];
            if (profile.progress.embedded.completed.length > 0) newBadges.push('First Solve');
            if (profile.progress.embedded.completed.length >= 5) newBadges.push('5+ Solved');
            if (profile.progress.embedded.streak >= 3) newBadges.push('3-Day Streak');
            if (profile.progress.embedded.completed.length === totalChallenges) newBadges.push('All Challenges!');
            setBadges(newBadges);
          }
          if (typeof profile.progress.embedded.streak === 'number') {
            setStreak(profile.progress.embedded.streak);
          }
        }
      }
    };
    fetchProgress();
  }, [user]);

  // Fetch leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(collection(db, 'users'), orderBy('progress.embedded.completed', 'desc'), limit(10));
      const snap = await getDocs(q);
      const users = [];
      snap.forEach(doc => {
        const d = doc.data();
        users.push({
          uid: d.uid,
          name: d.name,
          email: d.email,
          avatar: d.avatar,
          xp: (d.progress?.embedded?.completed?.length || 0) * 50,
          progress: d.progress
        });
      });
      users.sort((a, b) => (b.progress?.embedded?.completed?.length || 0) - (a.progress?.embedded?.completed?.length || 0));
      setLeaderboard(users);
    };
    fetchLeaderboard();
  }, [showConfetti]);

  const handleChallengeSelect = (challengeId: string) => {
    console.log('Selecting challenge:', challengeId);
    setSelectedChallenge(challengeId);
    setUserCode('');
    setVerificationResult(null);
    setShowSolution(false);
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setUserCode(`// ${challenge.title}
// ${challenge.description}

void setup() {
  // Your setup code here
}

void loop() {
  // Your code here
}`);
    }
  };

  const handleVerifyCode = async () => {
    if (!selectedChallenge || !userCode.trim()) return;

    setIsRunning(true);
    
    // Simulate verification delay
    setTimeout(async () => {
      const result = verifyArduinoCode(userCode, selectedChallenge);
      setVerificationResult(result);
      
      if (result.passed && !completedChallenges.includes(selectedChallenge)) {
        setCompletedChallenges(prev => [...prev, selectedChallenge]);
        setToastMessage('Challenge completed!');
        setShowToast(true);
        setShowConfetti(true);
        setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)]);
        setTimeout(() => setShowToast(false), 2500);
        setTimeout(() => setShowConfetti(false), 1200);
        if (user) {
          await markChallengeComplete(user.uid, selectedChallenge);
        }
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const handleShowSolution = () => {
    setShowSolution((prev) => {
      const next = !prev;
      if (next && selectedChallenge) {
        setPreviousUserCode(userCode); // Save current code before showing solution
        const challenge = challenges.find(c => c.id === selectedChallenge);
        if (challenge) {
          setUserCode(challenge.solution);
        }
      } else if (!next) {
        setUserCode(previousUserCode); // Restore previous code when hiding solution
      }
      return next;
    });
  };

  const handleResetCode = () => {
    if (!selectedChallenge) return;
    
    const challenge = challenges.find(c => c.id === selectedChallenge);
    if (challenge) {
      setUserCode(`// ${challenge.title}
// ${challenge.description}

void setup() {
  // Your setup code here
}

void loop() {
  // Your code here
}`);
      setVerificationResult(null);
      setShowSolution(false);
    }
  };

  // Filter and search logic
  const filteredChallenges = challenges.filter(c =>
    (filter === 'all' || c.difficulty === filter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()))
  );

  const renderChallengeList = () => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          return (
            <Card
              key={challenge.id}
              className={`flex flex-col justify-between h-full min-h-[320px] cursor-pointer transition-all hover:shadow-lg ${selectedChallenge === challenge.id ? 'ring-2 ring-blue-500' : ''} ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
              onClick={() => handleChallengeSelect(challenge.id)}
              tabIndex={0}
              aria-label={`Open challenge: ${challenge.title}`}
            >
              <CardHeader className="flex-1 flex flex-col justify-start">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">⚡</div>
                    <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <CardTitle className="text-lg mt-2 mb-1">{challenge.title}</CardTitle>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant={challenge.difficulty === 'beginner' ? 'default' : challenge.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </Badge>
                  {isCompleted && (
                    <Badge variant="outline" className="text-green-600 dark:text-green-400">Completed</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {challenge.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{req}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderChallengeWorkspace = () => {
    if (!selectedChallenge) return null;
    const challenge = challenges.find(c => c.id === selectedChallenge);
    if (!challenge) return <div>Challenge not found</div>;
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedChallenge(null)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Challenges</span>
            </Button>
            <h2 className="text-2xl font-bold">{challenge.title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleResetCode}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShowSolution}
              className="flex items-center space-x-2"
            >
              {showSolution ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
            </Button>
          </div>
        </div>
        {/* Challenge Description, Requirements, Hints, Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-purple-700">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h4 className="font-semibold text-blue-700 mb-1 flex items-center gap-1">
                <Zap className="h-4 w-4" /> Description:
              </h4>
              <p className="text-gray-700">{challenge.description}</p>
            </section>
            <section>
              <h4 className="font-semibold text-green-700 mb-1 flex items-center gap-1">
                <Gauge className="h-4 w-4" /> Requirements:
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {challenge.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-pink-700 mb-1 flex items-center gap-1">
                <Lightbulb className="h-4 w-4" /> Hints:
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {challenge.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </section>
            {challenge.code && (
              <section>
                <h4 className="font-semibold text-indigo-700 mb-1 flex items-center gap-1">
                  <Code className="h-4 w-4" /> Example Code:
                </h4>
                <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
                  <code>{challenge.code}</code>
                </pre>
              </section>
            )}
          </CardContent>
        </Card>
        {/* Code Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Arduino Code</span>
              </span>
              <Button 
                onClick={handleVerifyCode}
                disabled={isRunning || !userCode.trim()}
                className="flex items-center space-x-2"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Verify Code</span>
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Write your Arduino code here..."
              className="font-mono text-sm min-h-[300px]"
            />
          </CardContent>
        </Card>

        {/* Verification Results */}
        {verificationResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {verificationResult.passed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                <span>Verification Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score */}
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Score:</span>
                <Progress value={verificationResult.score} className="flex-1" />
                <span className="text-sm font-mono">{verificationResult.score}%</span>
              </div>

              {/* Status */}
              <Alert variant={verificationResult.passed ? "default" : "destructive"}>
                <AlertDescription>
                  {verificationResult.passed 
                    ? "🎉 Great job! Your code meets the requirements!" 
                    : "💡 Keep working on it! Check the feedback below."
                  }
                </AlertDescription>
              </Alert>

              {/* Feedback */}
              <div>
                <h4 className="font-semibold mb-2">Feedback:</h4>
                <ul className="space-y-1">
                  {verificationResult.feedback.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              {verificationResult.suggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Suggestions:</h4>
                  <ul className="space-y-1">
                    {verificationResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-600 dark:text-blue-400">
                        💡 {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-2 sm:px-0">
      <Toast message={toastMessage} show={showToast} />
      <Confetti show={showConfetti} />
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Playful header with mascot and gradient */}
          <div className="flex items-center gap-3 mb-4 relative">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
              Embedded Systems Challenges ⚡
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex flex-col items-start">
              <ProgressBar percent={Math.round((completedChallenges.length / totalChallenges) * 100)} />
              <span className="text-yellow-600 font-bold text-sm mt-1">Streak: {streak} days</span>
              <span className="text-blue-600 font-semibold text-xs mt-1">{completedChallenges.length} of {totalChallenges} completed</span>
              <span className="text-pink-600 font-semibold text-xs mt-1">XP: {xp} | Level: {level}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {badges.map((badge, i) => (
                  <span key={i} className="bg-gradient-to-r from-yellow-200 to-pink-200 text-xs font-bold px-3 py-1 rounded-full shadow animate-pop">{badge}</span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <DoodleDivider />
            </div>
          </div>
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Volume2 className="h-4 w-4" />
                <span>Filter by Difficulty:</span>
              </Badge>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
          {/* Encouragement Message */}
          {encouragement && (
            <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-md relative mb-4" role="alert">
              <strong className="font-bold">Encouragement:</strong>
              <span className="block sm:inline"> {encouragement}</span>
            </div>
          )}
          {selectedChallenge ? renderChallengeWorkspace() : renderChallengeList()}
        </div>
        <div className="w-full md:w-72 flex-shrink-0">
          <ProfileCard user={user} streak={streak} xp={xp} level={level} badges={badges} />
          <Leaderboard leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
};

export default EmbeddedSystemsChallenges;
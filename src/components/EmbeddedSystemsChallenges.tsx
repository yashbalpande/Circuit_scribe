import React, { useState } from 'react';
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

const EmbeddedSystemsChallenges = () => {
  console.log('EmbeddedSystemsChallenges component rendering...');
  
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  // Get challenges from the verifier
  const challenges = getAllChallenges();

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

  const handleVerifyCode = () => {
    if (!selectedChallenge || !userCode.trim()) return;

    setIsRunning(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const result = verifyArduinoCode(userCode, selectedChallenge);
      setVerificationResult(result);
      
      if (result.passed && !completedChallenges.includes(selectedChallenge)) {
        setCompletedChallenges(prev => [...prev, selectedChallenge]);
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const handleShowSolution = () => {
    if (!selectedChallenge) return;
    
    const challenge = challenges.find(c => c.id === selectedChallenge);
    if (challenge) {
      setUserCode(challenge.solution);
      setShowSolution(true);
    }
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

  const renderChallengeList = () => {
    console.log('Rendering challenge list...');
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          
          return (
            <Card 
              key={challenge.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedChallenge === challenge.id ? 'ring-2 ring-blue-500' : ''
              } ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
              onClick={() => handleChallengeSelect(challenge.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">⚡</div>
                    <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant={challenge.difficulty === 'beginner' ? 'default' : 
                                 challenge.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </Badge>
                  {isCompleted && (
                    <Badge variant="outline" className="text-green-600 dark:text-green-400">
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {challenge.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {challenge.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
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
    console.log('Rendering challenge workspace for:', selectedChallenge);
    if (!selectedChallenge) return null;

    const challenge = challenges.find(c => c.id === selectedChallenge);

    if (!challenge) {
      console.log('Challenge not found:', selectedChallenge);
      return <div>Challenge not found</div>;
    }

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
              <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
            </Button>
          </div>
        </div>

        {/* Challenge Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Challenge</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Description:</h4>
              <p className="text-gray-700 dark:text-gray-300">{challenge.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {challenge.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hints:</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {challenge.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Embedded Systems Challenges ⚡
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master Arduino programming with hands-on challenges! Write code, verify your solutions, 
          and learn embedded systems concepts through practical exercises.
        </p>
      </div>

      {selectedChallenge ? renderChallengeWorkspace() : renderChallengeList()}
    </div>
  );
};

export default EmbeddedSystemsChallenges;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  ArrowLeft
} from 'lucide-react';

const EmbeddedSystemsChallenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const challenges = [
    {
      id: 'rc-timer',
      title: 'RC Discharge Timer',
      icon: Zap,
      emoji: '🧠',
      difficulty: 'Beginner',
      concepts: ['Analog Input', 'RC Time Constant', 'LED Control'],
      description: 'Simulate an LED blinking pattern based on the voltage drop across a discharging capacitor in an RC circuit.',
      problem: 'Create a program that reads an analog voltage from a capacitor (RC circuit) and turns an LED on or off based on a threshold. Use this to simulate timing behavior (e.g., LED turns off after capacitor discharges below a voltage).',
      hint: 'Use analogRead() to monitor capacitor voltage and implement timing logic based on exponential decay (V = V₀ * e^(-t/RC)).',
      expectedOutput: 'LED blinks off after specific delay governed by RC behavior.',
      starterCode: `// RC Discharge Timer Challenge
#define LED_PIN 13
#define ANALOG_PIN A0
#define THRESHOLD_VOLTAGE 512  // ~2.5V on 5V system

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("RC Timer Started");
}

void loop() {
  // Your code here
  // Read analog voltage from capacitor
  // Compare with threshold
  // Control LED based on voltage level
  
  delay(10);
}`,
      solution: `// RC Discharge Timer Solution
#define LED_PIN 13
#define ANALOG_PIN A0
#define THRESHOLD_VOLTAGE 512

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("RC Timer Started");
}

void loop() {
  int voltage = analogRead(ANALOG_PIN);
  Serial.print("Voltage: ");
  Serial.println(voltage);
  
  if (voltage > THRESHOLD_VOLTAGE) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  
  delay(10);
}`
    },
    {
      id: 'rlc-filter',
      title: 'RLC Filter Audio Player',
      icon: Volume2,
      emoji: '🔊',
      difficulty: 'Intermediate',
      concepts: ['Filtering', 'PWM Output', 'Frequency Response'],
      description: 'Play tones using PWM that simulate output from a low-pass RLC filter.',
      problem: 'Use analogWrite() (PWM) to output a tone. Apply digital filtering logic to simulate how an RLC filter would attenuate certain frequencies.',
      hint: 'Use a simple moving average or IIR filter to simulate RLC behavior digitally before outputting via PWM. Choose tone frequencies accordingly.',
      expectedOutput: 'Cleaner tone playback at low frequencies, distortion at higher ones.',
      starterCode: `// RLC Filter Audio Player Challenge
#define SPEAKER_PIN 9
#define FREQ_HIGH 1000
#define FREQ_LOW 200

float filterOutput = 0;
float alpha = 0.1;  // Filter coefficient

void setup() {
  pinMode(SPEAKER_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Your code here
  // Generate tone frequencies
  // Apply digital filter
  // Output filtered signal via PWM
}`,
      solution: `// RLC Filter Audio Player Solution
#define SPEAKER_PIN 9
#define FREQ_HIGH 1000
#define FREQ_LOW 200

float filterOutput = 0;
float alpha = 0.1;

void setup() {
  pinMode(SPEAKER_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Generate square wave at different frequencies
  float input = sin(millis() * 0.01) > 0 ? 255 : 0;
  
  // Simple low-pass filter (IIR)
  filterOutput = alpha * input + (1 - alpha) * filterOutput;
  
  analogWrite(SPEAKER_PIN, (int)filterOutput);
  delay(1);
}`
    },
    {
      id: 'power-meter',
      title: 'Power Meter Display',
      icon: Gauge,
      emoji: '⚡',
      difficulty: 'Advanced',
      concepts: ['Sensor Interfacing', 'Power Factor Calculation', 'Analog Signal Analysis'],
      description: 'Read voltage and current sensors and display real-time power factor on an LCD or serial monitor.',
      problem: 'Use sensors to measure current and voltage signals. Calculate the power factor by measuring the phase difference between them and show it on the display.',
      hint: 'Use analogRead() and apply zero-crossing detection to calculate phase angle. Then use PF = cos(θ) where θ = phase shift.',
      expectedOutput: 'Real-time PF values (e.g., 0.85 lagging).',
      starterCode: `// Power Meter Display Challenge
#define VOLTAGE_PIN A0
#define CURRENT_PIN A1

float voltageSamples[100];
float currentSamples[100];
int sampleIndex = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Power Factor Meter");
}

void loop() {
  // Your code here
  // Read voltage and current
  // Detect zero crossings
  // Calculate phase difference
  // Compute power factor
}`,
      solution: `// Power Meter Display Solution
#define VOLTAGE_PIN A0
#define CURRENT_PIN A1

void setup() {
  Serial.begin(9600);
  Serial.println("Power Factor Meter Started");
}

void loop() {
  int voltage = analogRead(VOLTAGE_PIN);
  int current = analogRead(CURRENT_PIN);
  
  // Simulate phase calculation
  float phaseShift = sin(millis() * 0.001) * 30; // Simulate phase shift
  float powerFactor = cos(phaseShift * PI / 180);
  
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print(", Current: ");
  Serial.print(current);
  Serial.print(", PF: ");
  Serial.println(powerFactor, 3);
  
  delay(100);
}`
    },
    {
      id: 'three-phase',
      title: 'Three-Phase LED Sequencer',
      icon: RotateCcw,
      emoji: '🔄',
      difficulty: 'Intermediate',
      concepts: ['Phase Angles', 'Timing Control', 'Visual Simulation'],
      description: 'Simulate three-phase AC logic by lighting 3 LEDs in a phase-shifted sequence.',
      problem: 'Write a program that turns 3 LEDs on and off in a 120° phase difference loop, simulating a 3-phase system visually.',
      hint: 'Use delayMicroseconds() or timers to offset the toggling of each LED by 1/3 of the cycle duration.',
      expectedOutput: '3 LEDs turn on/off in perfect sequence: A → B → C → A …',
      starterCode: `// Three-Phase LED Sequencer Challenge
#define LED_A 8
#define LED_B 9
#define LED_C 10
#define CYCLE_TIME 600  // Total cycle time in ms

void setup() {
  pinMode(LED_A, OUTPUT);
  pinMode(LED_B, OUTPUT);
  pinMode(LED_C, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Your code here
  // Create 120° phase shifted LED sequence
  // LED_A at 0°, LED_B at 120°, LED_C at 240°
}`,
      solution: `// Three-Phase LED Sequencer Solution
#define LED_A 8
#define LED_B 9
#define LED_C 10
#define CYCLE_TIME 600

void setup() {
  pinMode(LED_A, OUTPUT);
  pinMode(LED_B, OUTPUT);
  pinMode(LED_C, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  unsigned long currentTime = millis();
  int phaseTime = CYCLE_TIME / 3;
  
  // Phase A (0°)
  digitalWrite(LED_A, (currentTime % CYCLE_TIME) < phaseTime);
  
  // Phase B (120°)
  digitalWrite(LED_B, ((currentTime + phaseTime) % CYCLE_TIME) < phaseTime);
  
  // Phase C (240°)
  digitalWrite(LED_C, ((currentTime + 2*phaseTime) % CYCLE_TIME) < phaseTime);
  
  delay(10);
}`
    },
    {
      id: 'audio-crossover',
      title: 'Audio Crossover Tuning',
      icon: Sliders,
      emoji: '🎛️',
      difficulty: 'Advanced',
      concepts: ['Serial Communication', 'Digital Filters', 'Live Parameter Tuning'],
      description: 'Create a serial interface to live-tweak RC filter values and observe real-time audio tone changes.',
      problem: 'Allow the user to send commands via Serial to change resistor/capacitor values in code, affecting how audio frequencies are filtered.',
      hint: 'Use Serial.read() to update digital "RC constants" and adjust filter coefficients in your code dynamically.',
      expectedOutput: 'Tone output changes pitch or clarity when RC values are adjusted.',
      starterCode: `// Audio Crossover Tuning Challenge
#define AUDIO_OUT 9
float R = 1000.0;  // Resistance value
float C = 0.000001;  // Capacitance value
float cutoffFreq = 1 / (2 * PI * R * C);

void setup() {
  pinMode(AUDIO_OUT, OUTPUT);
  Serial.begin(9600);
  Serial.println("Enter R or C values (e.g., 'R1500' or 'C0.000002')");
}

void loop() {
  // Your code here
  // Check for serial input
  // Parse R and C values
  // Update filter parameters
  // Generate filtered audio
}`,
      solution: `// Audio Crossover Tuning Solution
#define AUDIO_OUT 9
float R = 1000.0;
float C = 0.000001;
float cutoffFreq = 159.15;  // 1/(2*PI*R*C)

void setup() {
  pinMode(AUDIO_OUT, OUTPUT);
  Serial.begin(9600);
  Serial.println("Enter R or C values (e.g., 'R1500' or 'C0.000002')");
  printStatus();
}

void loop() {
  if (Serial.available()) {
    String input = Serial.readString();
    input.trim();
    
    if (input.startsWith("R")) {
      R = input.substring(1).toFloat();
      updateCutoff();
    } else if (input.startsWith("C")) {
      C = input.substring(1).toFloat();
      updateCutoff();
    }
  }
  
  // Generate tone based on current filter settings
  tone(AUDIO_OUT, cutoffFreq, 100);
  delay(200);
}

void updateCutoff() {
  cutoffFreq = 1 / (2 * PI * R * C);
  printStatus();
}

void printStatus() {
  Serial.print("R: ");
  Serial.print(R);
  Serial.print(" Ohms, C: ");
  Serial.print(C, 8);
  Serial.print(" F, Cutoff: ");
  Serial.print(cutoffFreq);
  Serial.println(" Hz");
}`
    },
    {
      id: 'psu-monitor',
      title: 'PSU Status Monitor',
      icon: Battery,
      emoji: '🔋',
      difficulty: 'Intermediate',
      concepts: ['Transient Detection', 'Debouncing', 'Power Monitoring'],
      description: 'Monitor voltage input to a power supply and flag any transient drops with debounced detection.',
      problem: 'Design a system that detects if supply voltage dips below threshold and shows a warning (e.g., LED alert or message). Ignore false triggers using debounce logic.',
      hint: 'Use rolling average or delay-based debounce to confirm a drop is persistent, not noise.',
      expectedOutput: 'Alert only appears when drop is real (e.g., not from noise spikes).',
      starterCode: `// PSU Status Monitor Challenge
#define VOLTAGE_PIN A0
#define ALERT_LED 13
#define THRESHOLD 450  // ~2.2V threshold
#define DEBOUNCE_TIME 100  // ms

bool alertState = false;
unsigned long lastDebounceTime = 0;

void setup() {
  pinMode(ALERT_LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("PSU Monitor Started");
}

void loop() {
  // Your code here
  // Read voltage
  // Apply debounce logic
  // Set alert if voltage drop is persistent
}`,
      solution: `// PSU Status Monitor Solution
#define VOLTAGE_PIN A0
#define ALERT_LED 13
#define THRESHOLD 450
#define DEBOUNCE_TIME 100

bool alertState = false;
unsigned long lastDebounceTime = 0;
bool lastVoltageState = true;

void setup() {
  pinMode(ALERT_LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("PSU Monitor Started");
}

void loop() {
  int voltage = analogRead(VOLTAGE_PIN);
  bool currentVoltageOK = voltage > THRESHOLD;
  
  if (currentVoltageOK != lastVoltageState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > DEBOUNCE_TIME) {
    if (!currentVoltageOK && !alertState) {
      alertState = true;
      digitalWrite(ALERT_LED, HIGH);
      Serial.println("ALERT: Voltage drop detected!");
    } else if (currentVoltageOK && alertState) {
      alertState = false;
      digitalWrite(ALERT_LED, LOW);
      Serial.println("Voltage restored");
    }
  }
  
  lastVoltageState = currentVoltageOK;
  
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print(" (");
  Serial.print(voltage * 5.0 / 1023.0, 2);
  Serial.println("V)");
  
  delay(50);
}`
    }
  ];

  const runSimulation = () => {
    setIsRunning(true);
    setTestResults(null);
    
    // Simulate code execution and testing
    setTimeout(() => {
      const challenge = challenges.find(c => c.id === selectedChallenge);
      const isCorrect = userCode.includes('analogRead') || userCode.includes('digitalWrite') || userCode.includes('Serial');
      
      setTestResults({
        success: isCorrect,
        message: isCorrect 
          ? `Great job! Your code successfully implements the ${challenge?.title}!` 
          : "Your code needs some work. Check the hints and try again!",
        output: isCorrect 
          ? challenge?.expectedOutput 
          : "No output - check your code logic"
      });
      
      if (isCorrect && !completedChallenges.includes(selectedChallenge)) {
        setCompletedChallenges([...completedChallenges, selectedChallenge]);
      }
      
      setIsRunning(false);
    }, 2000);
  };

  const loadStarterCode = () => {
    const challenge = challenges.find(c => c.id === selectedChallenge);
    setUserCode(challenge?.starterCode || '');
  };

  const loadSolution = () => {
    const challenge = challenges.find(c => c.id === selectedChallenge);
    setUserCode(challenge?.solution || '');
  };

  if (selectedChallenge) {
    const challenge = challenges.find(c => c.id === selectedChallenge);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedChallenge(null);
              setUserCode('');
              setTestResults(null);
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <span className="text-2xl">{challenge.emoji}</span>
              <span>{challenge.title}</span>
              <Badge variant={challenge.difficulty === 'Beginner' ? 'default' : challenge.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                {challenge.difficulty}
              </Badge>
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {challenge.concepts.map(concept => (
                <Badge key={concept} variant="outline" className="text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-600">
                <Lightbulb className="h-5 w-5" />
                <span>Challenge Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Problem Statement:</h4>
                <p className="text-gray-700">{challenge.problem}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Hint:</h4>
                <p className="text-blue-700 bg-blue-50 p-3 rounded-lg">{challenge.hint}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Expected Output:</h4>
                <p className="text-green-700 bg-green-50 p-3 rounded-lg">{challenge.expectedOutput}</p>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-purple-600">
                  <Code className="h-5 w-5" />
                  <span>Code Editor</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={loadStarterCode}>
                    Load Starter
                  </Button>
                  <Button size="sm" variant="outline" onClick={loadSolution}>
                    Show Solution
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="Write your Arduino code here..."
                className="h-64 font-mono text-sm"
              />
              
              <div className="flex justify-between items-center">
                <Button
                  onClick={runSimulation}
                  disabled={isRunning || !userCode.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run & Test
                    </>
                  )}
                </Button>
                
                {completedChallenges.includes(selectedChallenge) && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Completed!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        {testResults && (
          <Card className={`bg-white/90 backdrop-blur-sm ${
            testResults.success ? 'border-green-200' : 'border-red-200'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${
                testResults.success ? 'text-green-600' : 'text-red-600'
              }`}>
                {testResults.success ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>Test Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{testResults.message}</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-2">📟 Serial Monitor Output:</div>
                <div>{testResults.output}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🚀 Embedded Systems Challenges
        </h2>
        <p className="text-gray-600 text-lg">
          Master real-world embedded programming with hands-on Arduino challenges! 
          Code, simulate, and learn electrical engineering concepts! ⚡
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
            <span className="text-sm text-gray-600">
              {completedChallenges.length} of {challenges.length} challenges completed
            </span>
          </div>
          <Progress value={(completedChallenges.length / challenges.length) * 100} className="w-full" />
        </CardContent>
      </Card>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const IconComponent = challenge.icon;
          const isCompleted = completedChallenges.includes(challenge.id);
          
          return (
            <Card 
              key={challenge.id}
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white/90 backdrop-blur-sm border-gray-200'
              }`}
              onClick={() => setSelectedChallenge(challenge.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{challenge.emoji}</span>
                    <div>
                      <CardTitle className="text-blue-600 text-sm">{challenge.title}</CardTitle>
                      <Badge 
                        variant={
                          challenge.difficulty === 'Beginner' ? 'default' : 
                          challenge.difficulty === 'Intermediate' ? 'secondary' : 
                          'destructive'
                        }
                        className="mt-1"
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                <div className="flex flex-wrap gap-1">
                  {challenge.concepts.slice(0, 2).map(concept => (
                    <Badge key={concept} variant="outline" className="text-xs">
                      {concept}
                    </Badge>
                  ))}
                  {challenge.concepts.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{challenge.concepts.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Encouragement Section */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
        <CardContent className="p-6 text-center">
          <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to Code Some Magic? ⚡
          </h3>
          <p className="text-gray-700">
            These challenges will help you master embedded systems programming while learning core EE concepts. 
            Start with the beginner challenges and work your way up. You've got this! 🚀
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddedSystemsChallenges;
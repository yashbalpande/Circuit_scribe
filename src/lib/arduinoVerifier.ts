export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  solution: string;
  requirements: string[];
  hints: string[];
}

export interface VerificationResult {
  score: number;
  feedback: string[];
  passed: boolean;
  suggestions: string[];
}

export const challenges: Challenge[] = [
  {
    id: 'led-blink',
    title: 'LED Blink Challenge',
    description: 'Create a program that makes an LED blink on and off every second.',
    difficulty: 'beginner',
    solution: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
    requirements: ['pinMode', 'digitalWrite', 'delay', 'setup', 'loop'],
    hints: [
      'Use pin 13 for the LED',
      'Remember to set the pin mode in setup()',
      'Use delay() to control timing'
    ]
  },
  {
    id: 'led-fade',
    title: 'LED Fade Challenge',
    description: 'Create a program that makes an LED fade in and out smoothly.',
    difficulty: 'beginner',
    solution: `void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(9, brightness);
    delay(10);
  }
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(9, brightness);
    delay(10);
  }
}`,
    requirements: ['analogWrite', 'for loop', 'setup', 'loop'],
    hints: [
      'Use analogWrite() instead of digitalWrite()',
      'Use a for loop to change brightness gradually',
      'PWM pin 9 works well for this'
    ]
  },
  {
    id: 'button-led',
    title: 'Button Control LED',
    description: 'Create a program that turns an LED on when a button is pressed.',
    difficulty: 'intermediate',
    solution: `const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
    requirements: ['digitalRead', 'INPUT_PULLUP', 'if statement', 'setup', 'loop'],
    hints: [
      'Use INPUT_PULLUP for the button pin',
      'Check if button is pressed with digitalRead()',
      'Remember to declare pin constants'
    ]
  },
  {
    id: 'servo-control',
    title: 'Servo Motor Control',
    description: 'Create a program that controls a servo motor to sweep from 0 to 180 degrees.',
    difficulty: 'intermediate',
    solution: `#include <Servo.h>

Servo myServo;
int servoPin = 9;

void setup() {
  myServo.attach(servoPin);
}

void loop() {
  for (int angle = 0; angle <= 180; angle++) {
    myServo.write(angle);
    delay(15);
  }
  for (int angle = 180; angle >= 0; angle--) {
    myServo.write(angle);
    delay(15);
  }
}`,
    requirements: ['#include <Servo.h>', 'Servo', 'attach', 'write', 'for loop'],
    hints: [
      'Include the Servo library',
      'Create a Servo object',
      'Use attach() to connect to a pin',
      'Use write() to set the angle'
    ]
  },
  {
    id: 'lcd-display',
    title: 'LCD Display Challenge',
    description: 'Create a program that displays "Hello World!" on an LCD screen.',
    difficulty: 'advanced',
    solution: `#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Hello World!");
}

void loop() {
  // Display stays on
}`,
    requirements: ['#include <LiquidCrystal.h>', 'LiquidCrystal', 'begin', 'print'],
    hints: [
      'Include the LiquidCrystal library',
      'Initialize with pin numbers',
      'Use begin() to set up the display',
      'Use print() to display text'
    ]
  }
];

export function verifyArduinoCode(userCode: string, challengeId: string): VerificationResult {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) {
    return {
      score: 0,
      feedback: ['Challenge not found'],
      passed: false,
      suggestions: []
    };
  }

  const result: VerificationResult = {
    score: 0,
    feedback: [],
    passed: false,
    suggestions: []
  };

  // Check for required functions and keywords
  const requiredElements = challenge.requirements;
  let foundElements = 0;

  for (const element of requiredElements) {
    if (userCode.includes(element)) {
      foundElements++;
      result.feedback.push(`✅ Found: ${element}`);
    } else {
      result.feedback.push(`❌ Missing: ${element}`);
      result.suggestions.push(`Add ${element} to your code`);
    }
  }

  // Calculate score based on found elements
  result.score = Math.round((foundElements / requiredElements.length) * 100);

  // Check for basic structure
  if (userCode.includes('void setup()') && userCode.includes('void loop()')) {
    result.feedback.push('✅ Proper Arduino structure (setup and loop functions)');
  } else {
    result.feedback.push('❌ Missing proper Arduino structure');
    result.suggestions.push('Make sure you have both setup() and loop() functions');
  }

  // Check for syntax errors (basic check)
  if (userCode.includes('{') && userCode.includes('}')) {
    result.feedback.push('✅ Code has proper braces structure');
  } else {
    result.feedback.push('❌ Check your braces and syntax');
    result.suggestions.push('Make sure all functions and loops have proper braces');
  }

  // Determine if passed (at least 70% score and proper structure)
  result.passed = result.score >= 70 && 
                  userCode.includes('void setup()') && 
                  userCode.includes('void loop()');

  if (result.passed) {
    result.feedback.push('🎉 Great job! Your code looks good!');
  } else if (result.score >= 50) {
    result.feedback.push('👍 You\'re on the right track! Keep working on it.');
  } else {
    result.feedback.push('💡 Review the requirements and try again.');
  }

  return result;
}

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id);
}

export function getAllChallenges(): Challenge[] {
  return challenges;
} 
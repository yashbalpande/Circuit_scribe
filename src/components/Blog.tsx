import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// List of available courses
const courses = [
  {
    id: 'arduino',
    title: 'Arduino',
    icon: '⚡',
    cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  // Add more courses here
];

// Arduino Day-wise curriculum
const arduinoDays = [
  {
    day: '1',
    title: 'Variables and Data Types',
    content: `
## 🎯 Goals

- Void Setup & Void Loop
- Understand basic C data types in embedded
- Declare and initialize variables properly
- Print variable values to Serial Monitor

### 0. Void Setup & Void Loop

- 🛠 \`void setup()\` = Setting up your kitchen once before cooking  
  Runs **only once** when Arduino is powered on/reset.
- 🔁 \`void loop()\` = The cooking routine you repeat every day  
  Runs **repeatedly** like a cycle.

### 1. Essential Data Types

\`\`\`arduino
int variable = 2;
long variable = 123456;
float variable = 3.3;
bool variable = true;
char variable = 'A';
byte variable = 255;
\`\`\`

### 2. Why Data Types Matter in Embedded Systems

- Memory is limited — choose smallest suitable type
- Smaller types = faster operations
- Hardware compatibility

### 3. Variable Declaration Best Practices

\`\`\`arduino
// Avoid unclear names
int x = 4;
float v = 0.0;

// Use descriptive names
int buttonPin = 4;
float sensorVoltage = 0.0;
\`\`\`

### 4. Serial Communication

- \`Serial.begin(9600)\` — starts communication at 9600 baud rate
- \`Serial.print()\` — prints without newline
- \`Serial.println()\` — prints with newline

### 5. Example

\`\`\`arduino
void setup() {
  Serial.begin(9600);
  int ledPin = 2;
  long uptime = 86400;
  float voltage = 3.3;
  bool systemReady = true;
  char status = 'R';
  byte brightness = 128;

  Serial.println("===Variables Demo ===");
  Serial.print("LED Pin: "); Serial.println(ledPin);
  Serial.print("Uptime: "); Serial.print(uptime); Serial.println(" seconds");
  Serial.print("System Voltage: "); Serial.print(voltage); Serial.println(" V");
  Serial.print("System Ready: "); Serial.println(systemReady ? "YES" : "NO");
  Serial.print("Status Code: "); Serial.println(status);
  Serial.print("LED Brightness: "); Serial.println(brightness);
}

void loop() {
  // Empty for now
}
\`\`\`
`,
    questions: [
      { question: '1. Which data type uses the least memory?' },
      { question: '2. What is the difference between Serial.print() and Serial.println()?' },
      { question: '3. What baud rate is used in today\'s example?' },
      { question: '4. Which data type is best for storing large timestamp values?' },
      { question: '5. What does Serial.begin(9600) do?' },
      { question: 'Snippet 1: What will this code print?', code: 'int x = 25;\nSerial.print("Value: ");\nSerial.println(x);' },
      { question: 'Snippet 2: Which variable declaration is CORRECT?', code: 'A) int ledPin = 2.5;\nB) float voltage = 3.3;\nC) bool status = "true";\nD) char letter = 65;' },
      { question: 'Snippet 3: What\'s wrong with this code?', code: 'void setup() {\n  int pin = 13;\n  Serial.println(pin);\n}' },
      { question: 'Snippet 4: What will be the output?', code: 'bool ready = false;\nSerial.println(ready ? "YES" : "NO");' },
      { question: 'Snippet 5: Which line will cause an error?', code: 'byte brightness = 255;\nbyte overflow = 300;\nchar letter = \'A\';\nfloat temp = -5.5;' },
    ],
    assignment: {
      task: 'Create your own variable demonstration program',
      requirements: [
        'Declare variables in setup()',
        'Print each variable with a descriptive label.',
        'Upload and verify output in Serial Monitor.',
      ],
      expectedOutput: `LED Pin: 2\nUptime: 86400 seconds\nSystem Voltage: 3.3 V\nSystem Ready: YES\nStatus Code: R\nLED Brightness: 128`
    }
  },
  // Add more days as needed
];

// Detail view for Arduino course
const ArduinoDetail = ({ onBack }) => (
  <div className="max-w-3xl mx-auto py-8 px-4">
    <button
      onClick={onBack}
      className="mb-6 px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      ← Back to Courses
    </button>

    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <span className="text-purple-400 text-2xl">⚡</span> Arduino Day-wise Plan
    </h2>

    <div className="space-y-10">
      {arduinoDays.map((item, idx) => (
        <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl shadow p-6">
          <div className="text-yellow-400 font-bold mb-1">Day {item.day}</div>
          <div className="text-lg font-semibold text-white mb-2">{item.title}</div>
          
          <div className="text-gray-200 prose prose-invert max-w-none mb-6">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>

          {item.questions && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-pink-400 mb-2">Questions & Practice</h3>
              <ul className="space-y-4">
                {item.questions.map((q, i) => (
                  <li key={i} className="bg-gray-800 rounded p-4">
                    <div className="font-semibold text-white mb-2">{q.question}</div>
                    {q.code && (
                      <pre className="bg-gray-700 rounded p-2 text-sm overflow-x-auto text-green-200 mb-0">
                        <code>{q.code}</code>
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.assignment && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-400 mb-2">Day {item.day} Assignment</h3>
              <div className="font-semibold text-white mb-2">{item.assignment.task}</div>
              <ul className="list-disc list-inside text-gray-200 mb-2">
                {item.assignment.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
              {item.assignment.expectedOutput && (
                <div className="mt-2">
                  <div className="font-semibold text-white mb-1">Expected Output Example</div>
                  <pre className="bg-gray-800 rounded p-2 text-sm overflow-x-auto text-green-200">
                    <code>{item.assignment.expectedOutput}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Main Course Page
const CoursePage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  if (selectedCourse === 'arduino') {
    return <ArduinoDetail onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="Courses">📚</span> Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800 hover:shadow-2xl transition cursor-pointer"
            onClick={() => setSelectedCourse(course.id)}
          >
            <div className="h-36 w-full bg

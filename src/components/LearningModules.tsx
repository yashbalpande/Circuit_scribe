import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { useAuth } from './FirebaseAuthProvider';
import { updateQuizScore, markArduinoDayComplete, updateCurrentArduinoDay, getUserProfile } from '../lib/userProfile';
import { motion } from 'framer-motion';
import { Star, Trophy, Zap } from 'lucide-react';
import ProgressTracker from './ProgressTracker';

const courses = [
  {
    id: 'arduino',
    title: 'Arduino',
    icon: '⚡',
    cover:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
];

type ArduinoDay = {
  day: string;
  title: string;
  summary: string;
  tags: string[];
  image: string;
  content: string;
  questions: any[];
  quiz?: Array<{ question: string; options: string[]; answer: number }>;
};

const arduinoDays: ArduinoDay[] = [
  {
    day: '1',
    title: 'What is Arduino?',
    summary: 'Discover what Arduino is, why it is popular, and what you can build with it. Learn about the basics of the platform and its community.',
    tags: ['Beginner', 'Introduction', 'Open Source', 'Physical Computing'],
    image: '/pic1.png',
    content:
      '# **What is Arduino?**\n' +
      '\n' +
      '![Arduino Uno board with icons showing possible projects like lights, robots, plant watering, and buttons](../public/pic1.png)\n' +
      '\n' +
      '> 💡 **Arduino is an open source electronics platform designed for ease of use.**\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔷 **Arduino Boards**\n' +
      'Small circuit boards with a special microchip that acts like a tiny computer. These boards have inputs and outputs, allowing them to:\n' +
      '- **Connect to sensors** (to read information)\n' +
      '- **Connect to actuators** (to control things like lights or motors)\n' +
      '\n' +
      '## 🔷 **Programming Environment**\n' +
      'Where you write instructions (code) for the Arduino board. You write your code and upload it to the Arduino board, telling it exactly what to do.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '### 💬 **What does "open source" mean?**\n' +
      'It means the designs for both the hardware and software are publicly available.  \n' +
      'This promotes a massive global community that shares knowledge, creates new projects, and provides support—making learning and building with Arduino much easier for beginners.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## ⚙️ **void setup() and void loop()**\n' +
      '> 💡 **These two functions are the heart of every Arduino program.**\n' +
      '\n' +
      '### 🔸 **void setup()**\n' +
      'This function runs **once** when the Arduino board starts or resets.  \n' +
      'Think of it as the preparation area.\n' +
      '\n' +
      '**Examples:**\n' +
      '- Define which pins are inputs or outputs\n' +
      '- Start communication (like Serial Monitor)\n' +
      '\n' +
      '```\n' +
      'void setup() {\n' +
      '  pinMode(13, OUTPUT); // Set pin 13 as output\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### 🔸 **void loop()**\n' +
      'This function runs **repeatedly, forever**.  \n' +
      'Place the main logic of your program here.\n' +
      '\n' +
      '**Examples:**\n' +
      '- Check if a button is pressed\n' +
      '- Read sensor data\n' +
      '- Turn an LED on/off\n' +
      '\n' +
      '```\n' +
      'void loop() {\n' +
      '  digitalWrite(13, HIGH); // Turn LED on\n' +
      '  delay(1000);            // Wait for 1 second\n' +
      '  digitalWrite(13, LOW);  // Turn LED off\n' +
      '  delay(1000);            // Wait for 1 second\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## ⭐ **Why Choose Arduino?**\n' +
      '> 💡 Arduino’s popularity stems from several key advantages:\n' +
      '\n' +
      '- **Simplicity** — Designed for beginners, it simplifies interaction with hardware and code\n' +
      '- **Affordability** — Arduino boards are cost-effective and perfect for students and hobbyists\n' +
      '- **Versatility** — From blinking LEDs to robotics, Arduino can power a wide variety of projects\n' +
      '- **Vast Community** — A huge open-source community offers tutorials, libraries, and forums\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🚀 **What Can You Build with Arduino?**\n' +
      '> 💡 Arduino lets you bridge code and hardware to build amazing interactive projects.\n' +
      '\n' +
      '- **Smart Home Devices** — Automate lights, control appliances, monitor temperature or humidity\n' +
      '\n' +
      '- **Robotics** — Build robots, line-followers, or drones\n\n' +
'- **Sensor Systems** — Measure environmental data like light, distance, sound, or motion\n\n' +
'- **Interactive Art** — Create displays that react to touch, sound, or movement\n\n' +
'- **Educational Tools** — Great for building hands-on learning kits\n',

    questions: []
  },
 {
    day: '2',
    title: 'Arduino Board Anatomy',
    summary: 'Explore the key components of an Arduino board and understand the function of each part, from the microcontroller to the power pins.',
    tags: ['Hardware', 'Board Anatomy', 'Components', 'Beginner'],
    image: '/pic2.png',
    content: `
  # Arduino Board Anatomy
  
  ![Arduino board with labeled components](../public/pic4.png)
  
  ## **Key Components of an Arduino Board**
  
  Imagine your Arduino board as a mini city. Each part has a specific job:
  
  💡 **Microcontroller** — the large black rectangular chip on the board.
  
  It's the "brain" of your Arduino. It executes the code you write, reads input from sensors, and controls outputs like LEDs or motors.  
  Example: On many common boards, this is an ATmega328P chip.
  
  💡 **USB Port** — the rectangular port, usually on the side of the board.
  
  Power: Provides power to the Arduino board from your computer or a USB wall adapter.  
  Communication: Allows your computer to communicate with the Arduino. This is how you upload your code to the board and how the Arduino can send messages back.  
  Example: You'd plug a standard USB cable here to connect to your computer.
  
  💡 **Power Jack** — the circular port, usually next to the USB port.
  
  You can connect an external power supply here to power your Arduino when it's not connected to a computer via USB. Useful for standalone projects.  
  Example: A 9V battery pack or a 12V power adapter can be plugged in here.
  
  💡 **Reset Button** — the small button labeled "RESET"
  
  Restarts the program currently running on the Arduino.  
  It's like pressing the reset button on a computer — the program stops and starts again from the beginning of void setup().  
  Example: If your program is stuck or you want it to restart, press this button.
  
  💡 **Digital Pins** — rows of pin headers labeled 0 to 13 (plus A0–A5 which can also be digital)
  
  Used for ON/OFF signals. They can be configured as inputs or outputs.  
  Example: Pin 13 is often connected to a built-in LED for easy testing.
  
  💡 **Analog Pins** — usually labeled A0 to A5
  
  Unlike digital pins, analog pins can read a range of values, not just ON/OFF.  
  Ideal for sensors that output varying voltage like temperature or light sensors.  
  Example: Connect a light sensor to pin A0 to measure brightness levels.
  
  💡 **Power Pins** — essential for powering components connected to the Arduino
  
  - GND (Ground): The common return path for current. Most components need to connect here.  
  - 5V: Regulated 5V output for sensors and modules.  
  - 3.3V: Regulated 3.3V output for lower-voltage components.  
  - Vin (Voltage Input): The raw input voltage when powering via the power jack (e.g. 9V). Use with caution as this voltage is unregulated.  
  Example: Connect the positive leg of an LED to a digital pin and the negative leg to GND.
    `,
    questions: []
  },
  {
    day: '3',
    title: 'Serial Communication Basics',
    summary: 'Learn how Arduino communicates with your computer and other devices using serial communication. Understand key commands and see practical examples.',
    tags: ['Serial', 'Communication', 'Debugging', 'Beginner'],
    image: '/pic3.png',
    content:
      '## ↔️ Serial Communication Basics\n ' +
      '\n' +
      'Serial communication is a way for your Arduino to send and receive data to/from other devices—most commonly your computer.\n' +
      'Think of it as a chat channel between your Arduino and your PC.\n' +
      '\n' +
      '### 🛠️ Why Use Serial Communication?\n' +
      '- **Debugging** — Print messages or sensor values to troubleshoot your code.\n' +
      '- **Monitoring** — See real-time data from sensors like temperature, light, or distance.\n' +
      '- **Controlling** — Send commands from your computer to Arduino (e.g., type on to turn an LED on).\n' +
      '\n' +
      '### ⚙️ How Serial Communication Works\n' +
      '- Data is sent serially: one bit (0 or 1) at a time over a single wire.\n' +
      '  - Like sending letters one-by-one instead of the full word.\n' +
      '- Both devices must agree on a **baud rate** (speed of communication).\n' +
      '  - Common baud rates: 9600, 115200\n' +
      '\n' +
      '### 🔑 Key Serial Communication Commands\n' +
      '\n' +
      '**🔹 Serial.begin(baudRate)**\n' +
      'Starts serial communication.\n' +
      '```\nSerial.begin(9600); // Starts communication at 9600 bits per second\n```\n' +
      'baudRate: Both Arduino and PC must use the same speed (e.g., 9600, 115200)\n' +
      '\n' +
      '**🔹 Serial.print(data)**\n' +
      'Sends data from Arduino to the connected device.\n' +
      '```\nSerial.print("Hello, Arduino!");\n```\n' +
      'Prints text, numbers, or variables without a new line.\n' +
      '\n' +
      '**🔹 Serial.println(data)**\n' +
      'Similar to Serial.print(), but adds a newline after the message.\n' +
      '```\nSerial.println("Hello, new line!");\n```\n' +
      'Each output appears on its own line.\n' +
      '\n' +
      '**🔹 Serial.available()**\n' +
      'Checks how many bytes are available to read from serial input.\n' +
      '```\nif (Serial.available()) {\n  // there\'s new data\n}\n```\n' +
      'Returns 0 if no data, or 1+ if data is ready.\n' +
      '\n' +
      '**🔹 Serial.read()**\n' +
      'Reads the next byte from serial input.\n' +
      '```\nchar incomingByte = Serial.read();\n' +
      '\n' +
      '### 🧪 Example 1: Arduino Sending "Hello!" Every Second\n' +
      '```\nvoid setup() {\n  Serial.begin(9600); // Start serial communication at 9600 baud\n}\n\nvoid loop() {\n  Serial.println("Hello!"); // Send "Hello!" followed by a new line\n  delay(1000); // Wait for 1 second\n}\n```\n' +
      '\n' +
      '### 🧪 Example 2: Arduino Reading a Character from Your Computer\n' +
      '```\nvoid setup() {\n  Serial.begin(9600); // Start serial communication\n}\n\nvoid loop() {\n  if (Serial.available() > 0) { // Check if data is available\n    char incomingChar = Serial.read();        // Read the oldest character\n    Serial.print("I received: ");             // Print a message\n    Serial.println(incomingChar);             // Print the character received\n  }\n}\n```\n',
    questions: []
  },
  {
    day: '5',
    title: 'Operators in Arduino',
    summary:
      'Learn how operators work in Arduino to perform calculations, make comparisons, and control logic. Includes examples for arithmetic, comparison, and logical operators.',
    tags: ['Operators', 'Logic', 'Arduino Programming', 'Beginner'],
    image: '/pic5.png',
    content:
`# 🧮 Operators in Arduino

## 🔍 What Are Operators?
Operators are special symbols that perform operations on variables and values.
They are the building blocks for calculations, comparisons, and logical decisions in your Arduino programs.

---

## 📚 Categories of Operators
- **Arithmetic Operators** – Perform mathematical calculations
- **Comparison Operators** – Compare two values
- **Logical Operators** – Combine or modify boolean values

---

## ➕ Arithmetic Operators
Used to perform basic mathematical operations on numbers.

### ➕ Addition +
\`\`\`cpp
int a = 5;
int b = 3;
int sum = a + b;  // Result: 8
\`\`\`

### ➖ Subtraction -
\`\`\`cpp
int temperature = 25;
int decrease = 5;
int newTemp = temperature - decrease;  // Result: 20
\`\`\`

### ✖️ Multiplication *
\`\`\`cpp
float voltage = 3.3;
float multiplier = 2.0;
float result = voltage * multiplier;  // Result: 6.6
\`\`\`

### ➗ Division /
\`\`\`cpp
int totalLEDs = 20;
int groups = 4;
int ledsPerGroup = totalLEDs / groups;  // Result: 5
\`\`\`

### 🔢 Modulus % (Remainder)
\`\`\`cpp
int number = 17;
int divisor = 5;
int remainder = number % divisor;  // Result: 2
\`\`\`

---

## ⚖️ Comparison Operators
These operators compare two values and return true or false.

### == Equal to
\`\`\`cpp
int sensorValue = 512;
bool isMiddle = (sensorValue == 512);  // Result: true
\`\`\`

### != Not Equal to
\`\`\`cpp
char grade = 'A';
bool notPerfect = (grade != 'A');  // Result: false
\`\`\`

### > Greater Than
\`\`\`cpp
float temperature = 30.5; 
bool tooHot = (temperature > 25.0);  // Result: true
\`\`\`

### < Less Than
\`\`\`cpp
int brightness = 100;
bool dim = (brightness < 200);  // Result: true
\`\`\`

### >= Greater Than or Equal To
\`\`\`cpp
int batteryLevel = 80;
bool sufficient = (batteryLevel >= 80);  // Result: true
\`\`\`

### <= Less Than or Equal To
\`\`\`cpp
byte pwmValue = 255;
bool validPWM = (pwmValue <= 255);  // Result: true
\`\`\`

---

## 🧠 Logical Operators
These work with boolean values (true/false) and combine or modify them.

### && Logical AND
\`\`\`cpp
bool switch1 = true;
bool switch2 = true;
bool bothOn = switch1 && switch2;  // Result: true
\`\`\`

**Truth Table:**
\`\`\`arduino
true  && true  = true  
true  && false = false  
false && true  = false  
false && false = false
\`\`\`

### || Logical OR
\`\`\`cpp
bool emergencyStop = false;
bool manualStop = true;
bool shouldStop = emergencyStop || manualStop;  // Result: true
\`\`\`

**Truth Table:**
\`\`\`arduino
true  || true  = true  
true  || false = true  
false || true  = true  
false || false = false
\`\`\`

### ! Logical NOT
\`\`\`cpp
bool systemReady = false;
bool systemNotReady = !systemReady;  // Result: true
\`\`\`

---

## 🧮 Operator Precedence
When multiple operators are used, precedence determines the order of operations.

**Order (Highest → Lowest):**
1. Parentheses ()
2. NOT !
3. Multiplication *, Division /, Modulus %
4. Addition +, Subtraction -
5. Comparison Operators <, >, <=, >=
6. Equality Operators ==, !=
7. AND &&
8. OR ||

**Example:**
\`\`\`cpp
int result = 5 + 3 * 2;      // Result: 11
int result2 = (5 + 3) * 2;   // Result: 16
\`\`\`

---

## 📌 Practical Examples

### ✅ Sensor Range Check
\`\`\`cpp
int sensorValue = 750;
bool inRange = (sensorValue >= 200) && (sensorValue <= 800);
\`\`\`

### ✅ LED Brightness Calculation
\`\`\`cpp
int maxBrightness = 255;
int percentage = 75;
int ledBrightness = (maxBrightness * percentage) / 100;
\`\`\`

### ✅ System Status Check
\`\`\`cpp
bool powerOk = true;
bool temperatureOk = false;
bool systemStatus = powerOk && temperatureOk;  // Result: false
\`\`\`
`,
  quiz: [
    {
      question: '1. What is the primary purpose of a variable in Arduino?',
      options: [
        'a) Store only text values',
        'b) Create loops',
        'c) Store and manage data values',
        "d) Control the board's voltage",
      ],
      answer: 2,
    },
    {
      question: '2. Which of the following is a valid variable declaration in Arduino?',
      options: [
        'a) int 2sensor = 512;',
        'b) int light sensor = 1023;',
        'c) int_sensor = 1023;',
        'd) int lightSensor = 1023;',
      ],
      answer: 3,
    },
    {
      question: '3. What data type would you use to store the value 3.14?',
      options: [
        'a) int',
        'b) float',
        'c) char',
        'd) bool',
      ],
      answer: 1,
    },
    {
      question: '4. Which of the following can store only true or false values?',
      options: [
        'a) int',
        'b) float',
        'c) bool',
        'd) char',
      ],
      answer: 2,
    },
    {
      question: '5. What is the range of values that an int can store in Arduino?',
      options: [
        'a) 0 to 255',
        'b) -128 to 127',
        'c) -32,768 to 32,767',
        'd) -2,147,483,648 to 2,147,483,647',
      ],
      answer: 2,
    },
    {
      question: '6. Which data type is most memory-efficient for storing small positive values like PWM brightness?',
      options: [
        'a) long',
        'b) byte',
        'c) float',
        'd) bool',
      ],
      answer: 1,
    },
    {
      question: '7. Which variable name is invalid in Arduino?',
      options: [
        'a) _temperature',
        'b) temp1',
        'c) int',
        'd) sensor_value',
      ],
      answer: 2,
    },
    {
      question: '8. What does the following line do? float temp = 22.5;',
      options: [
        'a) Declares an integer named temp',
        'b) Stores an error code',
        'c) Declares a decimal value in a float variable',
        'd) Compares temperature values',
      ],
      answer: 2,
    },
    {
      question: "9. What is the correct data type to store a single letter like 'A'?",
      options: [
        'a) char',
        'b) byte',
        'c) bool',
        'd) int',
      ],
      answer: 0,
    },
    {
      question: '10. Which data type should be used for time values like milliseconds in Arduino?',
      options: [
        'a) int',
        'b) char',
        'c) long',
        'd) bool',
      ],
      answer: 2,
    },
  ],
  questions: [],
},
];

// Add quiz for Day 2 
arduinoDays[1].quiz = [
  {
    question: '1. Which port on the Arduino board is used for both uploading code and powering the board from a computer?',
    options: [
      'A. Power Jack',
      'B. Serial Port',
      'C. USB Port',
      'D. Vin Pin',
    ],
    answer: 2,
  },
  {
    question: '2. The RESET button on an Arduino board does what?',
    options: [
      'A. Uploads a new sketch',
      'B. Restarts the running program from the beginning',
      'C. Shuts down the board',
      'D. Erases the memory',
    ],
    answer: 1,
  },
  {
    question: '3. Pins labeled A0 to A5 are typically used for what purpose?',
    options: [
      'A. Digital output',
      'B. Reading analog signals',
      'C. Powering components',
      'D. Serial communication',
    ],
    answer: 1,
  },
  {
    question: '4. What is the purpose of the GND pins on an Arduino board?',
    options: [
      'A. Send digital signals',
      'B. Supply 5V power',
      'C. Provide a common reference for current flow',
      'D. Increase LED brightness',
    ],
    answer: 2,
  },
  {
    question: '5. If you want to power your Arduino board without connecting it to a computer, where would you typically plug in an external power supply?',
    options: [
      'A. USB Port',
      'B. Analog Pin',
      'C. Power Jack',
      'D. Reset Button',
    ],
    answer: 2,
  },
  {
    question: '6. Digital pins are primarily used for which type of signals?',
    options: [
      'A. Audio',
      'B. Analog',
      'C. ON/OFF (high/low)',
      'D. PWM only',
    ],
    answer: 2,
  },
  {
    question: '7. Which power pin provides a regulated 3.3 volt supply?',
    options: [
      'A. GND',
      'B. Vin',
      'C. 5V',
      'D. 3.3V',
    ],
    answer: 3,
  },
  {
    question: '8. True or False: The microcontroller is the largest physical component on most Arduino boards.',
    options: [
      'A. True',
      'B. False',
    ],
    answer: 0,
  },
  {
    question: '9. What are the two main purposes of the USB port on an Arduino board?',
    options: [
      'A. Internet and Wi-Fi',
      'B. Upload code and provide power',
      'C. Connect external sensors and motors',
      'D. Control the onboard LED',
    ],
    answer: 1,
  },
  {
    question: '10. What is the main function of the microcontroller on an Arduino board?',
    options: [
      'A. Light up LEDs',
      'B. Act as a USB converter',
      'C. Execute the uploaded code and manage inputs/outputs',
      'D. Store sensor data',
    ],
    answer: 2,
  },
];

// Add quiz for Day 3
arduinoDays[2].quiz = [
  {
    question: '1. What is the primary purpose of Serial.begin(9600); in an Arduino program?',
    options: [
      'It initializes serial communication at 9600 baud between Arduino and computer.',
      'It prints data to the serial monitor.',
      'It reads data from the serial port.',
      'It resets the Arduino.',
    ],
    answer: 0,
  },
  {
    question: '2. Which function sends data from the Arduino to a connected computer and adds a new line character at the end?',
    options: [
      'Serial.print()',
      'Serial.read()',
      'Serial.available()',
      'Serial.println()',
    ],
    answer: 3,
  },
  {
    question: '3. What is a "baud rate" in serial communication?',
    options: [
      'a) The voltage level of the signal',
      'b) The number of bits transferred per second',
      'c) The type of cable used for connection',
      'd) The amount of data stored in memory',
    ],
    answer: 1,
  },
  {
    question: '4. If you want to check if your computer has sent any data to your Arduino that is ready to be read, which function would you use?',
    options: [
      'Serial.print()',
      'Serial.read()',
      'Serial.available()',
      'Serial.begin()',
    ],
    answer: 2,
  },
  {
    question: '5. Which function reads a single incoming character from the serial buffer?',
    options: [
      'a) Serial.print()',
      'b) Serial.read()',
      'c) Serial.available()',
      'd) Serial.println()',
    ],
    answer: 1,
  },
  {
    question: '6. Code Snippet 1: How often will "Hello World!" appear on a new line in the serial monitor?',
    options: [
      'Every 1 second',
      'Every 2 seconds',
      'Every 5 seconds',
      'Only once',
    ],
    answer: 1,
  },
  {
    question: '7. Code Snippet 2: What would the output look like on one line in the serial monitor?',
    options: [
      'a) Temperature: 25C',
      'b) Temperature:\n25\nC',
      'c) Temperature: 25 C',
      'd) 25 C',
    ],
    answer: 2,
  },
  {
    question: '8. Code Snippet 3: If this code runs for 2 seconds, what would the serial monitor output look like?',
    options: [
      'a) Value: 100\nValue: 100\nValue: 100\nValue: 100',
      'b) Value: 100Value: 100Value: 100Value: 100',
      'c) Value: 100 (only once)',
      'd) It will show an error.',
    ],
    answer: 1,
  },
  {
    question: "9. Code Snippet 4: If the user types the character 'A' and presses enter into the serial monitor, what will the Arduino likely print?",
    options: [
      'a) You typed: A',
      'b) You typed:\nA',
      'c) You typed:',
      'd) Nothing, as there is an error.',
    ],
    answer: 0,
  },
  {
    question: '10. Code Snippet 5: If you set your computer\'s serial monitor to a baud rate of 9600 for this code, what would happen?',
    options: [
      'a) The message "Sending data..." would appear correctly.',
      'b) The message would appear, but scrambled or unreadable.',
      'c) The Arduino would stop running the code.',
      'd) The monitor would automatically adjust to 57600.',
    ],
    answer: 1,
  },
];
  
// Add a Quiz component for single-select questions
const arduinoQuizQuestions = [
  {
    question: '1. What is an Arduino, primarily?',
    options: [
      'A. A mobile app for coding',
      'B. A physical computer mouse',
      'C. An open-source electronics platform',
      'D. A web browser extension',
    ],
    answer: 2,
  },
  {
    question: '2. What does "open source" mean for Arduino users?',
    options: [
      'A. The hardware is made of recycled materials',
      'B. It can only be used in schools',
      'C. Designs for hardware and software are publicly available',
      'D. It requires a paid license to access',
    ],
    answer: 2,
  },
  {
    question: '3. An Arduino board contains a microchip called a:',
    options: [
      'A. GPU',
      'B. CPU',
      'C. Microcontroller',
      'D. RAM',
    ],
    answer: 2,
  },
  {
    question: "4. Which of the following is a benefit of Arduino's large community?",
    options: [
      'A. Higher prices',
      'B. Less online content',
      'C. Lack of support',
      'D. Abundant tutorials and project help',
    ],
    answer: 3,
  },
  {
    question: '5. The function in an Arduino program that runs only once at the beginning is:',
    options: [
      'A. start()',
      'B. begin()',
      'C. void loop()',
      'D. void setup()',
    ],
    answer: 3,
  },
  {
    question: '6. Which function in an Arduino program runs repeatedly, forever, after the initial setup?',
    options: [
      'A. main()',
      'B. forever()',
      'C. void loop()',
      'D. repeat()',
    ],
    answer: 2,
  },
  {
    question: '7. Arduino connects the digital world (your code) with which other world?',
    options: [
      'A. Virtual reality',
      'B. Gaming',
      'C. Physical world',
      'D. Fantasy world',
    ],
    answer: 2,
  },
  {
    question: '8. Arduino can be used to control physical devices like LEDs and motors.',
    options: [
      'A. True',
      'B. False',
    ],
    answer: 0,
  },
  {
    question: '9. Which of these is NOT typically an application for Arduino?',
    options: [
      'A. Smart homes',
      'B. Robotics',
      'C. Word processing',
      'D. Sensor systems',
    ],
    answer: 2,
  },
  {
    question: '10. What aspect of Arduino helps keep its cost down and encourages innovation?',
    options: [
      'A. Paid-only content',
      'B. Closed-source software',
      'C. Government restrictions',
      'D. Open-source nature',
    ],
    answer: 3,
  },
];

function ArduinoQuiz() {
  const [answers, setAnswers] = useState<number[]>(Array(arduinoQuizQuestions.length).fill(null));
  const [checked, setChecked] = useState<boolean[]>(Array(arduinoQuizQuestions.length).fill(false));
  const [feedback, setFeedback] = useState<string[]>(Array(arduinoQuizQuestions.length).fill(null));

  const handleCheck = (idx: number) => {
    setChecked(c => c.map((v, i) => i === idx ? true : v));
    if (answers[idx] === arduinoQuizQuestions[idx].answer) {
      setFeedback(f => f.map((v, i) => i === idx ? 'correct' : v));
    } else {
      setFeedback(f => f.map((v, i) => i === idx ? 'incorrect' : v));
    }
  };

  return (
    <div className="bg-gray-900 border border-yellow-400/40 rounded-xl p-6 shadow-inner mt-10 mb-10">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">📝 Practice Quiz</h3>
      <form className="space-y-6">
        {arduinoQuizQuestions.map((q, idx) => (
          <div key={idx} className="mb-4">
            <div className="text-white font-medium mb-2">{q.question}</div>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oidx) => (
                <label key={oidx} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={opt}
                    checked={answers[idx] === oidx}
                    onChange={() => setAnswers(a => a.map((v, i) => i === idx ? oidx : v))}
                    className="accent-yellow-400"
                    disabled={checked[idx]}
                  />
                  <span className="text-gray-200">{opt}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 px-3 py-1 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
              onClick={() => handleCheck(idx)}
              disabled={answers[idx] === null || checked[idx]}
            >
              Check Answer
            </button>
            {checked[idx] && (
              <div className={`mt-2 font-bold ${feedback[idx] === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {feedback[idx] === 'correct' ? 'Correct!' : 'Incorrect'}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}

// Card component for day-wise view
function ArduinoDayCard({ day, title, summary, tags, image, onClick }: {
  day: string;
  title: string;
  summary: string;
  tags: string[];
  image: string;
  onClick: () => void;
}) {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (user) {
      checkCompletionStatus();
    }
  }, [user, day]);

  const checkCompletionStatus = async () => {
    try {
      const userData = await getUserProfile(user?.uid);
      if (userData?.progress?.arduino?.completedDays?.includes(day)) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error checking completion status:', error);
    }
  };
      return (
      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800 hover:shadow-2xl transition cursor-pointer flex flex-col relative" onClick={onClick}>
        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
          </div>
        )}
        
        <div className="h-36 w-full bg-gray-700 flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full" />
          ) : (
            <span className="text-4xl text-yellow-400">⚡</span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-yellow-400 text-gray-900 rounded px-2 py-1 font-semibold">Day {day}</span>
            {isCompleted && (
              <span className="text-xs bg-green-500 text-white rounded px-2 py-1 font-semibold">Completed</span>
            )}
          </div>
          <span className="text-lg font-semibold text-white mb-1">{title}</span>
          <span className="text-gray-300 text-sm mb-2 flex-1">{summary}</span>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags && tags.map(tag => (
              <span key={tag} className="bg-gray-800 text-gray-200 text-xs px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
}

const arduinoOverview = {
  title: 'Arduino Overview',
  summary: 'Start your journey with Arduino! Learn what Arduino is, why it’s popular, and how this course is structured.',
  tags: ['Overview', 'Getting Started'],
  image: '../public/pic1.png',
  content:
    '# Welcome to Arduino!\n\n' +
    'Arduino is an open-source electronics platform based on easy-to-use hardware and software. ' +
    'It’s intended for anyone making interactive projects. This course will guide you through the basics and beyond.\n\n' +
    '---\n\n' +
    'Click on a day to start learning specific topics!'
};

const ArduinoDetail = ({ onBack, dayIdx, overview = null }: {
  onBack: () => void;
  dayIdx: number;
  overview?: any;
}) => {
  const { user } = useAuth();
  const item = overview || arduinoDays[dayIdx];
  
  const handleDayComplete = async () => {
    if (user && item.day) {
      try {
        await markArduinoDayComplete(user.uid, item.day);
        await updateCurrentArduinoDay(user.uid, String(Number(item.day) + 1));
      } catch (error) {
        console.error('Error marking day complete:', error);
      }
    }
  };
  return (
  <div className="max-w-3xl mx-auto py-10 px-5">
    <button
      onClick={onBack}
      className="mb-6 px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
    >
        ← Back to Days
    </button>
    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">
      ⚡ Arduino Day-wise Plan
    </h2>
    <div className="space-y-10">
        {[item].map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-950 border border-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 border-b border-yellow-300 flex items-center gap-2">
              <span className="text-gray-900 font-bold text-lg">{item.day ? `Day ${item.day}` : 'Overview'}</span>
            <span className="text-gray-900 font-semibold">{item.title}</span>
          </div>

          {/* Content */}
          <div className="bg-gray-900 px-6 py-6">
              <div className="text-gray-200 prose prose-invert max-w-none mb-8 leading-relaxed">
              <ReactMarkdown
                children={item.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                  components={{
                    img: ({node, ...props}) => (
                      <div className="flex justify-center my-6">
                        <img
                          {...props}
                          className="rounded-xl border border-gray-700 shadow-lg max-w-md w-full object-contain"
                          alt={props.alt}
                        />
                      </div>
                    ),
                    code({node, inline, className, children, ...props}: any) {
                      return !inline ? (
                        <pre className="bg-gray-900 border border-gray-700 rounded-xl p-4 my-4 overflow-x-auto text-sm">
                          <code className="font-mono text-green-200">{children}</code>
                        </pre>
                      ) : (
                        <code className="bg-gray-800 rounded px-1.5 py-0.5 text-green-300 font-mono text-sm">{children}</code>
                      );
                    },
                  }}
              />
            </div>
              {/* Quiz Section (for each day if present) */}
              {item.quiz && (
                <ArduinoQuizCustom questions={item.quiz} dayId={item.day} />
              )}
              {/* Quiz Section (only for days, not overview, fallback to day 1 quiz) */}
              {item.day && !item.quiz && <ArduinoQuiz />}
              
              {/* Mark Complete Button */}
              {item.day && user && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleDayComplete}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:scale-105"
                  >
                    ✅ Mark Day {item.day} Complete
                  </button>
                  <p className="text-gray-400 text-sm mt-2">
                    Complete this day to earn 25 XP and unlock the next module!
                  </p>
                </div>
              )}
              
              {/* Questions (if any) */}
              {item.day && item.questions && item.questions.length > 0 && (
              <div className="mb-8 bg-gray-800 border border-pink-400/40 rounded-xl p-6 shadow-inner">
                <h3 className="text-xl font-bold text-pink-400 mb-4">📚 Practice Questions</h3>
                <ul className="space-y-5">
                  {item.questions.map((q, i) => (
                    <li
                      key={i}
                      className="bg-gray-900 border border-gray-700 rounded-lg p-4"
                    >
                      <div className="text-white font-medium mb-2">{q.question}</div>
                      {q.code && (
                        <pre className="bg-gray-800 text-green-200 text-sm rounded p-4 overflow-x-auto border border-gray-700">
                          <code>{q.code}</code>
                        </pre>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>
        ))}
      </div>
                </div>
  );
};

// Custom quiz component for per-day quizzes
function ArduinoQuizCustom({ questions, dayId }: { questions: Array<{ question: string; options: string[]; answer: number }>; dayId?: string }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(null));
  const [checked, setChecked] = useState<boolean[]>(Array(questions.length).fill(false));
  const [feedback, setFeedback] = useState<string[]>(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpNotification, setShowXpNotification] = useState(false);

  const handleCheck = async (idx: number) => {
    setChecked(c => c.map((v, i) => i === idx ? true : v));
    if (answers[idx] === questions[idx].answer) {
      setFeedback(f => f.map((v, i) => i === idx ? 'correct' : v));
    } else {
      setFeedback(f => f.map((v, i) => i === idx ? 'incorrect' : v));
    }

    // Check if all questions are answered
    const allAnswered = answers.every(answer => answer !== null);
    if (allAnswered && !quizCompleted && user) {
      setQuizCompleted(true);
      
      // Calculate score
      const correctAnswers = answers.filter((answer, index) => answer === questions[index].answer).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      
      // Save quiz score and get XP earned
      try {
        const xp = await updateQuizScore(user.uid, `arduino-day-${dayId}`, score);
        setXpEarned(xp);
        setShowXpNotification(true);
        
        // Hide XP notification after 3 seconds
        setTimeout(() => setShowXpNotification(false), 3000);
      } catch (error) {
        console.error('Error saving quiz score:', error);
      }
    }
  };

  return (
    <div className="bg-gray-900 border border-yellow-400/40 rounded-xl p-6 shadow-inner mt-10 mb-10 relative">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">📝 Practice Quiz</h3>
      
      {/* XP Notification */}
      {showXpNotification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10"
        >
          <Zap className="w-4 h-4" />
          <span className="font-bold">+{xpEarned} XP!</span>
        </motion.div>
      )}
      
      <form className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4">
            <div className="text-white font-medium mb-2">{q.question}</div>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oidx) => (
                <label key={oidx} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={opt}
                    checked={answers[idx] === oidx}
                    onChange={() => setAnswers(a => a.map((v, i) => i === idx ? oidx : v))}
                    className="accent-yellow-400"
                    disabled={checked[idx]}
                  />
                  <span className="text-gray-200">{opt}</span>
                </label>
              ))}
                  </div>
            <button
              type="button"
              className="mt-2 px-3 py-1 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
              onClick={() => handleCheck(idx)}
              disabled={answers[idx] === null || checked[idx]}
            >
              Check Answer
            </button>
            {checked[idx] && (
              <div className={`mt-2 font-bold ${feedback[idx] === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {feedback[idx] === 'correct' ? 'Correct!' : 'Incorrect'}
              </div>
            )}
        </div>
      ))}
      </form>
  </div>
);
}

const CoursePage = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  if (selectedDay !== null) {
    return <ArduinoDetail onBack={() => setSelectedDay(null)} dayIdx={selectedDay} />;
  }

  if (selectedCourse === 'arduino') {
    return (
      <div className="max-w-6xl mx-auto py-10 px-5">
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-6 px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition flex items-center gap-2"
        >
          ← Back to Courses
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Progress Tracker */}
          <div className="lg:col-span-1">
            <ProgressTracker />
          </div>
          
          {/* Arduino Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-2">
              ⚡ Arduino Learning Path
            </h1>
            <p className="text-brown-300 mb-8 text-lg">
              Master Arduino programming step by step. Complete daily modules, take quizzes, and earn XP points as you progress!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {arduinoDays.map((item, idx) => (
                <ArduinoDayCard
                  key={idx}
                  day={item.day}
                  title={item.title}
                  summary={item.summary}
                  tags={item.tags}
                  image={item.image}
                  onClick={() => setSelectedDay(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-2">
        🎓 Learning Courses
      </h1>
      <p className="text-gray-300 mb-8 text-lg">
        Choose a course to start your learning journey. Track your progress, earn XP, and unlock achievements!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Arduino Course Card */}
        <div 
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform shadow-lg"
          onClick={() => setSelectedCourse('arduino')}
        >
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-white mb-2">Arduino Programming</h3>
          <p className="text-white/90 mb-4">Learn Arduino from basics to advanced projects. 5-day structured course with hands-on exercises.</p>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">5 modules</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">Beginner</span>
          </div>
        </div>

        {/* Coming Soon Cards */}
        <div className="bg-gray-800 rounded-xl p-6 opacity-60">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">Embedded Systems</h3>
          <p className="text-gray-400 mb-4">Advanced embedded programming and system design.</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Coming Soon</span>
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">Advanced</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 opacity-60">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">IoT Development</h3>
          <p className="text-gray-400 mb-4">Internet of Things and connected device programming.</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Coming Soon</span>
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">Intermediate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;


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
    image: '',
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
      "> 💡 Arduino's popularity stems from several key advantages:\n" +
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
     
      day: '4',
      title: 'Variables and Data Types',
      
      summary: 'Learn how to store, manage, and manipulate values in Arduino with variables and data types. This is the foundation of any logic you’ll write!',
      tags: ['Beginner', 'Variables', 'Data Types', 'Memory', 'Arduino'],
      image: '/pic4.png',
      content:
        
      '# 🧠 **Variables and Data Types**\n' +
      '\n' +
      '## 💡 **What Are Variables?**\n' +
      'Variables are containers that store data values in your Arduino programs. Think of them as labeled boxes where you can keep different types of information. Each variable has a name and can hold one piece of data at a time.\n' +
      '\n' +
      '## 💡 **Why Do We Need Variables?**\n' +
      '- •Store sensor readings\n' +
      '- •Keep track of pin numbers\n' +
      '- •Save calculation results\n' +
      '- •Store temporary values during program execution\n' +
      '\n' +
      '## 💡 **Variable Declaration Syntax**\n' +
      '\n' +
      '`dataType variableName = value;`\n' +
      '\n' +
      '### 📝 **Basic Rules for Variable Names**\n' +
      '- •Must start with a letter or underscore\n' +
      '- •Can contain letters, numbers, and underscores\n' +
      '- •Cannot contain spaces or special characters\n' +
      '- •Case sensitive *myVar* and *myvar* are different\n' +
      '- •Cannot use Arduino reserved words\n' +
      '\n' +
      '## 💡 **Arduino Data Types:**\n' +
      '\n' +
      '**🔢 int (Integer):**\n' +
      'Stores whole numbers from -32,768 to 32,767. Used for counting, pin numbers, simple calculations.\n' +
      '```arduino\n' +
      'int ledPin = 13;\n' +
      'int sensorValue = 1023;\n' +
      'int temperature = 25;\n' +
      '```\n' +
      '\n' +
      '**🌡️ float (Floating Point):**\n' +
      'Stores decimal numbers with precision up to 6–7 digits. Used for measurements and percentages.\n' +
      '```arduino\n' +
      'float voltage = 3.14;\n' +
      'float temperature = 23.5;\n' +
      'float percentage = 87.6;\n' +
      '```\n' +
      '\n' +
      '**🔤 char (Character):**\n' +
      'Stores a single character or small integer (-128 to 127).\n' +
      '```arduino\n' +
      "char grade = 'A';\n" +
      "char symbol = '*';\n" +
      'char smallNumber = 100;\n' +
      '```\n' +
      '\n' +
      '**🔘 bool (Boolean):**\n' +
      'Stores true or false. Used for on/off states, flags.\n' +
      '```arduino\n' +
      'bool ledState = true;\n' +
      'bool buttonPressed = false;\n' +
      'bool systemReady = true;\n' +
      '```\n' +
      '\n' +
      '**🔢 long (Long Integer):**\n' +
      'Stores large whole numbers (-2,147,483,648 to 2,147,483,647).\n' +
      '```arduino\n' +
      'long milliseconds = 1000000;\n' +
      'long distance = 384400;\n' +
      'long counter = 50000;\n' +
      '```\n' +
      '\n' +
      '**🧮 byte (Byte):**\n' +
      'Stores small numbers (0 to 255). Memory efficient.\n' +
      '```arduino\n' +
      'byte brightness = 255;\n' +
      'byte pwmValue = 128;\n' +
      'byte arrayIndex = 10;\n' +
      '```\n' +
      '\n' +
      '## **💡Examples**\n' +
      '\n' +
      '### **🔍 Sensor Data Storage**\n' +
      '```arduino\n' +
      'int lightSensor = 512; // Light sensor reading\n' +
      'float voltage = 2.5; // Calculated voltage\n' +
      'bool dayTime = true; // Is it day or night?\n' +
      '```\n' +
      '\n' +
      '### **💡 LED Control**\n' +
      '```arduino\n' +
      'int redPin = 9; // Red LED pin\n' +
      'int greenPin = 10; // Green LED pin\n' +
      'byte redBrightness = 200; // Red LED brightness\n' +
      'byte greenBrightness = 50; // Green LED brightness\n' +
      '```\n' +
      '\n' +
      '### **🌡️ Temperature Monitoring**\n' +
      '```arduino\n' +
      'float currentTemp = 22.7; // Current temperature\n' +
      'float maxTemp = 30.0; // Maximum allowed temperature\n' +
      'bool overheated = false; // Temperature status\n' +
      '```\n',
    
      questions: [],
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

    {
      day: '6',
      title: 'Control Structures in Arduino',
      summary: 'Understand how control structures like if, else, else if, and switch help Arduino make decisions. Learn their syntax, logic flow, and use cases with real code examples like temperature monitoring, sensor range checks, and pattern display.',
      tags: ['Control Structures', 'Decision Making', 'Arduino Programming', 'Beginner'],
      image: '/pic6.png',
      content:
        '# 🧠 **Control Structures**\n' +
        '\n' +
        '## 💡 **What Are Control Structures?**\n' +
        'Control structures are programming tools that allow your Arduino to make decisions based on conditions.\n' +
        'Instead of executing code line by line, control structures let you choose which parts of code to run\n' +
        'based on sensor readings, user input, or calculated values.\n' +
        '\n' +
        '## 💡 **Why Control Structures Matter?**\n' +
        '- • Make your Arduino respond to different situations.\n' +
        '- • Create interactive and smart behaviors.\n' +
        '- • Handle multiple scenarios automatically.\n' +
        '- • Build logic based decision systems.\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🔹 **The if Statement:**\n' +
        'Executes code only when a specific condition is true.\n' +
        '\n' +
        '### **Syntax**\n' +
        '```arduino\n' +
        'if (condition) {\n' +
        '  // Code to execute when condition is true\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '### **Examples**\n' +
        '**Basic if statement**\n' +
        '```arduino\n' +
        'int temperature = 30;\n' +
        'if (temperature > 25) {\n' +
        '  Serial.println("Temperature is high");\n' +
        '}\n' +
        '```\n' +
        '**If with multiple statements**\n' +
        '```arduino\n' +
        'int sensorValue = 800;\n' +
        'if (sensorValue > 500) {\n' +
        '  Serial.println("High reading detected");\n' +
        '  Serial.println("Warning: Sensor value exceeded threshold");\n' +
        '}\n' +
        '```\n' +
        '**If with complex condition**\n' +
        '```arduino\n' +
        'float voltage = 4.5;\n' +
        'bool systemReady = true;\n' +
        'if ((voltage >= 3.0) && systemReady) {\n' +
        '  Serial.println("System can power on");\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🔸 **The else Statement:**\n' +
        'Provides an alternative when the `if` condition is false.\n' +
        '\n' +
        '### **Syntax**\n' +
        '```arduino\n' +
        'if (condition) {\n' +
        '  // Code when condition is true\n' +
        '} else {\n' +
        '  // Code when condition is false\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '### **Examples**\n' +
        '**Basic if-else**\n' +
        '```arduino\n' +
        'int lightLevel = 300;\n' +
        'if (lightLevel < 400) {\n' +
        '  Serial.println("It\'s dark - need light");\n' +
        '} else {\n' +
        '  Serial.println("It\'s bright - no light needed");\n' +
        '}\n' +
        '```\n' +
        '**If-else with calculation**\n' +
        '```arduino\n' +
        'int batteryVoltage = 3200;  // in millivolts\n' +
        'if (batteryVoltage >= 3700) {\n' +
        '  Serial.println("Battery Good");\n' +
        '} else {\n' +
        '  Serial.println("Battery Low");\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🔹 **The else if Statement:**\n' +
        'Used to check multiple conditions sequentially.\n' +
        '\n' +
        '### **Syntax**\n' +
        '```arduino\n' +
        'if (condition1) {\n' +
        '  // Code for condition1\n' +
        '} else if (condition2) {\n' +
        '  // Code for condition2\n' +
        '} else {\n' +
        '  // Code for no condition is true\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '### **Examples**\n' +
        '**Multiple Temperature Ranges**\n' +
        '```arduino\n' +
        'float temp = 22.5;\n' +
        'if (temp < 15.0) {\n' +
        '  Serial.println("Cold");\n' +
        '} else if (temp < 25.0) {\n' +
        '  Serial.println("Comfortable");\n' +
        '} else if (temp < 35.0) {\n' +
        '  Serial.println("Warm");\n' +
        '} else {\n' +
        '  Serial.println("Hot");\n' +
        '}\n' +
        '```\n' +
        '**Sensor Range Classification**\n' +
        '```arduino\n' +
        'int sensorReading = 650;\n' +
        'if (sensorReading < 200) {\n' +
        '  Serial.println("Very Low");\n' +
        '} else if (sensorReading < 500) {\n' +
        '  Serial.println("Low");\n' +
        '} else if (sensorReading < 800) {\n' +
        '  Serial.println("Medium");\n' +
        '} else {\n' +
        '  Serial.println("High");\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🎚️ **The switch Statement:**\n' +
        'Use when checking a variable against multiple specific values.\n' +
        '\n' +
        '### **Syntax**\n' +
        '```arduino\n' +
        'switch (variable) {\n' +
        '  case value1:\n' +
        '    // Code for value1\n' +
        '    break;\n' +
        '  case value2:\n' +
        '    // Code for value2\n' +
        '    break;\n' +
        '  default:\n' +
        '    // Code if no match\n' +
        '    break;\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '### **Examples**\n' +
        '**Display Pattern Messages**\n' +
        '```arduino\n' +
        'int pattern = 2;\n' +
        'switch (pattern) {\n' +
        '  case 1:\n' +
        '    Serial.println("Pattern 1: Single Light");\n' +
        '    break;\n' +
        '  case 2:\n' +
        '    Serial.println("Pattern 2: Double Light");\n' +
        '    break;\n' +
        '  case 3:\n' +
        '    Serial.println("Pattern 3: All OFF");\n' +
        '    break;\n' +
        '  default:\n' +
        '    Serial.println("Unknown pattern");\n' +
        '    break;\n' +
        '}\n' +
        '```\n' +
        '**System Mode Selection**\n' +
        '```arduino\n' +
        "char systemMode = 'M';\n" +
        'switch (systemMode) {\n' +
        "  case 'L':\n" +
        '    Serial.println("Low Power Mode Selected");\n' +
        '    break;\n' +
        "  case 'M':\n" +
        '    Serial.println("Medium Power Mode Selected");\n' +
        '    break;\n' +
        "  case 'H':\n" +
        '    Serial.println("High Power Mode Selected");\n' +
        '    break;\n' +
        "  case 'S':\n" +
        '    Serial.println("System Off Mode Selected");\n' +
        '    break;\n' +
        '  default:\n' +
        '    Serial.println("Invalid mode setting");\n' +
        '    break;\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## ✅ **When to Use Which Control Statement**\n' +
        '\n' +
        '- **Use if:**\n' +
        '  - • Simple true/false decisions.\n' +
        '  - • Single condition checking.\n' +
        '  - • Range comparisons (>, <, >=, <=).\n' +
        '\n' +
        '- **Use if else:**\n' +
        '  - • Two possible outcomes.\n' +
        '  - • Binary decisions (on/off, yes/no).\n' +
        '\n' +
        '- **Use if else if:**\n' +
        '  - • Multiple range checks.\n' +
        '  - • Sequential condition testing.\n' +
        '  - • Overlapping ranges.\n' +
        '\n' +
        '- **Use switch:**\n' +
        '  - • Comparing against exact values.\n' +
        '  - • Multiple discrete options.\n' +
        '  - • Menu-like selections.\n' +
        '  - • Character or integer matching.\n',
      questions: [],
    
    
  },
  {
    day: '7',
    title: 'Loops in Arduino',
    summary: 'Understand how loops help repeat tasks in Arduino without writing code over and over. Explore `for`, `while`, and `do while` loops with real world examples like counters, retry attempts, and automation tasks. Perfect for controlling hardware behavior efficiently.',
    tags: ['Loops', 'Iteration', 'Control Flow', 'Arduino Programming', 'Beginner'],
    image: '/pic7.png',
    content:
      '# 🔁 **Loops**\n' +
      '\n' +
      'Loops are fundamental programming structures that allow your Arduino to repeat a block of code multiple times. They are incredibly powerful for tasks that involve repetition, which is very common in interactive electronics.\n' +
      '\n' +
      '## 💡 **Why Use Loops?**\n' +
      '- • **Efficiency** – Avoid writing repetitive code, making your program shorter and easier to manage.\n' +
      '- • **Automation** – Perform actions many times without manual intervention.\n' +
      '- • **Dynamic Behavior** – Handle situations where you don’t know how many times a task needs to repeat.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔢 **Types of Loops**\n' +
      'Arduino supports three types of loops:\n' +
      '- • for\n' +
      '- • while\n' +
      '- • do while\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔄 **for Loop**\n' +
      'Use when you know how many times to repeat the code.\n' +
      '\n' +
      '### **Syntax**\n' +
      '```arduino\n' +
      'for (initialization; condition; increment/decrement) {\n' +
      '  // Code to be repeated\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### **Steps**\n' +
      '• 1. Initialization – Run once (e.g., int i = 0;).\n' +
      '• 2. Condition – Checked before each run (e.g., i < 5).\n' +
      '• 3. Evaluation – Runs the code block.\n' +
      '• 4. Increment – After each loop, increase or decrease counter.\n' +
      '\n' +
      '### **Example**\n' +
      '```arduino\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Starting for loop...");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  for (int i = 0; i < 5; i++) {\n' +
      '    Serial.print("Count: ");\n' +
      '    Serial.println(i);\n' +
      '  }\n' +
      '  Serial.println("For loop finished!");\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔁 **while Loop**\n' +
      'Use when the number of repetitions is unknown. Runs as long as the condition is true.\n' +
      '\n' +
      '### **Syntax**\n' +
      '```arduino\n' +
      'while (condition) {\n' +
      '  // Code to be repeated\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### **Example**\n' +
      '```arduino\n' +
      'int currentCount = 0;\n' +
      'const int MAX_COUNT = 3;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Starting while loop...");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  currentCount = 0;\n' +
      '  while (currentCount < MAX_COUNT) {\n' +
      '    Serial.print("Current while count: ");\n' +
      '    Serial.println(currentCount);\n' +
      '    currentCount = currentCount + 1;\n' +
      '  }\n' +
      '  Serial.println("While loop finished!");\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔂 **do while Loop**\n' +
      'Runs the loop at least once before checking the condition.\n' +
      '\n' +
      '### **Syntax**\n' +
      '```arduino\n' +
      'do {\n' +
      '  // Code to be repeated\n' +
      '} while (condition);\n' +
      '```\n' +
      '\n' +
      '### **Example**\n' +
      '```arduino\n' +
      'int attempt = 0;\n' +
      'bool success = false;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Starting do-while loop...");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  attempt = 0;\n' +
      '  success = false;\n' +
      '  do {\n' +
      '    Serial.print("Attempt number: ");\n' +
      '    Serial.println(attempt);\n' +
      '    attempt = attempt + 1;\n' +
      '    if (attempt >= 2) {\n' +
      '      success = true;\n' +
      '    }\n' +
      '  } while (success == false && attempt < 5);\n' +
      '  Serial.println("Do-while loop finished!");\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  
  {
    day: '7',
    title: 'Loops in Arduino',
    summary: 'Understand how loops help repeat tasks in Arduino without writing code over and over. Explore `for`, `while`, and `do while` loops with real world examples like counters, retry attempts, and automation tasks. Perfect for controlling hardware behavior efficiently.',
    tags: ['Loops', 'Iteration', 'Control Flow', 'Arduino Programming', 'Beginner'],
    image: '/pic7.png',
    content:
      '# 🔁 **Loops**\n' +
      '\n' +
      'Loops are fundamental programming structures that allow your Arduino to repeat a block of code multiple times. They are incredibly powerful for tasks that involve repetition, which is very common in interactive electronics.\n' +
      '\n' +
      '## 💡 **Why Use Loops?**\n' +
      '- • **Efficiency** – Avoid writing repetitive code, making your program shorter and easier to manage.\n' +
      '- • **Automation** – Perform actions many times without manual intervention.\n' +
      '- • **Dynamic Behavior** – Handle situations where you don’t know how many times a task needs to repeat.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔢 **Types of Loops**\n' +
      'Arduino supports three types of loops:\n' +
      '- • for\n' +
      '- • while\n' +
      '- • do while\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔄 **for Loop**\n' +
      'Use when you know how many times to repeat the code.\n' +
      '\n' +
      '### **Syntax**\n' +
      '```arduino\n' +
      'for (initialization; condition; increment/decrement) {\n' +
      '  // Code to be repeated\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### **Steps**\n' +
      '• 1. Initialization – Run once (e.g., int i = 0;).\n' +
      '• 2. Condition – Checked before each run (e.g., i < 5).\n' +
      '• 3. Evaluation – Runs the code block.\n' +
      '• 4. Increment – After each loop, increase or decrease counter.\n' +
      '\n' +
      '### **Example**\n' +
      '```arduino\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Starting for loop...");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  for (int i = 0; i < 5; i++) {\n' +
      '    Serial.print("Count: ");\n' +
      '    Serial.println(i);\n' +
      '  }\n' +
      '  Serial.println("For loop finished!");\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔁 **while Loop**\n' +
      'Use when the number of repetitions is unknown. Runs as long as the condition is true.\n' +
      '\n' +
      '### **Syntax**\n' +
      '```arduino\n' +
      'while (condition) {\n' +
      '  // Code to be repeated\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### **Example**\n' +
      '```arduino\n' +
      'int currentCount = 0;\n' +
      'const int MAX_COUNT = 3;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Starting while loop...");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  currentCount = 0;\n' +
      '  while (currentCount < MAX_COUNT) {\n' +
      '    Serial.print("Current while count: ");\n' +
      '    Serial.println(currentCount);\n' +
      '    currentCount = currentCount + 1;\n' +
      '  }\n' +
      '  Serial.println("While loop finished!");\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔂 **do while Loop**\n' +
      'Runs the loop at least once before checking the condition.\n' +
      '\n' +
      '### **Syntax**\n' +
      '```arduino\n' +
      'do {\n' +
      '  // Code to be repeated\n' +
      '} while (condition);\n' +
      '```\n' +
      '\n' +
      '### **Example**\n' +
      '```arduino\n' +
      'int attempt = 0;\n' +
      'bool success = false;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Starting do-while loop...");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  attempt = 0;\n' +
      '  success = false;\n' +
      '  do {\n' +
      '    Serial.print("Attempt number: ");\n' +
      '    Serial.println(attempt);\n' +
      '    attempt = attempt + 1;\n' +
      '    if (attempt >= 2) {\n' +
      '      success = true;\n' +
      '    }\n' +
      '  } while (success == false && attempt < 5);\n' +
      '  Serial.println("Do-while loop finished!");\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  {
    day: '9',
    title: 'Digital Pins in Arduino',
    summary: 'Understand how digital pins work on an Arduino board. Learn how to configure pins as INPUT or OUTPUT, use functions like pinMode, digitalWrite, and digitalRead, and see how to blink an LED using digital signals.',
    tags: ['Digital Pins', 'Input Output', 'Arduino Programming', 'Beginner'],
    image: '/pic9.png',
    content:
      '# 🔌 **Digital Pins**\n' +
      '\n' +
      '## 💡 **What are Digital Pins?**\n' +
      'Digital pins are the numbered pins (0 to 13) on your Arduino board. Even the analog pins (A0 to A5) can be used as digital pins!\n' +
      '\n' +
      '**States of a Digital Pin:**\n' +
      '- HIGH → ON (Usually 5V)\n' +
      '- LOW → OFF (0V or GND)\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔧 **pinMode() – Set Pin Direction**\n' +
      'Before using a digital pin, you must **define** whether it is for **input** (read) or **output** (write).\n' +
      '\n' +
      '### 🟢 OUTPUT Mode\n' +
      'Used to send a signal (like turning on an LED).\n' +
      '\n' +
      '### 🔵 INPUT Mode\n' +
      'Used to read a signal (like checking if a button is pressed).\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## ⚙️ **Key Functions**\n' +
      '\n' +
      '### 🔸 pinMode(pin, mode)\n' +
      'Configures the pin as INPUT or OUTPUT\n' +
      '- • pin: pin number (e.g., 13)\n' +
      '- • mode: INPUT or OUTPUT\n' +
      '\n' +
      '```arduino\n' +
      'void setup() {\n' +
      '  pinMode(13, OUTPUT);  // Digital pin 13 sends signal\n' +
      '  pinMode(2, INPUT);    // Digital pin 2 listens for input\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### 🔸 digitalWrite(pin, value)\n' +
      'Sends a signal from an OUTPUT pin.\n' +
      '- • pin: pin number (e.g., 13)\n' +
      '- • value: HIGH (5V) or LOW (0V)\n' +
      '\n' +
      '```arduino\n' +
      'digitalWrite(13, HIGH);  // Turn pin 13 ON\n' +
      'digitalWrite(13, LOW);   // Turn pin 13 OFF\n' +
      '```\n' +
      '\n' +
      '### 🔸 digitalRead(pin)\n' +
      'Reads signal from an INPUT pin.\n' +
      'Returns either HIGH or LOW\n' +
      '- • pin: pin number (e.g., 13)\n' +
      '\n' +
      '```arduino\n' +
      'int buttonState = digitalRead(2);  // Read pin 2\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Example: LED Blinking with Serial Monitor**\n' +
      '```arduino\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("LED Blinker Started!");\n' +
      '  pinMode(13, OUTPUT);  // LED connected to pin 13\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  digitalWrite(13, HIGH);  // Turn ON LED\n' +
      '  Serial.println("LED is ON");\n' +
      '  delay(500);\n' +
      '  \n' +
      '  digitalWrite(13, LOW);   // Turn OFF LED\n' +
      '  Serial.println("LED is OFF");\n' +
      '  delay(500);\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  {
    day: '9',
    title: 'Digital Pins in Arduino',
    summary: 'Understand how digital pins work on an Arduino board. Learn how to configure pins as INPUT or OUTPUT, use functions like pinMode, digitalWrite, and digitalRead, and see how to blink an LED using digital signals.',
    tags: ['Digital Pins', 'Input Output', 'Arduino Programming', 'Beginner'],
    image: '/pic9.png',
    content:
      '# 🔌 **Digital Pins**\n' +
      '\n' +
      '## 💡 **What are Digital Pins?**\n' +
      'Digital pins are the numbered pins (0 to 13) on your Arduino board. Even the analog pins (A0 to A5) can be used as digital pins!\n' +
      '\n' +
      '**States of a Digital Pin:**\n' +
      '- HIGH → ON (Usually 5V)\n' +
      '- LOW → OFF (0V or GND)\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔧 **pinMode() – Set Pin Direction**\n' +
      'Before using a digital pin, you must **define** whether it is for **input** (read) or **output** (write).\n' +
      '\n' +
      '### 🟢 OUTPUT Mode\n' +
      'Used to send a signal (like turning on an LED).\n' +
      '\n' +
      '### 🔵 INPUT Mode\n' +
      'Used to read a signal (like checking if a button is pressed).\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## ⚙️ **Key Functions**\n' +
      '\n' +
      '### 🔸 pinMode(pin, mode)\n' +
      'Configures the pin as INPUT or OUTPUT\n' +
      '- • pin: pin number (e.g., 13)\n' +
      '- • mode: INPUT or OUTPUT\n' +
      '\n' +
      '```arduino\n' +
      'void setup() {\n' +
      '  pinMode(13, OUTPUT);  // Digital pin 13 sends signal\n' +
      '  pinMode(2, INPUT);    // Digital pin 2 listens for input\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### 🔸 digitalWrite(pin, value)\n' +
      'Sends a signal from an OUTPUT pin.\n' +
      '- • pin: pin number (e.g., 13)\n' +
      '- • value: HIGH (5V) or LOW (0V)\n' +
      '\n' +
      '```arduino\n' +
      'digitalWrite(13, HIGH);  // Turn pin 13 ON\n' +
      'digitalWrite(13, LOW);   // Turn pin 13 OFF\n' +
      '```\n' +
      '\n' +
      '### 🔸 digitalRead(pin)\n' +
      'Reads signal from an INPUT pin.\n' +
      'Returns either HIGH or LOW\n' +
      '- • pin: pin number (e.g., 13)\n' +
      '\n' +
      '```arduino\n' +
      'int buttonState = digitalRead(2);  // Read pin 2\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Example: LED Blinking with Serial Monitor**\n' +
      '```arduino\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("LED Blinker Started!");\n' +
      '  pinMode(13, OUTPUT);  // LED connected to pin 13\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  digitalWrite(13, HIGH);  // Turn ON LED\n' +
      '  Serial.println("LED is ON");\n' +
      '  delay(500);\n' +
      '  \n' +
      '  digitalWrite(13, LOW);   // Turn OFF LED\n' +
      '  Serial.println("LED is OFF");\n' +
      '  delay(500);\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  {
    day: '11',
    title: 'Debouncing Techniques',
    summary: 'Understand what button bounce is, why it causes false triggers in Arduino, and how to fix it using software debounce methods like delay(). Learn the role of mechanical bounce and how to reliably detect button presses.',
    tags: ['Debounce', 'Digital Input', 'Buttons', 'Arduino', 'Beginner'],
    image: '/pic11.png',
    content:
      '# 🛑 **Debouncing Techniques**\n' +
      '\n' +
      'Digital input pins allow Arduino to "read" or "sense" whether an electrical signal on that pin is HIGH (ON, usually 5V) or LOW (OFF, usually 0V). This is perfect for simple input devices like buttons and switches, which are either open or closed.\n' +
      '\n' +
      '## 💡 **How Buttons and Switches Work**\n' +
      'A button or a simple switch acts like a gate for electricity.\n' +
      '\n' +
      '- When a button is not pressed (open), it breaks the connection, and no electricity flows through it.\n' +
      '- When a button is pressed (closed), it completes the connection, allowing electricity to flow.\n' +
      '\n' +
      'By connecting a button to a digital input pin, your Arduino can detect when this connection is made or broken.\n' +
      '\n' +
      '## 💡 **What is Bounce?**\n' +
      'When you press a mechanical button or flip a switch, the metal contacts inside don\'t connect or disconnect perfectly cleanly. Instead, they literally "bounce" against each other a few times before settling into a stable ON or OFF state.\n' +
      '\n' +
      '## 💡 **Why is Bounce a Problem for Arduino?**\n' +
      'Arduino is incredibly fast. When it reads a digital pin, it samples the voltage thousands or millions of times per second. If a button "bounces" from LOW to HIGH and back several times within a few milliseconds (even if you only pressed it once), your Arduino will see each of those rapid changes as separate presses or releases.\n' +
      '\n' +
      '**Example:** you press a button once.\n' +
      '\n' +
      '**Arduino sees:** LOW, HIGH, LOW, HIGH, LOW, HIGH, LOW... then finally LOW stable.\n' +
      '\n' +
      '**Result:** Code might think you pressed the button three or four times, even though you only pressed it once.\n' +
      '\n' +
      '## 💡 **Debouncing**\n' +
      'Debouncing is the technique used to filter out these unwanted, rapid fluctuations caused by mechanical bounce, ensuring that a single physical press or release is registered as only one stable event.\n' +
      '\n' +
      'There are two main approaches:\n' +
      '- **Hardware Debouncing**: Adding physical components like capacitors and resistors to your circuit to smooth out the electrical signal before it even reaches the Arduino pin.\n' +
      '- **Software Debouncing**: Writing code that "waits out" the bounce period, ignoring any quick, unstable changes. This is often simpler for beginners and doesn\'t require extra components.\n' +
      '\n' +
      '### 🕒 **delay() Method**\n' +
      'Most button bounces settle within 20 to 50 milliseconds. So, adding a delay(50) after an initial button state change is a common and effective debouncing method for many applications.\n' +
      '\n' +
      '### ✅ **Example:**\n' +
      '```arduino\n' +
      'const int buttonPin = 2;\n' +
      'const int ledPin = 13;\n' +
      'int buttonState = 0;\n' +
      '\n' +
      'void setup() {\n' +
      '  pinMode(buttonPin, INPUT);\n' +
      '  pinMode(ledPin, OUTPUT);\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  if (digitalRead(buttonPin) == LOW) {      // Button pressed (if using INPUT_PULLUP)\n' +
      '    delay(50);                              // Debounce delay, typically 20-50ms\n' +
      '    if (digitalRead(buttonPin) == LOW) {    // Still pressed after delay = valid press\n' +
      '      digitalWrite(ledPin, !digitalRead(ledPin)); // Toggle LED\n' +
      '      while (digitalRead(buttonPin) == LOW); // Wait for release (simple lockout)\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '```\n',  
    questions: [],
  },
  
  {
    day: '12',
    title: 'Digital Logic Gates',
    summary: 'Learn how to simulate logic gates like AND, OR, NOT, and XOR in Arduino using basic digital input pins and conditional statements. Includes truth tables and practical code examples.',
    tags: ['Logic Gates', 'Digital Logic', 'Arduino Programming', 'AND OR NOT XOR'],
    image: '/pic12.png',
    content:
      '# 🔢 **Digital Logic Gates**\n' +
      '\n' +
      'Digital logic gates are the fundamental building blocks of all digital circuits. They take one or more digital inputs and produce a single digital output based on a specific logical rule.\n' +
      'Think of them as tiny decision makers. In Arduino programming, we don\'t usually wire up physical logic gate chips. Instead, we simulate their behavior using logical operations in our code.\n' +
      '\n' +
      '## 💡 **Basic Logic Gates**\n' +
      '\n' +
      '### **AND Gate &&**\n' +
      'The output is HIGH (true) ONLY IF ALL of its inputs are HIGH (true). Otherwise, the output is LOW (false).\n' +
      '\n' +
      '**Truth Table**\n' +
      '\n' +
      '| Input A  | Input B  | Output (A AND B) |\n' +
      '|----------|----------|------------------|\n' +
      '| LOW (0)  | LOW (0)  | LOW (0)          |\n' +
      '| LOW (0)  | HIGH (1) | LOW (0)          |\n' +
      '| HIGH (1) | LOW (0)  | LOW (0)          |\n' +
      '| HIGH (1) | HIGH (1) | HIGH (1)         |\n' +
      '\n' +
      '`if (inputA == HIGH && inputB == HIGH)`\n' +
      '\n' +
      '### **OR Gate ||**\n' +
      'The output is HIGH (true) If AT LEAST ONE of its inputs is HIGH (true). The output is LOW (false) only if ALL inputs are LOW.\n' +
      '\n' +
      '**Truth Table**\n' +
      '\n' +
      '| Input A  | Input B  | Output (A OR B) |\n' +
      '|----------|----------|-----------------|\n' +
      '| LOW (0)  | LOW (0)  | LOW (0)         |\n' +
      '| LOW (0)  | HIGH (1) | HIGH (1)        |\n' +
      '| HIGH (1) | LOW (0)  | HIGH (1)        |\n' +
      '| HIGH (1) | HIGH (1) | HIGH (1)        |\n' +
      '\n' +
      '`if (inputA == HIGH || inputB == HIGH)`\n' +
      '\n' +
      '### **NOT Gate !**\n' +
      'The output is the opposite of its single input. If the input is HIGH, the output is LOW. If the input is LOW, the output is HIGH.\n' +
      '\n' +
      '**Truth Table**\n' +
      '\n' +
      '| Input A  | Output (NOT A) |\n' +
      '|----------|----------------|\n' +
      '| LOW (0)  | HIGH (1)       |\n' +
      '| HIGH (1) | LOW (0)        |\n' +
      '\n' +
      '`if (!inputA == HIGH)`\n' +
      '\n' +
      '### **XOR Gate ^**\n' +
      'The output is HIGH (true) If ONLY ONE of its inputs is HIGH (true), but NOT if both are HIGH or both are LOW.\n' +
      '\n' +
      '**Truth Table**\n' +
      '\n' +
      '| Input A  | Input B  | Output (A XOR B) |\n' +
      '|----------|----------|------------------|\n' +
      '| LOW (0)  | LOW (0)  | LOW (0)          |\n' +
      '| LOW (0)  | HIGH (1) | HIGH (1)         |\n' +
      '| HIGH (1) | LOW (0)  | HIGH (1)         |\n' +
      '| HIGH (1) | HIGH (1) | LOW (0)          |\n' +
      '\n' +
      '`if (inputA != inputB)`\n' +
      '\n' +
      '## 💻 **Example**\n' +
      '\n' +
      '### 💻 **AND Gate**\n' +
      '```arduino\n' +
      'const int INPUT_PIN_A = 2;\n' +
      'const int INPUT_PIN_B = 3;\n' +
      'const int OUTPUT_LED_PIN = 13;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n' +
      '  pinMode(INPUT_PIN_B, INPUT_PULLUP);\n' +
      '  pinMode(OUTPUT_LED_PIN, OUTPUT);\n' +
      '  Serial.println("AND Gate Simulator Ready!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n' +
      '  bool inputB_active = (digitalRead(INPUT_PIN_B) == LOW);\n' +
      '\n' +
      '  if (inputA_active && inputB_active) {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, HIGH);\n' +
      '    Serial.println("AND Gate: Output HIGH");\n' +
      '  } else {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, LOW);\n' +
      '    Serial.println("AND Gate: Output LOW");\n' +
      '  }\n' +
      '  delay(1000);\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### 💻 **OR Gate**\n' +
      '```arduino\n' +
      'const int INPUT_PIN_A = 2;\n' +
      'const int INPUT_PIN_B = 3;\n' +
      'const int OUTPUT_LED_PIN = 13;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n' +
      '  pinMode(INPUT_PIN_B, INPUT_PULLUP);\n' +
      '  pinMode(OUTPUT_LED_PIN, OUTPUT);\n' +
      '  Serial.println("OR Gate Simulator Ready!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n' +
      '  bool inputB_active = (digitalRead(INPUT_PIN_B) == LOW);\n' +
      '\n' +
      '  if (inputA_active || inputB_active) {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, HIGH);\n' +
      '    Serial.println("OR Gate: Output HIGH");\n' +
      '  } else {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, LOW);\n' +
      '    Serial.println("OR Gate: Output LOW");\n' +
      '  }\n' +
      '  delay(1000);\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### 💻 **NOT Gate**\n' +
      '```arduino\n' +
      'const int INPUT_PIN_A = 2;\n' +
      'const int OUTPUT_LED_PIN = 13;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n' +
      '  pinMode(OUTPUT_LED_PIN, OUTPUT);\n' +
      '  Serial.println("NOT Gate Simulator Ready!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n' +
      '\n' +
      '  if (!inputA_active) {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, HIGH);\n' +
      '    Serial.println("NOT Gate: Output HIGH");\n' +
      '  } else {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, LOW);\n' +
      '    Serial.println("NOT Gate: Output LOW");\n' +
      '  }\n' +
      '  delay(1000);\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '### 💻 **XOR Gate**\n' +
      '```arduino\n' +
      'const int INPUT_PIN_A = 2;\n' +
      'const int INPUT_PIN_B = 3;\n' +
      'const int OUTPUT_LED_PIN = 13;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n' +
      '  pinMode(INPUT_PIN_B, INPUT_PULLUP);\n' +
      '  pinMode(OUTPUT_LED_PIN, OUTPUT);\n' +
      '  Serial.println("XOR Gate Simulator Ready!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n' +
      '  bool inputB_active = (digitalRead(INPUT_PIN_B) == LOW);\n' +
      '\n' +
      '  if (inputA_active != inputB_active) {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, HIGH);\n' +
      '    Serial.println("XOR Gate: Output HIGH");\n' +
      '  } else {\n' +
      '    digitalWrite(OUTPUT_LED_PIN, LOW);\n' +
      '    Serial.println("XOR Gate: Output LOW");\n' +
      '  }\n' +
      '  delay(1000);\n' +
      '}\n' +
      '```\n',
      questions:[],
  },
  
  {
    day: '13',
    title: 'Shift Registers',
    summary: 'Learn how to expand Arduino outputs using shift registers like 74HC595. Understand the shiftOut() function, pin roles (Data, Clock, Latch), and how to control multiple outputs with just 3 pins.',
    tags: ['Shift Register', '74HC595', 'shiftOut', 'Arduino Output Expansion'],
    image: '/pic13.png',
    content:
      '# 🧮 **Shift Registers**\n' +
      '\n' +
      '## 💡 **What is a Shift Register?**\n' +
      'A shift register is a special type of integrated circuit (IC) or "chip" that allows you to control many output (or input) pins using a very small number of Arduino\'s digital pins. It essentially acts as a pin multiplier.\n' +
      '\n' +
      'The most common type of shift register for extending outputs is a Serial In, Parallel Out shift register, like the popular **74HC595**. This means you send data to it serially one bit after another, like sending letters in a word one at a time using a few Arduino pins, and the shift register then outputs that data in parallel all at once on many pins.\n' +
      '\n' +
      '## 💡 **The Problem: Limited Pins**\n' +
      'Arduino Uno has about 14 digital I/O pins. If you need 8 LEDs, that\'s 8 pins. If you need 16, you\'re stuck! A shift register lets you control 8 LEDs using only 3 of your Arduino\'s pins. If you chain multiple shift registers together, you can control 16, 24, or even more LEDs with those same 3 Arduino pins!\n' +
      '\n' +
      '## 🔁 **shiftOut()**\n' +
      'Arduino provides a built in function called **shiftOut()** that makes working with shift registers much easier. It handles the details of pulsing the Data and Clock pins for you.\n' +
      '\n' +
      '**Syntax:**\n' +
      '`shiftOut(dataPin, clockPin, bitOrder, value)`\n' +
      '\n' +
      '- • **dataPin** → digital pin connected to the shift register\'s **Data** pin.\n' +
      '- • **clockPin** → digital pin connected to the shift register\'s **Clock** pin.\n' +
      '- • **bitOrder** → determines if the bits are sent **Least Significant Bit First** or **Most Significant Bit First**.\n' +
      '- • **value** → a byte that contains the 8 bits of data to send.\n' +
      '\n' +
      '### 🧷 **Pin Explanation**\n' +
      '- • **Data Pin (DS / SER):** Arduino sends data one bit at a time.\n' +
      '- • **Clock Pin (SH_CP / SRCLK):** Tells the register to shift in the next bit.\n' +
      '- • **Latch Pin (ST_CP / RCLK):** Goes HIGH then LOW to latch all 8 bits onto output pins at once.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 Example\n' +
      '```arduino\n' +
      'int dataPin = 2;   // Connect to DS of 74HC595\n' +
      'int clockPin = 3;  // Connect to SHCP of 74HC595\n' +
      'int latchPin = 4;  // Connect to STCP of 74HC595\n' +
      '\n' +
      'void setup() {\n' +
      '  pinMode(dataPin, OUTPUT);\n' +
      '  pinMode(clockPin, OUTPUT);\n' +
      '  pinMode(latchPin, OUTPUT);\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  digitalWrite(latchPin, LOW);               // Prepare shift register\n' +
      '  shiftOut(dataPin, clockPin, MSBFIRST, 42); // Send the value 42 (binary 00101010)\n' +
      '  digitalWrite(latchPin, HIGH);              // Store shifted bits on output pins\n' +
      '  delay(1000); // Wait a second\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  {
    day: '14',
    title: 'Analog Pins in Arduino',
    summary: 'Learn the difference between analog and digital signals, how Arduino reads analog input using analogRead(), and how to use sensors like potentiometers, LDRs, and thermistors through voltage dividers.',
    tags: ['Analog Pins', 'ADC', 'analogRead', 'Sensors', 'Voltage Divider'],
    image: '/pic14.png',
    content:
      '# 🎛️ **Analog Pins**\n' +
      '\n' +
      '## 💡 **Analog Signals and Digital Signals**\n' +
      '- **Digital Signal:** Has only two distinct states (HIGH or LOW, 1 or 0). Think of a light switch (on or off).\n' +
      '- **Analog Signal:** Has a continuous range of values within a given span. Think of a dimmer switch (any brightness level from completely off to fully on).\n' +
      '\n' +
      'Many real world phenomena, like temperature, light intensity, sound volume, and pressure, are analog in nature.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Analog to Digital Conversion (ADC)**\n' +
      'Arduino\'s microcontroller is fundamentally a digital device. It only understands 1s and 0s. So, how can it understand a continuous analog signal? It uses a special built-in component called an **Analog to Digital Converter (ADC)**.\n' +
      '\n' +
      'Analog to Digital Conversion (ADC) is the process of taking a continuous analog voltage and converting it into a discrete digital number that the Arduino can process.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🔌 **Analog Input Pins**\n' +
      'Arduino boards have dedicated analog input pins, usually labeled A0 through A5. These are the pins that are connected to the internal ADC.\n' +
      '\n' +
      '- **Do not use pinMode()** to set these pins as INPUT for analog readings.\n' +
      '- These pins typically read voltage values between 0V and 5V (reference voltage).\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 🧪 **analogRead() Function**\n' +
      '**Syntax:** `analogRead(pin)`\n' +
      '- • **pin**: the analog input pin (e.g., A0, A1, A5).\n' +
      '- • **Returns:** an integer value from 0 to 1023.\n' +
      '\n' +
      'The ADC is **10-bit**, meaning 2^10 = 1024 possible values.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Example: Basic Analog Reader**\n' +
      '```arduino\n' +
      'const int SENSOR_ANALOG_PIN = A0;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Analog Reader Started!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  int analogValue = analogRead(SENSOR_ANALOG_PIN);\n' +
      '  Serial.print("Analog Reading (0-1023): ");\n' +
      '  Serial.println(analogValue);\n' +
      '  delay(100);\n' +
      '}\n' +
      '```\n' +
      '\n' +
      'A**potentiometer** is a perfect starting point for analog input. Its essentially a variable resistor that acts like a voltage divider.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **General Analog Sensors and Voltage Dividers**\n' +
      'Many basic analog sensors like an **LDR (light)** or **thermistor (temperature)** are resistors whose resistance changes based on physical properties.\n' +
      '\n' +
      'To convert this into a readable voltage for Arduino, use a **voltage divider** circuit.\n' +
      '\n' +
      'Arduino\'s analogRead gives a value from **0 to 1023**, which maps to **0V to 5V**.\n' +
      '\n' +
      '**Voltage Conversion:**\n' +
      '`float voltage = (analogReadValue * 5.0) / 1023.0;`\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Example: Voltage from Potentiometer**\n' +
      '```arduino\n' +
      'const int POT_PIN = A0;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("Potentiometer Voltage Reader Started!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  int rawValue = analogRead(POT_PIN);\n' +
      '  float voltage = (rawValue * 5.0) / 1023.0;\n' +
      '  Serial.print("Raw Value: ");\n' +
      '  Serial.print(rawValue);\n' +
      '  Serial.print(" | Voltage: ");\n' +
      '  Serial.print(voltage);\n' +
      '  Serial.println(" V");\n' +
      '  delay(100);\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  {
    day: '15',
    title: 'PWM and ADC Resolution',
    summary: 'Understand how PWM simulates analog output using digital pins and how ADC resolution determines the precision of analog input readings. Learn to use analogWrite and calculate voltage per ADC step.',
    tags: ['PWM', 'ADC', 'analogWrite', 'analogRead', 'Resolution'],
    image: '/pic15.png',
    content:
      '# ⚡ **PWM and ADC Resolution**\n' +
      '\n' +
      'Arduino\'s digital pins can only output 5V (HIGH) or 0V (LOW). They can\'t magically output 2.5V for half brightness. So, how do we get around this?\n' +
      '\n' +
      '**Pulse Width Modulation (PWM)**\n' +
      '\n' +
      'is a clever trick to simulate analog behavior using a digital pin that can only be ON or OFF. Instead of providing a steady 2.5V, the Arduino rapidly turns the pin ON and OFF very quickly.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **PWM Pins**\n' +
      'Not all digital pins on Arduino board can do PWM. Only specific pins are capable of generating these rapid pulses.\n' +
      'On most Arduino Uno boards, these pins are usually marked with a tilde (~) symbol next to their number (e.g., ~3, ~5, ~6, ~9, ~10, ~11).\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **analogWrite() Function**\n' +
      '**Syntax:** `analogWrite(pin, value)`\n' +
      '- • **pin**: the PWM capable digital pin (e.g., 3, 5, 6, 9, 10, 11)\n' +
      '- • **value**: a number from 0 to 255 representing duty cycle:\n' +
      '  •- 0: The pin is always LOW (0% duty cycle, OFF)\n' +
      '  •- 255: The pin is always HIGH (100% duty cycle, fully ON)\n' +
      '  •- 127: The pin is HIGH for 50% of the time (half brightness)\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Example: PWM LED Brightness**\n' +
      '```arduino\n' +
      'const int LED_PWM_PIN = 9;\n' +
      'const int BRIGHTNESS_LEVEL = 127;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("LED Brightness Controller Started!");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  analogWrite(LED_PWM_PIN, BRIGHTNESS_LEVEL);\n' +
      '  Serial.print("LED Brightness set to: ");\n' +
      '  Serial.println(BRIGHTNESS_LEVEL);\n' +
      '  delay(2000);\n' +
      '\n' +
      '  analogWrite(LED_PWM_PIN, 20);\n' +
      '  Serial.println("LED Brightness set to: 20 (Dim)");\n' +
      '  delay(2000);\n' +
      '\n' +
      '  analogWrite(LED_PWM_PIN, 255);\n' +
      '  Serial.println("LED Brightness set to: 255 (Full)");\n' +
      '  delay(2000);\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '---\n' +
      '\n' +
      '# 🎯 **What is ADC Resolution?**\n' +
      '\n' +
      '**Resolution** refers to the number of distinct levels or steps an ADC can distinguish within its full input voltage range.\n' +
      '\n' +
      'Think of it like having a ruler: a ruler with millimeters has higher resolution than one with only centimeters.\n' +
      '\n' +
      'Arduino uses a 10-bit ADC.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Why Resolution Matters**\n' +
      '- • **Precision:** 12-bit ADC → 4096 steps → finer voltage detail\n' +
      '- • **Sensor Choice:** Needed for sensors that change tiny voltages\n' +
      '- • **Noise:** Higher resolution reveals more electrical noise\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡** Bits of Resolution and Number of Steps**\n' +
      '- 10-bit ADC = 2¹⁰ = **1024 steps** (values from 0 to 1023)\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Voltage Per Step (LSB Voltage)**\n' +
      '- **Formula:** `Voltage per Step = Reference Voltage / Number of Steps`\n' +
      '- Arduino: 5V / 1024 = 0.00488V or **4.88 mV/step**\n' +
      '\n' +
      'This means Arduino can only detect voltage changes of 4.88mV or more.\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## 💡 **Example: ADC Resolution Monitor**\n' +
      '```arduino\n' +
      'const int SENSOR_PIN = A0;\n' +
      'const float REFERENCE_VOLTAGE = 5.0;\n' +
      'const int ADC_STEPS = 1024;\n' +
      '\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  Serial.println("ADC Resolution Monitor Started!");\n' +
      '  Serial.print("Reference Voltage: ");\n' +
      '  Serial.print(REFERENCE_VOLTAGE);\n' +
      '  Serial.println(" V");\n' +
      '  Serial.print("ADC Steps: ");\n' +
      '  Serial.println(ADC_STEPS);\n' +
      '  float voltagePerStep = REFERENCE_VOLTAGE / ADC_STEPS;\n' +
      '  Serial.print("Voltage per Step: ");\n' +
      '  Serial.print(voltagePerStep, 4);\n' +
      '  Serial.println(" V/step");\n' +
      '  Serial.println("---");\n' +
      '}\n' +
      '\n' +
      'void loop() {\n' +
      '  int rawValue = analogRead(SENSOR_PIN);\n' +
      '  float voltage = (rawValue * REFERENCE_VOLTAGE) / (ADC_STEPS - 1);\n' +
      '  Serial.print("Raw: ");\n' +
      '  Serial.print(rawValue);\n' +
      '  Serial.print(" | Voltage: ");\n' +
      '  Serial.print(voltage, 3);\n' +
      '  Serial.println(" V");\n' +
      '  delay(200);\n' +
      '}\n' +
      '```\n',
      questions: [],
  },
  
  {
    day: "16",
    title: "External Voltage References",
    summary: "Learn how to improve ADC accuracy in Arduino by changing the reference voltage using analogReference(). Understand DEFAULT, INTERNAL, INTERNAL1V1, INTERNAL2V56, and EXTERNAL reference options, and when to use each for your sensor setup.",
    tags: ["ADC", "Voltage Reference", "analogReference", "INTERNAL1V1", "EXTERNAL"],
    image: "/pic16.png",
    content:
      "# 🎯 **External Voltage References**\n\n" +
      "The reference voltage is the maximum voltage that your Arduino's ADC consider to be '1023'. Everything else is scaled proportionally. By default, your Arduino uses its operating voltage of 5V as this reference. But what if this 5V isn't perfectly stable, or if your sensor only outputs a very small voltage range? This is where understanding and choosing your voltage reference becomes important.\n\n" +
      "---\n\n" +
      "## 💡 **Changing the Reference with analogReference()**\n" +
      "You use the **analogReference()** function in your **void setup()** to select the reference.\n\n" +
      "```arduino\n" +
      "analogReference(type)\n" +
      "// type = DEFAULT, INTERNAL, INTERNAL1V1, INTERNAL2V56, or EXTERNAL.\n" +
      "```\n\n" +
      "---\n\n" +
      "## 💡 **The Default Reference - DEFAULT**\n" +
      "DEFAULT uses the analog reference from your Arduino's power supply.\n" +
      "- • **Use case:** most common setting and works well for many applications.\n" +
      "- • **Limitation:** If your Arduino's 5V supply fluctuates, your analog readings might become slightly inaccurate.\n\n" +
      "```arduino\n" +
      "void setup() {\n" +
      "  analogReference(DEFAULT);  // Uses board supply voltage (e.g., 5V)\n" +
      "}\n" +
      "void loop() {\n" +
      "  int sensorValue = analogRead(A0); // Read analog value from pin A0\n" +
      "}\n" +
      "```\n\n" +
      "---\n\n" +
      "## 💡 **Internal Voltage References - INTERNAL / INTERNAL1V1 / INTERNAL2V56**\n" +
      "INTERNAL or INTERNAL1V1 uses a built in **1.1V** reference. This is a very precise and stable 1.1V source. Ideal for measuring small voltages (0V to 1.1V) with higher effective resolution.\n\n" +
      "- **Example:** If your sensor only outputs up to 1V, using the 1.1V reference means that 0 to 1V will be mapped across the full 0 to 1023 range, giving you more detail.\n\n" +
      "```arduino\n" +
      "void setup() {\n" +
      "  analogReference(INTERNAL);  // or analogReference(INTERNAL1V1);\n" +
      "}\n" +
      "void loop() {\n" +
      "  int sensorValue = analogRead(A0); // Now, 1023 = 1.1V on A0\n" +
      "}\n" +
      "```\n\n" +
      "INTERNAL2V56 uses a built-in **2.56V** reference, similar to 1.1V, but for sensors outputting voltages up to 2.56V. (Only available on some boards like Arduino Mega)\n\n" +
      "```arduino\n" +
      "void setup() {\n" +
      "  analogReference(INTERNAL2V56);\n" +
      "}\n" +
      "void loop() {\n" +
      "  int sensorValue = analogRead(A0); // Now, 1023 = 2.56V on A0\n" +
      "}\n" +
      "```\n\n" +
      "---\n\n" +
      "## 💡 **External Voltage Reference - EXTERNAL**\n" +
      "EXTERNAL gives you the most control and precision. You can provide your own stable voltage source to a special pin on the Arduino called **AREF** (Analog Reference).\n\n" +
      "- • **Working:** You connect a precise, stable voltage source (e.g., voltage reference IC or stable power supply) to the AREF pin.\n" +
      "- • **Use case:** When you need the **highest precision**, or when your sensor's output range exactly matches a custom reference voltage you can provide.\n\n" +
      "```arduino\n" +
      "void setup() {\n" +
      "  analogReference(EXTERNAL);  // Uses the voltage you supply to AREF\n" +
      "}\n" +
      "void loop() {\n" +
      "  int sensorValue = analogRead(A0); // Now, 1023 = voltage on AREF pin\n" +
      "}\n" +
      "```\n\n" +
      "---\n\n" +
      "## 💡 **When to Use Which Reference?**\n\n" +
      "- • **DEFAULT**: Most common. Use for sensors that output across the full 0 to 5V range, or when slight fluctuations in 5V aren't critical.\n" +
      "- • **INTERNAL**: Use for sensors that output small voltages (e.g., 0V to 1V or 0V to 2.5V) and you want maximum precision.\n" +
      "- • **EXTERNAL**: Use when you have a custom, very precise, and stable voltage reference that exactly matches your sensor's output range for best accuracy.\n",
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

// Add quiz for Day 4
arduinoDays[3].quiz = [
   
      {
        question: '1. What is the main purpose of variables in Arduino?',
        options: [
          'To make the code longer',
          'To display graphics',
          'To store and manage data values',
          'To increase execution speed',
        ],
        answer: 2,
      },
      {
        question: '2. Which of the following is a correct variable declaration in Arduino?',
        options: [
          'int temperature = 25',
          'int 3value = 30;',
          'float-temp = 2.5;',
          'char symbol = *;',
        ],
        answer: 0,
      },
      {
        question: '3. What is the valid range of the int data type in Arduino?',
        options: [
          '-128 to 127',
          '0 to 255',
          '-32,768 to 32,767',
          '-2,147,483,648 to 2,147,483,647',
        ],
        answer: 2,
      },
      {
        question: '4. Which data type should you use to store a true or false value?',
        options: [
          'char',
          'int',
          'float',
          'bool',
        ],
        answer: 3,
      },
      {
        question: '5. Which variable name is not allowed in Arduino?',
        options: [
          '_tempValue',
          'ledPin9',
          '2sensor',
          'motor_speed',
        ],
        answer: 2,
      },
      {
        question: '6. What data type is best suited for PWM values between 0 and 255?',
        options: [
          'int',
          'long',
          'byte',
          'float',
        ],
        answer: 2,
      },
      {
        question: '7. Which data type would be best to store the value 3.1416?',
        options: [
          'int',
          'float',
          'char',
          'long',
        ],
        answer: 1,
      },
      {
        question: '8. How many bytes does a bool typically use in Arduino?',
        options: [
          '0',
          '1',
          '2',
          '4',
        ],
        answer: 1,
      },
      {
        question: '9. Which keyword is used to store a single character like \'A\'?',
        options: [
          'string',
          'char',
          'byte',
          'word',
        ],
        answer: 1,
      },
      {
        question: '10. Which of the following is a correct use of a long variable?',
        options: [
          'long voltage = 3.3;',
          'long name = "sensor";',
          'long counter = 100000;',
          'long isReady = true;',
        ],
        answer: 2,
      },
    ];
    arduinoDays[4].quiz = [
      
  {
    question: '1. What is the result of 15 % 4?',
    options: ['3', '4', '3.75', '0'],
    answer: 0,
  },
  {
    question: '2. Which operator checks if two values are NOT equal?',
    options: ['==', '!=', '<>', '><'],
    answer: 1,
  },
  {
    question: '3. What does the expression (true && false) evaluate to?',
    options: ['true', 'false', '1', '0'],
    answer: 1,
  },
  {
    question: '4. What is the result of 7 / 2 when using integer division?',
    options: ['3.5', '3', '4', '2'],
    answer: 1,
  },
  {
    question: '5. Which logical operator returns true when at least one condition is true?',
    options: ['&&', '||', '!', '=='],
    answer: 1,
  },
  {
    question: `6. Snippet 1:\n\n\`\`\`cpp
void setup() {
  Serial.begin(9600);
  int a = 12;
  int b = 5;
  int sum = a + b;
  int difference = a - b;
  int product = a * b;
  int quotient = a / b;
  int remainder = a % b;
  Serial.print("Sum: ");
  Serial.println(sum);
  Serial.print("Remainder: ");
  Serial.println(remainder);
}
void loop() {}
\`\`\`\n\nWhat will be printed for the remainder?`,
    options: ['2', '2.4', '7', '0'],
    answer: 0,
  },
  {
    question: '7. What will be printed for "Too hot" in Snippet 2?',
    options: ['true', 'false', '1', '28.5'],
    answer: 0,
  },
  {
    question: '8. What will be printed for "Engine can start" in Snippet 3?',
    options: ['true', 'false', 'Door closed', 'Error'],
    answer: 1,
  },
  {
    question: '9. What will be printed for "Valid voltage" in Snippet 4?',
    options: ['true', 'false', '4.8', '1'],
    answer: 0,
  },
  {
    question: '10. What will be the PWM Value in Snippet 5?',
    options: ['60', '153', '255', '100'],
    answer: 1,
  },
];

  arduinoDays[5].quiz = [
      {
        question: '1. What happens when an if condition is false?',
        options: [
          'The program stops',
          'The code inside the if block is skipped',
          'An error occurs',
          'The code runs anyway',
        ],
        answer: 1,
      },
      {
        question: '2. Which statement provides an alternative when an if condition is false?',
        options: ['elif', 'else', 'otherwise', 'alternate'],
        answer: 1,
      },
      {
        question: '3. In a switch statement, what does the break statement do?',
        options: [
          'Stops the entire program',
          'Exits the switch statement',
          'Restarts the switch',
          'Creates an error',
        ],
        answer: 1,
      },
      {
        question:
          '4. Which control structure is best for checking if a temperature is above 25°C?',
        options: ['switch', 'if', 'while', 'case'],
        answer: 1,
      },
      {
        question:
          '5. What is the purpose of the default case in a switch statement?',
        options: [
          "It's required for all switch statements",
          "It handles values that don't match any case",
          'It runs first before other cases',
          'It stops the switch statement',
        ],
        answer: 1,
      },
      {
        question: `6. Snippet 1:\n\n\`\`\`cpp
    void setup() {
      Serial.begin(9600);
      int sensorValue = 600;
      if (sensorValue > 500) {
        Serial.println("Sensor value is high");
      }
      Serial.println("Setup complete");
    }
    void loop() {}
    \`\`\`\n\nWhat will be printed to the serial monitor?`,
        options: [
          'Only "Setup complete"',
          'Only "Sensor value is high"',
          'Both messages',
          'Nothing',
        ],
        answer: 2,
      },
      {
        question: `7. Snippet 2:\n\n\`\`\`cpp
    void setup() {
      Serial.begin(9600);
      float batteryVoltage = 3.2;
      if (batteryVoltage >= 3.5) {
        Serial.println("Battery OK");
      } else {
        Serial.println("Battery Low");
      }
    }
    void loop() {}
    \`\`\`\n\nWhich message will be printed?`,
        options: ['"Battery OK"', '"Battery Low"', 'Both messages', 'No message'],
        answer: 1,
      },
      {
        question: `8. Snippet 3:\n\n\`\`\`cpp
    void setup() {
      Serial.begin(9600);
      int score = 85;
      if (score >= 90) {
        Serial.println("Grade A");
      } else if (score >= 80) {
        Serial.println("Grade B");
      } else if (score >= 70) {
        Serial.println("Grade C");
      } else {
        Serial.println("Grade F");
      }
    }
    void loop() {}
    \`\`\`\n\nWhat grade will be printed?`,
        options: ['Grade A', 'Grade B', 'Grade C', 'Grade F'],
        answer: 1,
      },
      {
        question: `9. Snippet 4:\n\n\`\`\`cpp
    void setup() {
      Serial.begin(9600);
      int mode = 3;
      switch (mode) {
        case 1:
          Serial.println("Mode: Manual");
          break;
        case 2:
          Serial.println("Mode: Automatic");
          break;
        case 3:
          Serial.println("Mode: Sleep");
          break;
        default:
          Serial.println("Mode: Unknown");
          break;
      }
    }
    void loop() {}
    \`\`\`\n\nWhat will be printed?`,
        options: ['Mode: Manual', 'Mode: Automatic', 'Mode: Sleep', 'Mode: Unknown'],
        answer: 1,
      },
    ];

    arduinoDays[6].quiz = [
      
        {
          question: '1. What is the main benefit of using functions in your code?',
          options: [
            'A. To make the code run faster on the Arduino.',
            'B. To store secret data securely.',
            'C. To organize code into reusable blocks and improve readability.',
            'D. To connect the Arduino to the internet directly.',
          ],
          answer: 2,
        },
        {
          question: '2. If a function definition starts with "void", what does this mean?',
          options: [
            'A. The function takes no arguments.',
            'B. The function will run only once.',
            'C. The function does not return any value.',
            'D. The function is empty and does nothing.',
          ],
          answer: 2,
        },
        {
          question: '3. What are num1 and num2 in the function definition int addNumbers(int num1, int num2)?',
          options: [
            'A. Return values.',
            'B. Local variables that can only be used outside the function.',
            'C. Arguments or parameters that the function expects as input.',
            'D. Global variables accessible anywhere.',
          ],
          answer: 2,
        },
        {
          question: '4. Which of these is the correct way to call a function named showMessage that takes no arguments and returns no value?',
          options: [
            'A. showMessage;',
            'B. call showMessage();',
            'C. showMessage();',
            'D. void showMessage;',
          ],
          answer: 2,
        },
        {
          question: '5. If a function is designed to return a number with a decimal point, what would be an appropriate returnType?',
          options: [
            'A. int',
            'B. char',
            'C. float',
            'D. bool',
          ],
          answer: 2,
        },
        {
          question: '6. What will be printed by this code?\n\nvoid setup() {\n  Serial.begin(9600);\n  int a = 12;\n  int b = 5;\n  int sum = a + b;\n  int remainder = a % b;\n  Serial.print("Sum: ");\n  Serial.println(sum);\n  Serial.print("Remainder: ");\n  Serial.println(remainder);\n}\n\nvoid loop() {}',
          options: [
            'A. Sum: 17, Remainder: 2',
            'B. Sum: 17, Remainder: 0',
            'C. Sum: 7, Remainder: 2',
            'D. Sum: 17, Remainder: 1',
          ],
          answer: 0,
        },
        {
          question: '7. Which data type should you use to store a true or false value?',
          options: [
            'A. char',
            'B. int',
            'C. float',
            'D. bool',
          ],
          answer: 3,
        },
        {
          question: '8. Which variable name is NOT allowed in Arduino?',
          options: [
            'A. _tempValue',
            'B. ledPin9',
            'C. 2sensor',
            'D. motor_speed',
          ],
          answer: 2,
        },
        {
          question: '9. What is the valid range of the int data type in Arduino?',
          options: [
            'A. -128 to 127',
            'B. 0 to 255',
            'C. -32,768 to 32,767',
            'D. -2,147,483,648 to 2,147,483,647',
          ],
          answer: 2,
        },
        {
          question: '10. Which of the following is a correct variable declaration in Arduino?',
          options: [
            'A. int temperature = 25',
            'B. int 3value = 30;',
            'C. float-temp = 2.5;',
            'D. char symbol = *;',
          ],
          answer: 0,
        },
      ];

    arduinoDays[7].quiz = [
      {
        question: '1. What is the main benefit of using functions in your code?',
        options: [
          'A. To make the code run faster on the Arduino.',
          'B. To store secret data securely.',
          'C. To organize code into reusable blocks and improve readability.',
          'D. To connect the Arduino to the internet directly.',
        ],
        answer: 2,
      },
      {
        question: '2. If a function definition starts with void, what does this mean?',
        options: [
          'A. The function takes no arguments.',
          'B. The function will run only once.',
          'C. The function does not return any value.',
          'D. The function is empty and does nothing.',
        ],
        answer: 2,
      },
      {
        question: '3. What are num1 and num2 in the function definition int addNumbers(int num1, int num2)?',
        options: [
          'A. Return values.',
          'B. Local variables that can only be used outside the function.',
          'C. Arguments or parameters that the function expects as input.',
          'D. Global variables accessible anywhere.',
        ],
        answer: 2,
      },
      {
        question: '4. Which of these is the correct way to call a function named showMessage that takes no arguments and returns no value?',
        options: [
          'A. showMessage;',
          'B. call showMessage();',
          'C. showMessage();',
          'D. void showMessage;',
        ],
        answer: 2,
      },
      {
        question: '5. If a function is designed to return a number with a decimal point, what would be an appropriate returnType?',
        options: [
          'A. int',
          'B. char',
          'C. float',
          'D. bool',
        ],
        answer: 2,
      },
      {
        question: '6. What will be the output on the serial monitor when this code runs?\n\nvoid displayInfo() {\n  Serial.println("CircuitCode Tutorial");\n  Serial.println("Learning Functions");\n}\nvoid setup() {\n  Serial.begin(9600);\n  displayInfo();\n}\nvoid loop() {}',
        options: [
          'A. "CircuitCode Tutorial" followed by "Learning Functions" once.',
          'B. "CircuitCode Tutorial" followed by "Learning Functions" repeatedly.',
          'C. An error because the function is called incorrectly.',
          'D. Nothing will be printed.',
        ],
        answer: 0,
      },
      {
        question: '7. What value will be printed to the serial monitor for "Sum is:"?\n\nint addNumbers(int a, int b) {\n  int sum = a + b;\n  return sum;\n}\nvoid setup() {\n  Serial.begin(9600);\n  int result = addNumbers(7, 3);\n  Serial.print("Sum is: ");\n  Serial.println(result);\n}\nvoid loop() {}',
        options: [
          'A. Sum is: 7',
          'B. Sum is: 3',
          'C. Sum is: 10',
          'D. Sum is: an error',
        ],
        answer: 2,
      },
      {
        question: '8. How many times will "Repeat message." be printed to the serial monitor?\n\nvoid printRepeatedly(int count) {\n  for (int i = 0; i < count; i++) {\n    Serial.println("Repeat message.");\n  }\n}\nvoid setup() {\n  Serial.begin(9600);\n  printRepeatedly(2);\n}\nvoid loop() {}',
        options: [
          'A. 0 times.',
          'B. 1 time.',
          'C. 2 times.',
          'D. Infinitely.',
        ],
        answer: 2,
      },
      {
        question: '9. What type of value is expected to be passed into the calculateDifference function?\n\nfloat calculateDifference(float val1, float val2) {\n  float diff = val1 - val2;\n  return diff;\n}\nvoid setup() {\n  Serial.begin(9600);\n  float diffResult = calculateDifference(15.5, 7.2);\n  Serial.print("Difference: ");\n  Serial.println(diffResult);\n}\nvoid loop() {}',
        options: [
          'A. Two integers.',
          'B. Two floating-point numbers.',
          'C. Two characters.',
          'D. One integer and one float.',
        ],
        answer: 1,
      },
      {
        question: '10. What character will be printed to the serial monitor by this code?\n\nchar getFirstCharacter(char letter1, char letter2) {\n  if (letter1 < letter2) {\n    return letter1;\n  } else {\n    return letter2;\n  }\n}\nvoid setup() {\n  Serial.begin(9600);\n  char resultChar = getFirstCharacter(\'Z\', \'A\');\n  Serial.print("The first char is: ");\n  Serial.println(resultChar);\n}\nvoid loop() {}',
        options: [
          'A. Z',
          'B. A',
          'C. Nothing, there\'s an error.',
          'D. A random character.',
        ],
        answer: 1,
      }
    ];

    arduinoDays[8].quiz = [
      
      
          {
            "question": "1. What are the two basic states a digital pin can represent?",
            "options": [
              "A. Analog and Digital",
              "B. High and Low",
              "C. Fast and Slow",
              "D. Red and Green"
            ],
            "answer": 1
          },
          {
            "question": "2. Which function is used to tell the Arduino whether a digital pin will be used for sending signals or receiving signals?",
            "options": [
              "A. digitalWrite()",
              "B. digitalRead()",
              "C. pinMode()",
              "D. Serial.begin()"
            ],
            "answer": 2
          },
          {
            "question": "3. If you want to control an LED (turn it ON or OFF) using a digital pin, what mode should that pin be set to?",
            "options": [
              "A. INPUT",
              "B. OUTPUT",
              "C. ANALOG",
              "D. PULLUP"
            ],
            "answer": 1
          },
          {
            "question": "4. Which function is used to send a HIGH or LOW signal from an OUTPUT configured digital pin?",
            "options": [
              "A. digitalRead()",
              "B. pinMode()",
              "C. digitalWrite()",
              "D. readPin()"
            ],
            "answer": 2
          },
          {
            "question": "5. What value does digitalRead() return when a digital input pin detects a \"HIGH\" signal?",
            "options": [
              "A. 0",
              "B. 1",
              "C. -1",
              "D. false"
            ],
            "answer": 1
          },
          {
            "question": "6. What will an LED connected to digital pin 5 do if this code is uploaded?\n\ncpp\nvoid setup() {\n  pinMode(5, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(5, HIGH);\n  delay(500);\n  digitalWrite(5, LOW);\n  delay(500);\n}\n",
            "options": [
              "A. It will stay off.",
              "B. It will stay on constantly.",
              "C. It will blink on and off every 0.5 seconds.",
              "D. It will only turn on once and then stay off."
            ],
            "answer": 2
          },
          {
            "question": "7. What kind of values would you expect buttonState to hold in this code?\n\ncpp\nint buttonPin = 2;\nint buttonState = 0;\nvoid setup() {\n  pinMode(buttonPin, INPUT);\n  Serial.begin(9600);\n}\nvoid loop() {\n  buttonState = digitalRead(buttonPin);\n  Serial.print(\"Button state: \");\n  Serial.println(buttonState);\n  delay(100);\n}\n",
            "options": [
              "A. Numbers like 0 to 1023.",
              "B. Only HIGH (or 1) or LOW (or 0).",
              "C. Text like \"Pressed\" or \"Not Pressed\".",
              "D. Negative numbers."
            ],
            "answer": 1
          },
          {
            "question": "8. Is pin A0 being used as an analog or digital pin in this code?\n\ncpp\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int sensorPin = 0; // Pin A0 used as digital pin\n  pinMode(sensorPin, INPUT);\n  int reading = digitalRead(sensorPin);\n  Serial.print(\"Digital reading from A0: \");\n  Serial.println(reading);\n  delay(200);\n}\n",
            "options": [
              "A. Analog, because it's labeled A0.",
              "B. Digital, because digitalRead() is used.",
              "C. Both analog and digital at the same time.",
              "D. Neither, the code has an error."
            ],
            "answer": 1
          },
          {
            "question": "9. What is the total duration of one full blink cycle (LED on and off) in milliseconds before \"Blink!\" is printed?\n\ncpp\nconst int LED_PIN = 7;\nconst int SHORT_DELAY = 100;\nconst int LONG_DELAY = 500;\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n  Serial.begin(9600);\n}\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay(SHORT_DELAY);\n  digitalWrite(LED_PIN, LOW);\n  delay(LONG_DELAY);\n  Serial.println(\"Blink!\");\n}\n",
            "options": [
              "A. 100 milliseconds",
              "B. 500 milliseconds",
              "C. 600 milliseconds",
              "D. 1000 milliseconds"
            ],
            "answer": 2
          },
          {
            "question": "10. What is a functional issue with the loop() function in this code?\n\ncpp\nvoid setup() {\n  pinMode(10, INPUT);\n  pinMode(11, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(10, HIGH);\n  digitalRead(11);\n  delay(100);\n}\n",
            "options": [
              "A. digitalWrite(10, HIGH) will not affect an external component and digitalRead(11) will not provide meaningful input from an output pin.",
              "B. The code will cause the Arduino to crash.",
              "C. It will make both pins continuously blink.",
              "D. It will correctly read from pin 10 and write to pin 11."
            ],
            "answer": 0
          }
        

    ]; 
    arduinoDays[10].quiz = [
      
        {
          "question": "What is 'button bounce'?",
          "options": [
            "a) The sound a button makes when pressed.",
            "b) The rapid, unstable electrical connections when a mechanical button is pressed or released.",
            "c) A special type of spring inside a button.",
            "d) The speed at which a button reacts."
          ],
          "answer": 1
        },
        {
          "question": "Why is button bounce a problem for fast microcontrollers like Arduino?",
          "options": [
            "a) The Arduino cannot handle any electrical signals.",
            "b) The Arduino reads the rapid fluctuations as multiple distinct events.",
            "c) It drains the Arduino's battery too quickly.",
            "d) It causes the Arduino to overheat."
          ],
          "answer": 1
        },
        {
          "question": "What is the main goal of 'debouncing'?",
          "options": [
            "a) To make buttons glow brighter.",
            "b) To filter out unstable electrical signals from mechanical contacts.",
            "c) To connect multiple buttons to one pin.",
            "d) To make the button physically softer to press."
          ],
          "answer": 1
        },
        {
          "question": "If you use software debouncing with delay(), what does the delay() primarily achieve?",
          "options": [
            "a) It makes the button press feel smoother.",
            "b) It waits for the electrical contacts to stabilize after an initial change.",
            "c) It sends a signal back to the button.",
            "d) It saves power."
          ],
          "answer": 1
        },
        {
          "question": "What is a common time period (in milliseconds) after which button bounce usually settles?",
          "options": [
            "a) 1-5 ms",
            "b) 20-50 ms",
            "c) 100-200 ms",
            "d) 1000 ms (1 second)"
          ],
          "answer": 1
        },
        {
          "question": "Snippet 1: What is the purpose of delay(50); after 'Pressed!' is printed?",
          // "code": "const int BUTTON = 2;\nint buttonState;\nvoid setup() {\n  pinMode(BUTTON, INPUT_PULLUP);\n  Serial.begin(9600);\n}\nvoid loop() {\n  buttonState = digitalRead(BUTTON);\n  if (buttonState == LOW) {\n    Serial.println(\"Pressed!\");\n    delay(50);\n  }\n}",
          "options": [
            "a) To make the LED blink.",
            "b) To wait for the button contacts to stabilize after a press.",
            "c) To make the serial monitor faster.",
            "d) To count the number of presses."
          ],
          "answer": 1
        },
        {
          "question": "Snippet 2: If the button is pressed and then released quickly (within 50ms), how many times will 'Button state is now: 0' appear?",
          // "code": "int buttonPin = 3;\nint lastKnownState = HIGH;\nlong lastTimeStateChanged = 0;\nlong debounceDuration = 100;\nvoid setup() {\n  pinMode(buttonPin, INPUT_PULLUP);\n  Serial.begin(9600);\n}\nvoid loop() {\n  int currentState = digitalRead(buttonPin);\n  if (currentState != lastKnownState) {\n    lastTimeStateChanged = millis();\n  }\n  if ((millis() - lastTimeStateChanged) > debounceDuration) {\n    if (currentState != lastKnownState) {\n      Serial.print(\"Button state is now: \");\n      Serial.println(currentState);\n      lastKnownState = currentState;\n    }\n  }\n}",
          "options": [
            "a) Zero times.",
            "b) One time.",
            "c) Two times.",
            "d) Many times (due to bounce)."
          ],
          "answer": 0
        },
        {
          "question": "Snippet 3: What happens to lastInteractionTime every time the button's stable state changes after the debounce delay?",
          // "code": "const int TOGGLE_BUTTON = 4;\nint pressCount = 0;\nint previousReading = HIGH;\nlong lastInteractionTime = 0;\nlong DEBOUNCE = 75;\nvoid setup() {\n  pinMode(TOGGLE_BUTTON, INPUT_PULLUP);\n  Serial.begin(9600);\n}\nvoid loop() {\n  int currentReading = digitalRead(TOGGLE_BUTTON);\n  if (currentReading != previousReading && (millis() - lastInteractionTime) > DEBOUNCE) {\n    if (currentReading == LOW) {\n      pressCount++;\n      Serial.print(\"Presses: \");\n      Serial.println(pressCount);\n    }\n    lastInteractionTime = millis();\n    previousReading = currentReading;\n  }\n}",
          "options": [
            "a) It always resets to 0.",
            "b) It is set to the current millis() value.",
            "c) It remains unchanged.",
            "d) It decreases by DEBOUNCE."
          ],
          "answer": 1
        },
        {
          "question": "Snippet 4: Why might 'Confirmed Press!' be printed multiple times for a single long button press?",
          // "code": "const int TEST_BUTTON = 5;\nlong lastChangeMillis = 0;\nlong debouncePeriod = 20;\nvoid setup() {\n  pinMode(TEST_BUTTON, INPUT_PULLUP);\n  Serial.begin(9600);\n}\nvoid loop() {\n  if (digitalRead(TEST_BUTTON) == LOW) {\n    if ((millis() - lastChangeMillis) > debouncePeriod) {\n      Serial.println(\"Confirmed Press!\");\n      lastChangeMillis = millis();\n    }\n  } else {\n    lastChangeMillis = millis();\n  }\n  delay(10);\n}",
          "options": [
            "a) Because the delay(10) is too short.",
            "b) Because lastChangeMillis is updated when the button is released, allowing repeated prints during a long press.",
            "c) Because the debouncePeriod is too long.",
            "d) Because the serial monitor is too fast."
          ],
          "answer": 1
        },
        {
          "question": "Snippet 5: If a simple push button is connected to pin 8 and GND (without resistor), and the button is not pressed, what will happen?",
          // "code": "void setup() {\n  Serial.begin(9600);\n  pinMode(8, INPUT);\n}\nvoid loop() {\n  int pinState = digitalRead(8);\n  Serial.print(\"Pin 8 state: \");\n  Serial.println(pinState);\n  delay(10);\n}",
          "options": [
            "a) It will consistently print 'Pin 8 state: 1'.",
            "b) It will consistently print 'Pin 8 state: 0'.",
            "c) It will likely print a mix of '0' and '1' due to the pin floating.",
            "d) An error will occur."
          ],
          "answer": 2
        }
      
      
    ];

    arduinoDays[11].quiz = [
      
        {
          "question": "An AND gate produces a HIGH output only if:",
          "options": ["All inputs are LOW", "At least one input is HIGH", "All inputs are HIGH", "Only one input is HIGH"],
          "answer": 2
        },
        {
          "question": "If an OR gate has two inputs, one LOW and one HIGH, what will its output be?",
          "options": ["LOW", "HIGH", "Floating", "Undefined"],
          "answer": 1
        },
        {
          "question": "A NOT gate takes how many inputs?",
          "options": ["Zero", "One", "Two", "Any number"],
          "answer": 1
        },
        {
          "question": "Which logic gate's output is HIGH if its inputs are different (HIGH and LOW, or LOW and HIGH), but LOW if they are the same?",
          "options": ["AND", "OR", "NOT", "XOR"],
          "answer": 3
        },
        {
          "question": "In Arduino code, which operator typically represents the logical AND operation?",
          "options": ["+", "&&", "||", "!"],
          "answer": 1
        },
        {
          "question": "What logic gate's behavior is simulated by this code?\n\n```cpp\nconst int INPUT1 = 2;\nconst int INPUT2 = 3;\nconst int LED = 13;\nvoid setup() {\n  pinMode(INPUT1, INPUT);\n  pinMode(INPUT2, INPUT);\n  pinMode(LED, OUTPUT);\n}\nvoid loop() {\n  int val1 = digitalRead(INPUT1);\n  int val2 = digitalRead(INPUT2);\n  if (val1 == HIGH && val2 == HIGH) {\n    digitalWrite(LED, HIGH);\n  } else {\n    digitalWrite(LED, LOW);\n  }\n}\n```",
          "options": ["OR gate", "AND gate", "NOT gate", "XOR gate"],
          "answer": 1
        },
        {
          "question": "What logic gate's behavior is simulated by the condition if (!buttonAPressed)?\n\n```cpp\nconst int BUTTON_A = 4;\nconst int LED_PIN = 13;\nvoid setup() {\n  pinMode(BUTTON_A, INPUT_PULLUP);\n  pinMode(LED_PIN, OUTPUT);\n}\nvoid loop() {\n  bool buttonAPressed = (digitalRead(BUTTON_A) == LOW);\n  if (!buttonAPressed) {\n    digitalWrite(LED_PIN, HIGH);\n  } else {\n    digitalWrite(LED_PIN, LOW);\n  }\n}\n```",
          "options": ["AND gate", "OR gate", "NOT gate", "XOR gate"],
          "answer": 2
        },
        {
          "question": "Under what conditions will the ALARM_LIGHT turn HIGH in this code?\n\n```cpp\nconst int SENSOR_X = 5;\nconst int SENSOR_Y = 6;\nconst int ALARM_LIGHT = 13;\nvoid setup() {\n  pinMode(SENSOR_X, INPUT);\n  pinMode(SENSOR_Y, INPUT);\n  pinMode(ALARM_LIGHT, OUTPUT);\n}\nvoid loop() {\n  int readingX = digitalRead(SENSOR_X);\n  int readingY = digitalRead(SENSOR_Y);\n  if (readingX == HIGH || readingY == HIGH) {\n    digitalWrite(ALARM_LIGHT, HIGH);\n  } else {\n    digitalWrite(ALARM_LIGHT, LOW);\n  }\n}\n```",
          "options": ["Only if both SENSOR_X and SENSOR_Y are HIGH", "If either SENSOR_X or SENSOR_Y (or both) are HIGH", "Only if both SENSOR_X and SENSOR_Y are LOW", "Never, the code is faulty"],
          "answer": 1
        },
        {
          "question": "If IN1 is LOW (active) and IN2 is LOW (active), what will be the state of OUT_LED?\n\n```cpp\nconst int IN1 = 7;\nconst int IN2 = 8;\nconst int OUT_LED = 13;\nvoid setup() {\n  pinMode(IN1, INPUT_PULLUP);\n  pinMode(IN2, INPUT_PULLUP);\n  pinMode(OUT_LED, OUTPUT);\n}\nvoid loop() {\n  bool active1 = (digitalRead(IN1) == LOW);\n  bool active2 = (digitalRead(IN2) == LOW);\n  if (active1 != active2) {\n    digitalWrite(OUT_LED, HIGH);\n  } else {\n    digitalWrite(OUT_LED, LOW);\n  }\n}\n```",
          "options": ["HIGH", "LOW", "Blinking", "Random"],
          "answer": 1
        },
        {
          "question": "What will this code continuously print to the serial monitor?\n\n```cpp\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  bool conditionA = true;\n  bool conditionB = false;\n  if (conditionA && conditionB) {\n    Serial.println(\"Both true\");\n  } else {\n    Serial.println(\"At least one false\");\n  }\n  delay(1000);\n}\n```",
          "options": ["\"Both true\"", "\"At least one false\"", "\"Both true\" and \"At least one false\" alternately", "Nothing"],
          "answer": 1
        }
            
    ];

    arduinoDays[12].quiz = [
      
        {
          "question": "What is the primary benefit of using a shift register like the 74HC595 with Arduino?",
          "options": [
            "It makes the Arduino run faster.",
            "It increases the number of available digital input/output pins.",
            "It provides Wi-Fi connectivity.",
            "It adds more memory to the Arduino."
          ],
          "answer": 1
        },
        {
          "question": "A Serial-In, Parallel-Out shift register receives data:",
          "options": [
            "All at once, simultaneously.",
            "One bit after another.",
            "Through an analog signal.",
            "Via a wireless connection."
          ],
          "answer": 1
        },
        {
          "question": "Which of the following is NOT one of the three main control pins for a 74HC595 shift register from an Arduino?",
          "options": [
            "Data Pin",
            "Clock Pin",
            "Latch Pin",
            "Analog Input Pin"
          ],
          "answer": 3
        },
        {
          "question": "What does the latchPin (ST_CP) on a 74HC595 typically do?",
          "options": [
            "It sends data to the Arduino.",
            "It shifts the data bits internally.",
            "It tells the shift register to display the received data on its outputs.",
            "It resets the shift register."
          ],
          "answer": 2
        },
        {
          "question": "If you want to turn on only the first LED (connected to Q0) of a 74HC595, which byte value would you send using shiftOut() (assuming LSBFIRST)?",
          "options": [
            "B00000000 (0)",
            "B10000000 (128)",
            "B00000001 (1)",
            "B11111111 (255)"
          ],
          "answer": 2
        },
        {
          "question": "If LEDs are connected to Q0, Q1, etc., what pattern will you observe from the LEDs?\n\n```cpp\nconst int dsPin = 2;\nconst int stcpPin = 3;\nconst int shcpPin = 4;\nvoid setup() {\n  pinMode(dsPin, OUTPUT);\n  pinMode(stcpPin, OUTPUT);\n  pinMode(shcpPin, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(stcpPin, LOW);\n  shiftOut(dsPin, shcpPin, LSBFIRST, 1);\n  digitalWrite(stcpPin, HIGH);\n  delay(500);\n  digitalWrite(stcpPin, LOW);\n  shiftOut(dsPin, shcpPin, LSBFIRST, 2);\n  digitalWrite(stcpPin, HIGH);\n  delay(500);\n}```",
          "options": [
            "All LEDs turn ON, then all OFF.",
            "The first LED turns ON, then the second LED turns ON, alternating.",
            "The first LED turns ON, then the second LED turns ON, then the first turns OFF.",
            "The first LED turns ON, then the second turns ON, with only one LED on at a time."
          ],
          "answer": 3
        },
        {
          "question": "If LEDs are connected to Q0 (LSB) through Q7 (MSB), and MSBFIRST is used, what will be the state of Q7 when B10101010 is sent?\n\n```cpp\nconst int myData = 5;\nconst int myLatch = 6;\nconst int myClock = 7;\nvoid setup() {\n  pinMode(myData, OUTPUT);\n  pinMode(myLatch, OUTPUT);\n  pinMode(myClock, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(myLatch, LOW);\n  shiftOut(myData, myClock, MSBFIRST, B10101010);\n  digitalWrite(myLatch, HIGH);\n  delay(1000);\n  digitalWrite(myLatch, LOW);\n  shiftOut(myData, myClock, MSBFIRST, B01010101);\n  digitalWrite(myLatch, HIGH);\n  delay(1000);\n}```",
          "options": [
            "ON",
            "OFF",
            "Blinking",
            "Cannot be determined"
          ],
          "answer": 0
        },
        {
          "question": "How many distinct patterns will be displayed on the 8 LEDs connected to the shift register in one full run of the for loop?\n\n```cpp\nconst int DATA_PIN = 2;\nconst int LATCH_PIN = 3;\nconst int CLOCK_PIN = 4;\nvoid setup() {\n  pinMode(DATA_PIN, OUTPUT);\n  pinMode(LATCH_PIN, OUTPUT);\n  pinMode(CLOCK_PIN, OUTPUT);\n}\nvoid loop() {\n  for (int i = 0; i < 256; i++) {\n    digitalWrite(LATCH_PIN, LOW);\n    shiftOut(DATA_PIN, CLOCK_PIN, LSBFIRST, i);\n    digitalWrite(LATCH_PIN, HIGH);\n    delay(10);\n  }\n}```",
          "options": [
            "8",
            "255",
            "256",
            "10"
          ],
          "answer": 2
        },
        {
          "question": "If the shiftOut() function call is missing from loop(), what will happen to the LEDs connected to the shift register?\n\n```cpp\nconst int DATA = 2;\nconst int LATCH = 3;\nconst int CLOCK = 4;\nvoid setup() {\n  pinMode(DATA, OUTPUT);\n  pinMode(LATCH, OUTPUT);\n  pinMode(CLOCK, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(LATCH, LOW);\n  digitalWrite(LATCH, HIGH);\n  delay(1000);\n}```",
          "options": [
            "They will all turn ON.",
            "They will all turn OFF.",
            "They will display a random pattern.",
            "They will retain their previous state, or be off if no data was ever sent."
          ],
          "answer": 3
        },
        {
          "question": "How many Arduino digital pins are used to control the 8 LEDs via the shift register in this code?\n\n```cpp\nconst int dataPinSR = 2;\nconst int latchPinSR = 3;\nconst int clockPinSR = 4;\nvoid updateLEDs(byte ledPattern) {\n  digitalWrite(latchPinSR, LOW);\n  shiftOut(dataPinSR, clockPinSR, LSBFIRST, ledPattern);\n  digitalWrite(latchPinSR, HIGH);\n}\nvoid setup() {\n  pinMode(dataPinSR, OUTPUT);\n  pinMode(latchPinSR, OUTPUT);\n  pinMode(clockPinSR, OUTPUT);\n  updateLEDs(0);\n}\nvoid loop() {\n  updateLEDs(B00001111);\n  delay(500);\n  updateLEDs(B11110000);\n  delay(500);\n}```",
          "options": [
            "1",
            "3",
            "8",
            "11"
          ],
          "answer": 1
        }
      
    ];        
    arduinoDays[13].quiz = [
      {
          "question": "Which type of signal has a continuous range of values, like temperature or light intensity?",
          "options": {
            "0": "Digital signal",
            "1": "Binary signal",
            "2": "Analog signal",
            "3": "Discrete signal"
          },
          "answer": 2
        },
        {
          "question": "What is the purpose of an Analog-to-Digital Converter (ADC) in an Arduino?",
          "options": {
            "0": "To make digital pins turn on and off faster.",
            "1": "To convert digital signals into analog voltages.",
            "2": "To convert continuous analog voltages into discrete digital numbers.",
            "3": "To communicate wirelessly."
          },
          "answer": 2
        },
        {
          "question": "What is the typical range of integer values returned by analogRead() on most standard Arduino boards (like Uno)?",
          "options": {
            "0": "0 to 1",
            "1": "0 to 255",
            "2": "0 to 1023",
            "3": "-512 to 511"
          },
          "answer": 2
        },
        {
          "question": "Which function is used to read a voltage from an analog input pin?",
          "options": {
            "0": "digitalRead()",
            "1": "pinMode()",
            "2": "analogRead()",
            "3": "readAnalog()"
          },
          "answer": 2
        },
        {
          "question": "What voltage does an analogRead() value of 1023 typically correspond to on an Arduino board?",
          "options": {
            "0": "0 Volts",
            "1": "1 Volts",
            "2": "3.3 Volts",
            "3": "5 Volts (or the reference voltage)"
          },
          "answer": 3
        },
        {
          "question": "What kind of values (for rawValue) would you expect to see printed if a variable voltage source (0-5V) is connected to A1?",
          "code": "const int ANALOG_INPUT_PIN = A1;\nint rawValue;\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  rawValue = analogRead(ANALOG_INPUT_PIN);\n  Serial.print(\"Raw: \");\n  Serial.println(rawValue);\n  delay(50);\n}",
          "options": {
            "0": "Only 0 or 1.",
            "1": "Numbers between 0 and 255.",
            "2": "Numbers between 0 and 1023.",
            "3": "Text like \"High\" or \"Low\"."
          },
          "answer": 2
        },
        {
          "question": "If the light sensor connected to A0 is in a very dim room, what would you most likely see printed to the serial monitor?",
          "code": "const int LIGHT_SENSOR_PIN = A0;\nint lightLevel;\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  lightLevel = analogRead(LIGHT_SENSOR_PIN);\n  if (lightLevel > 500) {\n    Serial.println(\"It's bright!\");\n  } else {\n    Serial.println(\"It's dark.\");\n  }\n  delay(200);\n}",
          "options": {
            "0": "\"It's bright!\" repeatedly.",
            "1": "\"It's dark.\" repeatedly.",
            "2": "Both messages alternate.",
            "3": "Nothing, an error will occur."
          },
          "answer": 1
        },
        {
          "question": "Is a pinMode() call strictly necessary for analogPin (A2) to be used with analogRead()?",
          "code": "void setup() {\n  Serial.begin(9600);\n  int analogPin = A2;\n}\nvoid loop() {\n  int value = analogRead(analogPin);\n  Serial.print(\"Value: \");\n  Serial.println(value);\n  delay(100);\n}",
          "options": {
            "0": "Yes, it must be set to INPUT.",
            "1": "Yes, it must be set to OUTPUT.",
            "2": "No, analog input pins are automatically configured for analogRead().",
            "3": "Only if you want to use it for digital I/O."
          },
          "answer": 2
        },
        {
          "question": "If the tempRaw value read from A3 is 511, what approximate temperature (in C) would be printed to the serial monitor based on the given scaling?",
          "code": "const int TEMP_SENSOR_PIN = A3;\nint tempRaw;\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  tempRaw = analogRead(TEMP_SENSOR_PIN);\n  float temperatureC = (tempRaw / 1023.0) * 100.0;\n  Serial.print(\"Temperature: \");\n  Serial.print(temperatureC);\n  Serial.println(\" C\");\n  delay(500);\n}",
          "options": {
            "0": "0 C",
            "1": "25 C",
            "2": "50 C",
            "3": "100 C"
          },
          "answer": 2
        },
        {
          "question": "What will this code continuously do?",
          "code": "void setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int valueA0 = analogRead(A0);\n  int valueA1 = analogRead(A1);\n  Serial.print(\"A0: \");\n  Serial.print(valueA0);\n  Serial.print(\" A1: \");\n  Serial.println(valueA1);\n  delay(200);\n}",
          "options": {
            "0": "Read a digital value from A0 and an analog value from A1.",
            "1": "Read analog values from both A0 and A1 and print them.",
            "2": "Only print \"A0: A1:\".",
            "3": "Cause an error because two analog pins are read in one loop."
          },
          "answer": 1
        }
     
    ];

    arduinoDays[14].quiz = [
  
        {
          "question": "If an LED is connected to a PWM-capable pin, and you set its duty cycle to 50%, how will it appear to your eyes?",
          "options": {
            "0": "Completely OFF.",
            "1": "Completely ON.",
            "2": "Half as bright.",
            "3": "Rapidly flickering."
          },
          "answer": 2
        },
        {
          "question": "What is the range of values you can use in the value parameter of the analogWrite(pin, value) function?",
          "options": {
            "0": "0 to 1",
            "1": "0 to 100",
            "2": "0 to 255",
            "3": "0 to 1023"
          },
          "answer": 2
        },
        {
          "question": "What is the \"voltage per step\" (or LSB voltage) of an ADC?",
          "options": {
            "0": "The maximum voltage input.",
            "1": "The minimum voltage input.",
            "2": "The smallest voltage change the ADC can detect.",
            "3": "The total range of voltages."
          },
          "answer": 2
        },
        {
          "question": "If an ADC has 8 bits of resolution and a reference voltage of 5V, what is the number of total steps?",
          "options": {
            "0": "8",
            "1": "64",
            "2": "256 (28)",
            "3": "1024"
          },
          "answer": 2
        },
        {
          "question": "A higher ADC resolution generally means:",
          "options": {
            "0": "Faster conversion speed.",
            "1": "Less precise readings.",
            "2": "More precise readings, detecting finer voltage changes.",
            "3": "The need for fewer analog pins."
          },
          "answer": 2
        },
        {
          "question": "What is the smallest voltage change (approximately) this system can detect and show as a change in calculatedVoltage if sensorRaw changes by 1 unit?",
          "code": "const float V_REF = 5.0;\nconst int MAX_ADC_VALUE = 1023;\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int sensorRaw = analogRead(A0);\n  float calculatedVoltage = (sensorRaw * V_REF) / MAX_ADC_VALUE;\n  Serial.print(\"Voltage: \");\n  Serial.println(calculatedVoltage, 4);\n  delay(100);\n}",
          "options": {
            "0": "5 Volts",
            "1": "1 Volt",
            "2": "0.0049 Volts (4.9 mV)",
            "3": "0.0001 Volts"
          },
          "answer": 2
        },
        {
          "question": "What value will be printed for \"Number of Steps:\"?",
          "code": "const int ANALOG_INPUT = A1;\nconst int BIT_RESOLUTION = 10;\nconst float VOLT_RANGE = 5.0;\nvoid setup() {\n  Serial.begin(9600);\n  int numSteps = 1 << BIT_RESOLUTION;\n  Serial.print(\"Number of Steps: \");\n  Serial.println(numSteps);\n}\nvoid loop() {}",
          "options": {
            "0": "10",
            "1": "256",
            "2": "512",
            "3": "1024"
          },
          "answer": 3
        },
        {
          "question": "Is pin 10 typically a PWM-capable pin on an Arduino Uno?",
          "code": "void setup() {\n  Serial.begin(9600);\n  // Missing pinMode for pin 10 (not needed for analogWrite, but good to note)\n}\nvoid loop() {\n  analogWrite(10, 200); // Set PWM on pin 10\n  Serial.println(\"PWM set to 200.\");\n  delay(500);\n}",
          "options": {
            "0": "No, it's a digital input only.",
            "1": "Yes, it's usually marked with a tilde (~).",
            "2": "Only if connected to an analog sensor.",
            "3": "Yes, but only for digitalWrite."
          },
          "answer": 1
        },
        {
          "question": "If a passive buzzer (controlled by PWM) is connected to BUZZER_PIN, what would you observe?",
          "code": "const int BUZZER_PIN = 3;\nint toneValue = 150;\nvoid setup() {\n  pinMode(BUZZER_PIN, OUTPUT);\n  Serial.begin(9600);\n}\nvoid loop() {\n  analogWrite(BUZZER_PIN, toneValue);\n  Serial.println(\"Buzzing...\");\n  delay(1000);\n  analogWrite(BUZZER_PIN, 0);\n  delay(1000);\n}",
          "options": {
            "0": "A continuous high-pitched tone.",
            "1": "A buzzing sound that turns on for 1 second, then off for 1 second.",
            "2": "No sound, as toneValue is not a frequency.",
            "3": "Only \"Buzzing...\" printed on serial, no sound."
          },
          "answer": 1
        },
        {
          "question": "How many times will analogWrite(11, val); be called within one full execution of the for loop (from 0 to 255, incrementing by 5)?",
          "code": "void setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  for (int val = 0; val <= 255; val += 5) {\n    analogWrite(11, val);\n    delay(20);\n  }\n  delay(1000);\n}",
          "options": {
            "0": "255 times",
            "1": "51 times (255 / 5 = 51)",
            "2": "52 times (0, 5, 10, ... 250, 255)",
            "3": "1 time"
          },
          "answer": 2
        }
      
      
    ];

    arduinoDays[15].quiz = [
      
        {
          "question": "What is the 'reference voltage' in the context of analogRead()?",
          "options": [
            "The voltage supplied to the GND pin.",
            "The voltage that corresponds to the 0 reading of the ADC.",
            "The maximum voltage that corresponds to the 1023 reading of the ADC.",
            "The voltage used to power external LEDs."
          ],
          "answer": 2
        },
        {
          "question": "What is the default analog reference used by an Arduino Uno?",
          "options": [
            "Internal 1.1V",
            "Internal 2.56V",
            "The 5V operating voltage (Vcc)",
            "External reference from the AREF pin"
          ],
          "answer": 2
        },
        {
          "question": "If you want to read a very small voltage (e.g., from 0V to 1V) with higher precision using an Arduino Uno, which analogReference() option would be most suitable?",
          "options": [
            "DEFAULT",
            "INTERNAL1V1",
            "EXTERNAL (without providing an external reference)",
            "INTERNAL2V56"
          ],
          "answer": 1
        },
        {
          "question": "Which Arduino pin is used to provide a custom external voltage reference when analogReference(EXTERNAL) is selected?",
          "options": [
            "GND",
            "5V",
            "AREF",
            "A0"
          ],
          "answer": 2
        },
        {
          "question": "What is the maximum safe voltage you should apply to the AREF pin when using analogReference(EXTERNAL)?",
          "options": [
            "3.3V",
            "5V",
            "12V",
            "Any voltage below 20V"
          ],
          "answer": 1
        },
        {
          "question": "If a sensor outputs 2.0V to SENSOR_PIN and analogReference(INTERNAL) is set, what value will analogRead return?",
          "options": [
            "0",
            "511",
            "1023",
            "200"
          ],
          "answer": 2
        },
        {
          "question": "If the actual voltage on SENSOR_PIN is 0.2V and analogReference(DEFAULT) is set, what message will be printed?",
          "options": [
            "Voltage is low.",
            "Voltage is fine.",
            "An error will occur.",
            "Nothing."
          ],
          "answer": 0
        },
        {
          "question": "If no analogReference() is called, what is the default voltage used by analogRead on an Arduino Uno?",
          "options": [
            "1.1V",
            "2.56V",
            "The 5V operating voltage of the Uno.",
            "3.3V"
          ],
          "answer": 2
        },
        {
          "question": "If a stable 1.0V signal is applied to A3 and AREF is set to 2.0V externally, what will the converted voltage be?",
          "options": [
            "0.5V",
            "1.0V",
            "2.0V",
            "4.0V"
          ],
          "answer": 1
        },
        {
          "question": "If analogReference(INTERNAL) is used and a sensor outputs 3.0V to A4, what would analogRead(A4) likely return?",
          "options": [
            "0",
            "Roughly 300 (scaled for 1.1V range)",
            "1023",
            "An error"
          ],
          "answer": 2
        }
      
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
                {feedback[idx] === 'incorrect' && (
                  <div className="mt-1 text-sm text-yellow-300">
                    Correct answer: {arduinoQuizQuestions[idx].options[arduinoQuizQuestions[idx].answer]}
                  </div>
                )}
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
  summary: "Start your journey with Arduino! Learn what Arduino is, why it's popular, and how this course is structured.",
  tags: ['Overview', 'Getting Started'],
  image: '../public/pic1.png',
  content:
    '# Welcome to Arduino!\n\n' +
    'Arduino is an open-source electronics platform based on easy-to-use hardware and software. ' +
    "It's intended for anyone making interactive projects. This course will guide you through the basics and beyond.\n\n" +
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
                {feedback[idx] === 'incorrect' && (
                  <div className="mt-1 text-sm text-yellow-300">
                    Correct answer: {questions[idx].options[questions[idx].answer]}
                  </div>
                )}
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
            <h1 className="text-4xl font-bold mb-8 text-black flex items-center gap-2">
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
      <h1 className="text-4xl font-bold mb-8 text-black flex items-center gap-2">
        🎓 Learning Courses
      </h1>
      <p className="text-brown-300 mb-8 text-lg">
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
            <span className="text-white/80 text-sm">16 modules</span>
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

            </div>
    </div>
  );
};

export default CoursePage;


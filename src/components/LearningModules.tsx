import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
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
    day: "4",
  title: "Variables and Data Types",
  summary: "Learn how to store and manage information in Arduino using variables. Understand different data types, naming rules, and how they apply to real-world use cases like sensors, LEDs, and logic.",
  tags: ["Beginner", "Variables", "Data Types", "Arduino"],
  image: "/pic4.png",
  content:
    "# 🔤 **Variables and Data Types**\n" +
    "\n" +
    "## 📦 **What Are Variables?**\n" +
    "Variables are containers that store data values in your Arduino programs. Think of them as labeled boxes that hold information like numbers or letters.\n" +
    "\n" +
    "### 🛠️ Why do we need variables?\n" +
    "- Store sensor readings\n" +
    "- Keep track of pin numbers\n" +
    "- Save calculation results\n" +
    "- Store temporary values during program execution\n" +
    "\n" +
    "### 📌 Variable Declaration Syntax:\n" +
    "`dataType variableName = value;`\n" +
    "\n" +
    "### 📛 Variable Naming Rules:\n" +
    "- Start with a letter or underscore (`_`)\n" +
    "- Can include letters, numbers, and underscores\n" +
    "- No spaces or special characters\n" +
    "- Case-sensitive (`myVar` ≠ `myvar`)\n" +
    "- Cannot use reserved words (like `int`, `if`, etc.)\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## 📘 **Common Arduino Data Types**\n" +
    "\n" +
    "**🔹 int (Integer):** Whole numbers from -32,768 to 32,767  \n" +
    "`int ledPin = 13;`\n" +
    "\n" +
    "**🔹 float (Floating Point):** Decimal numbers with precision (6–7 digits)  \n" +
    "`float voltage = 3.14;`\n" +
    "\n" +
    "**🔹 char (Character):** Single characters or small integers (-128 to 127)  \n" +
    "`char grade = 'A';`\n" +
    "\n" +
    "**🔹 bool (Boolean):** Only `true` or `false` values  \n" +
    "`bool systemReady = true;`\n" +
    "\n" +
    "**🔹 long (Long Integer):** Large numbers from -2,147,483,648 to 2,147,483,647  \n" +
    "`long counter = 50000;`\n" +
    "\n" +
    "**🔹 byte (Byte):** Small positive integers from 0 to 255  \n" +
    "`byte brightness = 255;`\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## 🧪 **Examples**\n" +
    "\n" +
    "**Sensor Data Storage:**\n" +
    "```cpp\n" +
    "int lightSensor = 512;\n" +
    "float voltage = 2.5;\n" +
    "bool dayTime = true;\n" +
    "```\n" +
    "\n" +
    "**LED Control:**\n" +
    "```cpp\n" +
    "int redPin = 9;\n" +
    "int greenPin = 10;\n" +
    "byte redBrightness = 200;\n" +
    "byte greenBrightness = 50;\n" +
    "```\n" +
    "\n" +
    "**Temperature Monitoring:**\n" +
    "```cpp\n" +
    "float currentTemp = 22.7;\n" +
    "float maxTemp = 30.0;\n" +
    "bool overheated = false;\n" +
    "```\n",
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

  questions: [],
},
  {
    day: '6',
    title: "Loops in Arduino",
    summary: "Understand for, while, and do-while loops in Arduino: why we use them, how they work, and when to choose each. Includes clear syntax, step-by-step flow, and practical serial examples.",
    tags: ["Beginner", "Loops", "Control Flow", "Arduino"],
    image: "/pic7.png",
    content:
    "# 🔁 **Loops**\n" +
    "\n" +
    "Loops let your Arduino **repeat a block of code** multiple times — perfect for tasks that require repetition (very common in interactive electronics!).\n" +
    "\n" +
    "## ✅ **Why Use Loops?**\n" +
    "- **Efficiency** — Avoid writing repetitive code\n" +
    "- **Automation** — Perform actions many times without manual effort\n" +
    "- **Dynamic behavior** — Run until a condition changes during execution\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## 🔂 **Types of Loops in Arduino**\n" +
    "- `for`\n" +
    "- `while`\n" +
    "- `do...while`\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## 1) **for loop**\n" +
    "Use when you **know exactly how many times** the code should repeat.\n" +
    "\n" +
    "**Syntax**\n" +
    "```cpp\n" +
    "for (initialization; condition; increment/decrement) {\n" +
    "  // Code to be repeated\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "**Steps**\n" +
    "1. **Initialization** – runs once (e.g., `int i = 0;`)\n" +
    "2. **Condition** – checked before each iteration; if `false`, loop stops\n" +
    "3. **Body Execution** – the code inside the loop\n" +
    "4. **Increment/Decrement** – runs after each iteration (e.g., `i++`)\n" +
    "\n" +
    "**Example**\n" +
    "```cpp\n" +
    "void setup() {\n" +
    "  Serial.begin(9600);\n" +
    "  Serial.println(\"Starting for loop...\");\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "  for (int i = 0; i < 5; i++) { // i = 0,1,2,3,4\n" +
    "    Serial.print(\"Count: \");\n" +
    "    Serial.println(i);\n" +
    "  }\n" +
    "  Serial.println(\"For loop finished!\");\n" +
    "  while (true) {} // prevent spamming loop()\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## 2) **while loop**\n" +
    "Use when you want to repeat code **as long as a condition stays true**. You often **don't know** how many times it will run.\n" +
    "\n" +
    "**Syntax**\n" +
    "```cpp\n" +
    "while (condition) {\n" +
    "  // Code to be repeated\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "**Step**\n" +
    "- The **condition is checked before each repetition**. If it's `false`, the loop stops.\n" +
    "\n" +
    "**Example**\n" +
    "```cpp\n" +
    "int currentCount = 0;\n" +
    "const int MAX_COUNT = 3;\n" +
    "\n" +
    "void setup() {\n" +
    "  Serial.begin(9600);\n" +
    "  Serial.println(\"Starting while loop...\");\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "  currentCount = 0;\n" +
    "  while (currentCount < MAX_COUNT) {\n" +
    "    Serial.print(\"Current while count: \");\n" +
    "    Serial.println(currentCount);\n" +
    "    currentCount = currentCount + 1;\n" +
    "  }\n" +
    "  Serial.println(\"While loop finished!\");\n" +
    "  while (true) {}\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## 3) **do...while loop**\n" +
    "Similar to `while`, but the **body runs at least once** before the condition is checked.\n" +
    "\n" +
    "**Syntax**\n" +
    "```cpp\n" +
    "do {\n" +
    "  // Code to be repeated\n" +
    "} while (condition); // Note the semicolon!\n" +
    "```\n" +
    "\n" +
    "**Steps**\n" +
    "1. Run the block **once**\n" +
    "2. **Then** check the condition\n" +
    "3. Repeat if condition is `true`\n" +
    "\n" +
    "**Example**\n" +
    "```cpp\n" +
    "int attempt = 0;\n" +
    "bool success = false;\n" +
    "\n" +
    "void setup() {\n" +
    "  Serial.begin(9600);\n" +
    "  Serial.println(\"Starting do-while loop...\");\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "  attempt = 0;\n" +
    "  success = false;\n" +
    "\n" +
    "  do {\n" +
    "    Serial.print(\"Attempt number: \");\n" +
    "    Serial.println(attempt);\n" +
    "    attempt = attempt + 1;\n" +
    "    if (attempt >= 2) {\n" +
    "      success = true;\n" +
    "    }\n" +
    "  } while (success == false && attempt < 5);\n" +
    "\n" +
    "  Serial.println(\"Do-while loop finished!\");\n" +
    "  while (true) {}\n" +
    "}\n" +
    "```\n",
  questions: []
},  
  {
    "day": "7",
    "title": "Functions in Arduino",
    "summary": "Understand what functions are, why they are used, how to define them, and how to call them. Includes examples for void functions, functions with parameters, and return values.",
    "tags": [
      "Beginner",
      "Functions",
      "Code Structure",
      "Arduino"
    ],
    "image": "/pic8.png",
    "content": "**🔧 What are Functions?**\n\nImagine you have a big task, like preparing a report. Instead of writing every step from scratch, you break it into smaller jobs like *gather data*, *analyze results*, and *format summary*.\n\nIn programming, a **function** is just like one of these jobs. It's a **self-contained block of code** that performs a specific task. You can name this block and call it whenever needed.\n\nExamples of built-in Arduino functions:\n- `void setup()`\n- `void loop()`\n- `Serial.print()`\n- `Serial.println()`\n\n---\n\n**🎯 Why Use Functions?**\n\n- **Organization**: Break down large programs into smaller, manageable parts.\n- **Reusability**: Write once, use multiple times.\n- **Debugging**: Easier to isolate and fix issues.\n- **Modularity**: Code becomes more adaptable and maintainable.\n\n---\n\n**✍️ Defining Your Own Functions**\n\nTo define a function, tell Arduino:\n- What value it returns\n- Its name\n- Its input parameters (if any)\n- The code it should run\n\n**Syntax:**\n```cpp\nreturnType functionName(parameterType parameterName) {\n  // Code to execute\n}\n```\n\n- `returnType`: `void`, `int`, `float`, `char`, etc.\n- `functionName`: Describe what the function does (e.g. `displayWelcomeMessage`)\n- `parameterType parameterName`: Optional inputs (arguments)\n\n---\n\n**🧪 Example 1: No Return, No Parameters**\n```cpp\nvoid printWelcomeMessage() {\n  Serial.println(\"--- Welcome to CircuitCode! ---\");\n  Serial.println(\"Starting program...\");\n}\n```\n\n**🧪 Example 2: One Parameter, No Return**\n```cpp\nvoid greetByName(char initial) {\n  Serial.print(\"Hello, \");\n  Serial.print(initial);\n  Serial.println(\"!\");\n}\n```\n\n**🧪 Example 3: Parameters and Return Value**\n```cpp\nfloat calculateAverage(int num1, int num2, int num3) {\n  float sum = num1 + num2 + num3;\n  float average = sum / 3.0;\n  return average;\n}\n```\n\n---\n\n**📞 Calling Your Functions**\n\nYou can call your functions from `setup()`, `loop()`, or other functions.\n\n**Example:**\n```cpp\nvoid setup() {\n  Serial.begin(9600);\n  float avgScore = calculateAverage(50, 80, 90);\n  Serial.print(\"Average score: \");\n  Serial.println(avgScore);\n}\n\nvoid loop() {\n  Serial.println(\"Looping and printing a message...\");\n  printWelcomeMessage();\n}\n```\n",
    questions: []
  },
  {
    "day": "8",
    "title": "Digital Pins in Arduino",
    "summary": "Explore Arduino's digital pins, understanding their two states (HIGH/LOW) and how to configure them using `pinMode()`. Learn to control outputs with `digitalWrite()` and read inputs with `digitalRead()`, including a practical LED blinking example.",
    "tags": ["Beginner", "Digital I/O", "Pins", "Arduino", "Hardware Control"],
    "image": "/pic9.png",
    "content": "**🔌 What are Digital Pins?**\n\nDigital pins are the header pins labeled 0 to 13 on an Arduino board. Interestingly, the Analog pins A0-A5 can also function as digital pins! These pins operate in one of two states:\n\n- **HIGH**: Represents an \"ON\" state, typically 5 volts (V).\n- **LOW**: Represents an \"OFF\" state, typically 0 volts (V) or ground (GND).\n\n---\n\n**🔄 pinMode() Function**\n\nBefore you can use a digital pin, you must tell the Arduino whether it will be an **input** (to read a signal) or an **output** (to send a signal).\n\n- **OUTPUT Mode**: When a digital pin is set to `OUTPUT`, your Arduino can **send** electricity out through that pin, typically to power components like an LED.\n- **INPUT Mode**: When a digital pin is set to `INPUT`, your Arduino can **receive** electricity coming into that pin, for instance, from a button press.\n\n---\n\n**⚙️ Key Functions for Digital Pins**\n\nHere are the essential functions you'll use to interact with digital pins:\n\n**1. `pinMode(pin, mode)`**\n\nThis function is used to configure a specific digital pin as either an `INPUT` or an `OUTPUT`.\n\n- `pin`: The number of the digital pin you want to configure (e.g., 13, 7, A0).\n- `mode`: Either `INPUT` or `OUTPUT`.\n\n**Example:**\n```cpp\nvoid setup(){\n  pinMode(13, OUTPUT); // Sets digital pin 13 to send signals out.\n  pinMode(2, INPUT);   // Sets digital pin 2 to listen for signals.\n}\n```\n\n**2. `digitalWrite(pin, value)`**\n\nThis function is used to send a `HIGH` (ON) or `LOW` (OFF) signal from a digital pin that has been configured as an `OUTPUT`.\n\n- `pin`: The number of the digital pin you want to control.\n- `value`: Either `HIGH` or `LOW`.\n\n**Example:**\n```cpp\ndigitalWrite(13, HIGH); // Sends 5V out from pin 13 (turns an LED on).\ndigitalWrite(13, LOW);  // Sends 0V out from pin 13 (turns an LED off).\n```\n\n**3. `digitalRead(pin)`**\n\nThis function is used to read the state of a digital pin that has been configured as an `INPUT`. It returns either `HIGH` or `LOW`.\n\n- `pin`: The number of the digital pin you want to read.\n\n**Example:**\n```cpp\nint buttonState = digitalRead(2); // Reads the state of pin 2 and stores it in buttonState.\n```\n\n---\n\n**💡 Example: Blinking an LED**\n\nThis classic example demonstrates how to use `pinMode()` and `digitalWrite()` to make an LED connected to pin 13 blink.\n\n```cpp\nvoid setup() {\n  Serial.begin(9600);           // Initialize serial communication\n  Serial.println(\"LED Blinker Started!\");\n  pinMode(13, OUTPUT);          // Set digital pin 13 as an OUTPUT to control the LED\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);       // Turn the LED on (send HIGH signal to pin 13)\n  Serial.println(\"LED is ON\");\n  delay(1000);                  // Wait for 1 second (1000 milliseconds)\n  digitalWrite(13, LOW);        // Turn the LED off (send LOW signal to pin 13)\n  Serial.println(\"LED is OFF\");\n  delay(1000);                  // Wait for 1 second\n}\n```",
    questions: []
  },
{
  "day": "9",
  "title": "Pull-up and Pull-down Resistors",
  "summary": "Understand the concept of a 'floating pin' and how pull-up and pull-down resistors provide stable input readings. Learn about the `INPUT_PULLUP` mode for simplifying button circuits in Arduino.",
  "tags": ["Beginner", "Input", "Resistors", "Pull-up", "Pull-down", "Arduino"],
  "image": "/pic10.png",
  "content": "**👻 The \"Floating Pin\"**\n\nImagine a digital input pin configured as `INPUT` but not connected to any specific voltage source through a component like a button. This pin is said to be \"floating.\"\n\nA floating pin is problematic because `digitalRead()` might return `HIGH` sometimes and `LOW` at other times, seemingly randomly, even if nothing is physically happening. This makes reliable input sensing impossible.\n\nTo fix this, we need to \"pull\" the pin to a known state (`HIGH` or `LOW`) when the input device (like a button) isn't actively providing a signal. This is where pull-up and pull-down resistors come in.\n\n---\n\n**⬆️ Pull-up Resistors**\n\nA pull-up resistor connects your digital input pin to the `HIGH` voltage (5V on most Arduinos).\n\n- When the button is **not pressed**, the resistor \"pulls up\" the pin's voltage to `HIGH` (5V), giving it a stable `HIGH` reading.\n- When the button is **pressed**, it typically connects the pin directly to `GND`. In this state, the pin reads `LOW`.\n\nThis configuration is common for buttons, where a `LOW` reading indicates a press.\n\n---\n\n**⬇️ Pull-down Resistors**\n\nA pull-down resistor connects your digital input pin to the `LOW` voltage (0V or `GND`).\n\n- When the button is **not pressed**, the resistor \"pulls down\" the pin's voltage to `LOW` (0V), giving it a stable `LOW` reading.\n- When the button is **pressed**, it typically connects the pin directly to `HIGH` (5V). In this state, the pin reads `HIGH`.\n\nThis configuration means a `HIGH` reading indicates a button press.\n\n---\n\n**💻 `INPUT_PULLUP` Mode**\n\nArduino provides a convenient built-in pull-up resistor that you can activate with the `INPUT_PULLUP` mode in `pinMode()`:\n\n```cpp\npinMode(pin, INPUT_PULLUP);\n```\n\n- When you use `INPUT_PULLUP`, the pin will be `HIGH` when the button is not pressed (due to the internal pull-up).\n- Similar to an external pull-up resistor setup, a button press (connecting the pin to `GND`) will result in a `LOW` reading.\n\n---\n\n**Example: Button Controlled LED using `INPUT_PULLUP`**\n\n```cpp\nconst int switchPin = 5;    // Switch connected to digital pin 5\nconst int ledPin = 13;      // Onboard LED\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP); // Enable internal pull-up resistor on pin 5\n  pinMode(ledPin, OUTPUT);          // Set the LED pin as an OUTPUT\n}\n\nvoid loop() {\n  // Reads LOW when switch is ON (closed to GND), HIGH when OFF (open)\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);   // Turn on LED when switch is closed\n  } else {\n    digitalWrite(ledPin, LOW);    // Turn off LED when switch is open\n  }\n}\n```",
  questions: []
},
{
  "day": "10",
  "title": "Debouncing Techniques",
  "summary": "Understand why mechanical buttons 'bounce' and how this causes issues for fast microcontrollers like Arduino. Learn about debouncing as a solution, focusing on software debouncing using `delay()` to ensure reliable input readings.",
  "tags": ["Beginner", "Input", "Debouncing", "Software", "Hardware", "Arduino"],
  "image": "/pic11.png",
  "content": "**⚡ Digital Input Pins**\n\nDigital input pins allow Arduino to \"read\" or \"sense\" whether an electrical signal on that pin is `HIGH` (ON, usually 5V) or `LOW` (OFF, usually 0V). This is perfect for simple input devices like buttons and switches, which are either open or closed.\n\n**How Buttons and Switches Work**\n\nA button or a simple switch acts like a gate for electricity:\n\n- When a button is **not pressed (open)**, it breaks the connection, and no electricity flows through it.\n- When a button is **pressed (closed)**, it completes the connection, allowing electricity to flow.\n\nBy connecting a button to a digital input pin, your Arduino can detect when this connection is made or broken.\n\n---\n\n**🤯 What is Bounce?**\n\nWhen you press a mechanical button or flip a switch, the metal contacts inside don't connect or disconnect perfectly cleanly. Instead, they literally \"bounce\" against each other a few times before settling into a stable `ON` or `OFF` state.\n\n**Why is Bounce a Problem for Arduino?**\n\nArduino is incredibly fast. When it reads a digital pin, it samples the voltage thousands or millions of times per second. If a button \"bounces\" from `LOW` to `HIGH` and back several times within a few milliseconds (even if you only pressed it once), your Arduino will see each of those rapid changes as separate presses or releases.\n\n**Example:**\n\nYou press a button once. Arduino sees: `LOW`, `HIGH`, `LOW`, `HIGH`, `LOW`, `HIGH`, `LOW`... then finally `LOW` stable.\n\n**Result:** Your code might think you pressed the button three or four times, even though you only pressed it once.\n\n---\n\n**🧹 Debouncing**\n\n**Debouncing** is the technique used to filter out these unwanted, rapid fluctuations caused by mechanical bounce, ensuring that a single physical press or release is registered as only one stable event.\n\nThere are two main approaches:\n\n- **Hardware Debouncing**: Adding physical components like capacitors and resistors to your circuit to smooth out the electrical signal before it even reaches the Arduino pin.\n- **Software Debouncing**: Writing code that \"waits out\" the bounce period, ignoring any quick, unstable changes. This is often simpler for beginners and doesn't require extra components.\n\n---\n\n**⏳ Simple Software Debouncing with `delay()`**\n\nMost button bounces settle within 20 to 50 milliseconds. So, adding a `delay(50)` after an initial button state change is a common and effective debouncing method for many applications.\n\n**Example: Debounced Button to Toggle LED**\n\n```cpp\nconst int buttonPin = 2; // Button connected to digital pin 2\nconst int ledPin = 13;   // Onboard LED connected to digital pin 13\n\nint buttonState = 0;     // Variable to store button state\n\nvoid setup() {\n  pinMode(buttonPin, INPUT_PULLUP); // Use internal pull-up for the button\n  pinMode(ledPin, OUTPUT);          // Set the LED pin as an output\n  Serial.begin(9600);               // Start serial communication for debugging\n  Serial.println(\"Debounce Example Started!\");\n}\n\nvoid loop() {\n  // Check if the button is pressed (LOW, due to INPUT_PULLUP)\n  if (digitalRead(buttonPin) == LOW) {\n    delay(50); // Debounce delay: Wait for the bounces to settle\n\n    // After the delay, check again if the button is still pressed\n    if (digitalRead(buttonPin) == LOW) {\n      digitalWrite(ledPin, !digitalRead(ledPin)); // Toggle LED state\n      Serial.print(\"LED Toggled! Current state: \");\n      Serial.println(digitalRead(ledPin) == HIGH ? \"ON\" : \"OFF\");\n\n      // Wait for the button to be released to prevent rapid toggling\n      while (digitalRead(buttonPin) == LOW) {\n        // Do nothing, just wait for the button to go HIGH (released)\n      }\n    }\n  }\n}\n```",
  questions: []
},
{
  
  "day": "11",
  "title": "Digital Logic Gates",
  "summary": "Discover the fundamental building blocks of digital circuits: logic gates. Learn how AND, OR, NOT, and XOR gates operate based on specific logical rules, and how their behavior can be simulated in Arduino code.",
  "tags": ["Beginner", "Logic Gates", "Digital Logic", "Arduino", "Programming"],
  "image": "/pic12.png",
  "content": "**🧠 What are Digital Logic Gates?**\n\nDigital logic gates are the fundamental building blocks of all digital circuits. They take one or more digital inputs (which are either `HIGH`/true or `LOW`/false) and produce a single digital output based on a specific logical rule.\n\nThink of them as tiny decision-makers within a circuit. In Arduino programming, we don't usually wire up physical logic gate chips. Instead, we simulate their behavior using logical operators (`&&` for AND, `||` for OR, `!` for NOT, `!=` for XOR) in our code.\n\n---\n\n**💡 Basic Logic Gates**\n\nHere are the most common basic logic gates:\n\n**1. AND Gate (`&&`)**\n\n- The output is `HIGH` (true) **ONLY IF ALL** of its inputs are `HIGH` (true). Otherwise, the output is `LOW` (false).\n\n**Truth Table:**\n\n| Input A | Input B | Output (A AND B) |\n| :------ | :------ | :--------------- |\n| LOW (0) | LOW (0) | LOW (0)          |\n| LOW (0) | HIGH (1)| LOW (0)          |\n| HIGH (1)| LOW (0) | LOW (0)          |\n| HIGH (1)| HIGH (1)| HIGH (1)         |\n\n**Arduino Code Analogy:** `if (inputA_state && inputB_state)`\n\n**2. OR Gate (`||`)**\n\n- The output is `HIGH` (true) **IF AT LEAST ONE** of its inputs is `HIGH` (true). The output is `LOW` (false) only if ALL inputs are `LOW`.\n\n**Truth Table:**\n\n| Input A | Input B | Output (A OR B) |\n| :------ | :------ | :-------------- |\n| LOW (0) | LOW (0) | LOW (0)         |\n| LOW (0) | HIGH (1)| HIGH (1)        |\n| HIGH (1)| LOW (0) | HIGH (1)        |\n| HIGH (1)| HIGH (1)| HIGH (1)        |\n\n**Arduino Code Analogy:** `if (inputA_state || inputB_state)`\n\n**3. NOT Gate (`!`)**\n\n- The output is the **opposite** of its single input. If the input is `HIGH`, the output is `LOW`. If the input is `LOW`, the output is `HIGH`.\n\n**Truth Table:**\n\n| Input A | Output (NOT A) |\n| :------ | :------------- |\n| LOW (0) | HIGH (1)       |\n| HIGH (1)| LOW (0)        |\n\n**Arduino Code Analogy:** `if (!inputA_state)` (e.g., `if (!isButtonPressed)` means \"if the button is NOT pressed\")\n\n**4. XOR Gate (`^` or `!=`)**\n\n- The output is `HIGH` (true) **IF ONLY ONE** of its inputs is `HIGH` (true), but NOT if both are `HIGH` or both are `LOW`.\n\n**Truth Table:**\n\n| Input A | Input B | Output (A XOR B) |\n| :------ | :------ | :--------------- |\n| LOW (0) | LOW (0) | LOW (0)          |\n| LOW (0) | HIGH (1)| HIGH (1)         |\n| HIGH (1)| LOW (0) | HIGH (1)         |\n| HIGH (1)| HIGH (1)| LOW (0)          |\n\n**Arduino Code Analogy:** `if (inputA_state != inputB_state)`\n\n---\n\n**Code Examples: Simulating Logic Gates with Arduino**\n\nThese examples use buttons (connected with `INPUT_PULLUP` so `LOW` means active/pressed) as inputs and an LED on pin 13 as the output.\n\n**1. AND Gate Example**\n\n```cpp\nconst int INPUT_PIN_A = 2;\nconst int INPUT_PIN_B = 3;\nconst int OUTPUT_LED_PIN = 13;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n  pinMode(INPUT_PIN_B, INPUT_PULLUP);\n  pinMode(OUTPUT_LED_PIN, OUTPUT);\n  Serial.println(\"AND Gate Simulator Ready!\");\n}\n\nvoid loop() {\n  // Read inputs; LOW means the button is pressed (active)\n  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n  bool inputB_active = (digitalRead(INPUT_PIN_B) == LOW);\n\n  // AND logic: Output HIGH if both inputs are active\n  if (inputA_active && inputB_active) {\n    digitalWrite(OUTPUT_LED_PIN, HIGH);\n    Serial.println(\"AND Gate: Output HIGH\");\n  } else {\n    digitalWrite(OUTPUT_LED_PIN, LOW);\n    Serial.println(\"AND Gate: Output LOW\");\n  }\n  delay(500); // Small delay to make serial output readable\n}\n```\n\n**2. OR Gate Example**\n\n```cpp\nconst int INPUT_PIN_A = 2;\nconst int INPUT_PIN_B = 3;\nconst int OUTPUT_LED_PIN = 13;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n  pinMode(INPUT_PIN_B, INPUT_PULLUP);\n  pinMode(OUTPUT_LED_PIN, OUTPUT);\n  Serial.println(\"OR Gate Simulator Ready!\");\n}\n\nvoid loop() {\n  // Read inputs; LOW means the button is pressed (active)\n  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n  bool inputB_active = (digitalRead(INPUT_PIN_B) == LOW);\n\n  // OR logic: Output HIGH if at least one input is active\n  if (inputA_active || inputB_active) {\n    digitalWrite(OUTPUT_LED_PIN, HIGH);\n    Serial.println(\"OR Gate: Output HIGH\");\n  } else {\n    digitalWrite(OUTPUT_LED_PIN, LOW);\n    Serial.println(\"OR Gate: Output LOW\");\n  }\n  delay(500); // Small delay to make serial output readable\n}\n```\n\n**3. NOT Gate Example**\n\n```cpp\nconst int INPUT_PIN_A = 2;\nconst int OUTPUT_LED_PIN = 13;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n  pinMode(OUTPUT_LED_PIN, OUTPUT);\n  Serial.println(\"NOT Gate Simulator Ready!\");\n}\n\nvoid loop() {\n  // Read input; LOW means the button is pressed (active)\n  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n\n  // NOT logic: Output HIGH if the input is NOT active (i.e., button is not pressed)\n  if (!inputA_active) {\n    digitalWrite(OUTPUT_LED_PIN, HIGH);\n    Serial.println(\"NOT Gate: Output HIGH\");\n  } else {\n    digitalWrite(OUTPUT_LED_PIN, LOW);\n    Serial.println(\"NOT Gate: Output LOW\");\n  }\n  delay(500); // Small delay to make serial output readable\n}\n```\n\n**4. XOR Gate Example**\n\n```cpp\nconst int INPUT_PIN_A = 2;\nconst int INPUT_PIN_B = 3;\nconst int OUTPUT_LED_PIN = 13;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(INPUT_PIN_A, INPUT_PULLUP);\n  pinMode(INPUT_PIN_B, INPUT_PULLUP);\n  pinMode(OUTPUT_LED_PIN, OUTPUT);\n  Serial.println(\"XOR Gate Simulator Ready!\");\n}\n\nvoid loop() {\n  // Read inputs; LOW means the button is pressed (active)\n  bool inputA_active = (digitalRead(INPUT_PIN_A) == LOW);\n  bool inputB_active = (digitalRead(INPUT_PIN_B) == LOW);\n\n  // XOR logic: Output HIGH if ONLY ONE input is active\n  if (inputA_active != inputB_active) { // '!=' is the C/C++ operator for XOR logic on booleans\n    digitalWrite(OUTPUT_LED_PIN, HIGH);\n    Serial.println(\"XOR Gate: Output HIGH\");\n  } else {\n    digitalWrite(OUTPUT_LED_PIN, LOW);\n    Serial.println(\"XOR Gate: Output LOW\");\n  }\n  delay(500); // Small delay to make serial output readable\n}\n```"
,questions: []
},
{
  "day": "12",
  "title": "Shift Registers",
  "summary": "Discover how shift registers act as pin multipliers, allowing you to control multiple outputs (like LEDs) using a minimal number of Arduino pins. Learn about the 74HC595 (Serial-In, Parallel-Out) and the `shiftOut()` function.",
  "tags": ["Intermediate", "Shift Register", "74HC595", "Output Expansion", "Arduino", "Hardware"],
  "image": "/pic13.png",
  "content": "**💡 What is a Shift Register?**\n\nA shift register is a special type of integrated circuit (IC) or \"chip\" that allows you to control many output (or input) pins using a very small number of Arduino's digital pins. It essentially acts as a **pin multiplier**.\n\nThe most common type of shift register for extending outputs is a **Serial-In, Parallel-Out** shift register, like the popular **74HC595**. This means you send data to it *serially* (one bit after another, like sending letters in a word one at a time using a few Arduino pins), and the shift register then outputs that data *in parallel* all at once on many pins.\n\n---\n\n**🚧 The Problem: Limited Pins**\n\nAn Arduino Uno has about 14 digital I/O pins. If you need 8 LEDs, that's 8 pins used. If you need 16 LEDs, you'd typically be stuck! A shift register lets you control 8 LEDs using **only 3** of your Arduino's pins. If you chain multiple shift registers together, you can control 16, 24, or even more LEDs with those **same 3 Arduino pins**!\n\n---\n\n**🔗 How it Works: Key Pins**\n\nTo communicate with a 74HC595 shift register, your Arduino uses three main pins:\n\n- **Data Pin (DS / SER)**: This is where your Arduino sends the actual data one bit at a time. Each `HIGH` or `LOW` signal represents a single bit (0 or 1).\n- **Clock Pin (SH_CP / SRCLK)**: This pin tells the shift register to \"shift\" the next bit of data from the Data Pin into its internal memory. A pulse (transition from LOW to HIGH and back to LOW) on this pin clocks in one bit.\n- **Latch Pin (ST_CP / RCLK)**: After sending all 8 bits, this pin goes `HIGH` and then `LOW`. This tells the shift register to \"latch\" (transfer) all the data it has received and display it on its 8 output pins simultaneously. This prevents the LEDs from flickering while you're sending the bits.\n\n---\n\n**📚 `shiftOut()` Function**\n\nArduino provides a built-in function called `shiftOut()` that makes working with shift registers much easier. It handles the details of pulsing the Data and Clock pins for you.\n\n**Syntax:**\n\n```cpp\nshiftOut(dataPin, clockPin, bitOrder, value)\n```\n\n- `dataPin`: The digital pin connected to the shift register's Data pin (DS/SER).\n- `clockPin`: The digital pin connected to the shift register's Clock pin (SH_CP/SRCLK).\n- `bitOrder`: Determines if the bits are sent `LSBFIRST` (Least Significant Bit First, from right to left) or `MSBFIRST` (Most Significant Bit First, from left to right). `MSBFIRST` is commonly used.\n- `value`: A `byte` that contains the 8 bits of data you want to send to the shift register. Each bit in this byte corresponds to one of the shift register's 8 output pins.\n\n---\n\n**Example: Controlling LEDs with a 74HC595**\n\nThis example sends the value 42 (binary `00101010`) to the shift register, which will turn on specific LEDs connected to its output pins.\n\n```cpp\nint dataPin = 2;   // Connect to DS (Data Input) of 74HC595\nint clockPin = 3;  // Connect to SH_CP (Shift Register Clock) of 74HC595\nint latchPin = 4;  // Connect to ST_CP (Storage Register Clock/Latch) of 74HC595\n\nvoid setup() {\n  // Set all three control pins as outputs\n  pinMode(dataPin, OUTPUT);\n  pinMode(clockPin, OUTPUT);\n  pinMode(latchPin, OUTPUT);\n\n  Serial.begin(9600);\n  Serial.println(\"Shift Register Example Started!\");\n}\n\nvoid loop() {\n  // Step 1: Pull latchPin LOW to prepare for sending data\n  digitalWrite(latchPin, LOW);\n\n  // Step 2: Send 8 bits of data using shiftOut()\n  // MSBFIRST means the Most Significant Bit (leftmost) is sent first.\n  // The value 42 in binary is 00101010. This will set QH1 and QH3 HIGH.\n  shiftOut(dataPin, clockPin, MSBFIRST, 42);\n\n  // Step 3: Pull latchPin HIGH to transfer the shifted bits to the output pins\n  digitalWrite(latchPin, HIGH);\n\n  Serial.println(\"Value 42 (00101010) sent to shift register.\");\n  delay(1000); // Wait for a second\n\n  // You can send different values to see different LED patterns\n  digitalWrite(latchPin, LOW);\n  shiftOut(dataPin, clockPin, MSBFIRST, 170); // 170 in binary is 10101010\n  digitalWrite(latchPin, HIGH);\n  Serial.println(\"Value 170 (10101010) sent to shift register.\");\n  delay(1000);\n}\n```"
,questions: []  
},
{
  "day": "13",
  "title": "Analog Pins",
  "summary": "Understand the difference between analog and digital signals, and how Arduino's Analog-to-Digital Converter (ADC) translates real-world analog inputs into digital values. Learn to use `analogRead()` and convert raw readings into meaningful units like voltage.",
  "tags": ["Beginner", "Analog Input", "ADC", "Sensors", "Arduino", "Voltage"],
  "image": "/pic14.png",
  "content": "**⚡ Analog Signals vs. Digital Signals**\n\nTo understand analog pins, it's crucial to grasp the difference between digital and analog signals:\n\n- **Digital Signal**: Has only two distinct states (`HIGH` or `LOW`, `1` or `0`). Think of a simple light switch (either on or off).\n- **Analog Signal**: Has a **continuous range of values** within a given span. Think of a dimmer switch (you can set any brightness level from completely off to fully on).\n\nMany real-world phenomena, like temperature, light intensity, sound volume, and pressure, are analog in nature – they don't just exist in two states, but vary smoothly.\n\n---\n\n**🔄 Analog to Digital Conversion (ADC)**\n\nArduino's microcontroller is fundamentally a digital device. It only understands 1s and 0s. So, how can it understand a continuous analog signal from a sensor? It uses a special built-in component called an **Analog to Digital Converter (ADC)**.\n\n**Analog to Digital Conversion (ADC)** is the process of taking a continuous analog voltage and converting it into a discrete digital number that the Arduino can process.\n\n---\n\n**📌 Analog Input Pins**\n\nArduino boards have dedicated analog input pins, usually labeled **A0 through A5**. These are the pins that are directly connected to the internal ADC.\n\n**Important Note:** Unlike digital pins, you **do not** use `pinMode()` to set these pins as `INPUT` for analog readings. They are automatically configured for analog input when you use the `analogRead()` function.\n\nThese pins typically read voltage values between **0 volts and 5 volts**, which is the Arduino's operating voltage, also known as its \"reference voltage.\"\n\n---\n\n**📚 `analogRead()` Function**\n\nTo read an analog value from an analog input pin, you use the `analogRead()` function:\n\n**Syntax:**\n\n```cpp\nanalogRead(pin)\n```\n\n- `pin`: The analog input pin you want to read from (e.g., `A0`, `A1`, `A5`).\n- **Return Value**: This function returns an `int` (integer) value representing the converted digital number.\n\nIn Arduino, the ADC is **10-bit**. This means it can represent $2^{10}$ (1024) different values, ranging from 0 to 1023.\n\n**Example: Reading Raw Analog Value**\n\n```cpp\nconst int SENSOR_ANALOG_PIN = A0; // Define the analog pin for the sensor\n\nvoid setup() {\n  Serial.begin(9600);           // Start serial communication\n  Serial.println(\"Analog Reader Started!\");\n}\n\nvoid loop() {\n  int analogValue = analogRead(SENSOR_ANALOG_PIN); // Read the analog value from the sensor pin\n  Serial.print(\"Analog Reading (0-1023): \"); // Print the raw analog value to the serial monitor\n  Serial.println(analogValue);\n  delay(100); // Small delay for readability\n}\n```\n\n---\n\n**🎛️ Potentiometers and Analog Sensors**\n\nA **potentiometer** is a perfect starting point for analog input. It's essentially a variable resistor that acts like a voltage divider. By turning its knob, you can smoothly change the voltage at its middle pin from 0V to 5V.\n\nMany basic analog sensors, like a Light Dependent Resistor (LDR) for light, or a thermistor for temperature, are resistors whose resistance changes based on a physical property. To convert this resistance change into a voltage change that your Arduino can read, you almost always put them into a **voltage divider circuit**.\n\n---\n\n**📊 Converting Raw Value to Voltage**\n\nThe 0-1023 range returned by `analogRead()` is useful for Arduino, but it doesn't immediately tell you a voltage or a temperature. For voltage, the conversion is straightforward:\n\nThe range 0-1023 covers 0-5 Volts.\nSo, each step (1 count) is roughly $5V / 1024 \\approx 0.00488V$.\n\nTo convert the raw `analogRead()` value to voltage, use this formula:\n\n`float voltage = (analogReadValue * 5.0) / 1023.0;`\n\n**Example: Potentiometer to Voltage Conversion**\n\n```cpp\nconst int POT_PIN = A0; // Analog pin connected to the potentiometer's middle leg\n\nvoid setup() {\n  Serial.begin(9600); // Start serial communication\n  Serial.println(\"Potentiometer Voltage Reader Started!\");\n}\n\nvoid loop() {\n  int rawValue = analogRead(POT_PIN); // Read the raw analog value from the potentiometer\n\n  // Convert the raw 0-1023 value to a voltage (0.0 to 5.0 Volts)\n  // Using 5.0 and 1023.0 for floating-point division\n  float voltage = (rawValue * 5.0) / 1023.0; \n\n  Serial.print(\"Raw Value: \");\n  Serial.print(rawValue);\n  Serial.print(\" | Voltage: \");\n  Serial.print(voltage, 2); // Print voltage with 2 decimal places\n  Serial.println(\" V\");\n\n  delay(100); // Small delay for readability\n}\n```"
,questions: []    
},
{
  "day": "14",
  "title": "PWM and ADC Resolution",
  "summary": "Dive into Pulse Width Modulation (PWM) for simulating analog output with digital pins, learning to use `analogWrite()`. Also, understand Analog-to-Digital Converter (ADC) resolution, its significance for sensor precision, and how to calculate voltage per step.",
  "tags": ["Intermediate", "PWM", "ADC Resolution", "Analog Output", "Analog Input", "Arduino"],
  "image": "/pic15.png",
  "content": "**💡 Pulse Width Modulation (PWM)**\n\nArduino's digital pins can only output 5V (`HIGH`) or 0V (`LOW`). They can't magically output 2.5V for half brightness. So, how do we get around this to control things like LED brightness or motor speed?\n\n**Pulse Width Modulation (PWM)** is a clever trick to simulate analog behavior using a digital pin that can only be ON or OFF. Instead of providing a steady 2.5V, the Arduino rapidly turns the pin ON and OFF very quickly. By varying the duration of the \"ON\" time versus the \"OFF\" time within a fixed period, we can control the average voltage delivered to a component.\n\n---\n\n**📌 PWM Pins**\n\nNot all digital pins on an Arduino board can do PWM. Only specific pins are capable of generating these rapid pulses. On most Arduino Uno boards, these pins are usually marked with a tilde (`~`) symbol next to their number (e.g., `~3`, `~5`, `~6`, `~9`, `~10`, `~11`).\n\n---\n\n**📚 `analogWrite()` Function**\n\nTo use PWM on these special pins, you use the `analogWrite()` function:\n\n**Syntax:**\n\n```cpp\nanalogWrite(pin, value)\n```\n\n- `pin`: The PWM-capable digital pin you want to control (e.g., 3, 5, 6, 9, 10, 11).\n- `value`: An `int` (integer) number from 0 to 255. This value sets the **duty cycle**:\n    - `0`: The pin is always `LOW` (0% duty cycle, component is OFF).\n    - `255`: The pin is always `HIGH` (100% duty cycle, component is full ON).\n    - `127`: The pin is `HIGH` for about 50% of the time (50% duty cycle, half brightness/speed).\n    - Any value between 0 and 255 will set a proportional duty cycle.\n\n**Example: Controlling LED Brightness with PWM**\n\n```cpp\nconst int LED_PWM_PIN = 9; // Choose a PWM-capable pin (e.g., ~9)\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(\"LED Brightness Controller Started!\");\n  // pinMode() is not explicitly needed for PWM pins when using analogWrite()\n  // as it automatically configures them as output.\n}\n\nvoid loop() {\n  // Set the LED to a specific brightness level (half brightness)\n  int BRIGHTNESS_LEVEL = 127;\n  analogWrite(LED_PWM_PIN, BRIGHTNESS_LEVEL);\n  Serial.print(\"LED Brightness set to: \");\n  Serial.println(BRIGHTNESS_LEVEL);\n  delay(2000); // Keep it at this brightness for 2 seconds\n\n  // Change to a different brightness (very dim)\n  analogWrite(LED_PWM_PIN, 20);\n  Serial.println(\"LED Brightness set to: 20 (Dim)\");\n  delay(2000);\n\n  // Full brightness\n  analogWrite(LED_PWM_PIN, 255);\n  Serial.println(\"LED Brightness set to: 255 (Full)\");\n  delay(2000);\n}\n```\n\n---\n\n**📈 What is ADC Resolution?**\n\n**Resolution** refers to the number of distinct levels or steps an Analog-to-Digital Converter (ADC) can distinguish within its full input voltage range. For example, it's like having a ruler: a ruler with millimeters has higher resolution than one with only centimeters, because it can measure finer details.\n\nFor Arduino's ADC, the resolution is typically expressed in \"bits.\" Most standard Arduinos have a **10-bit ADC**.\n\n**Why Resolution Matters:**\n\n- **Precision**: Higher resolution means your Arduino can detect smaller changes in the analog signal. A 12-bit ADC offers $2^{12} = 4096$ steps, resulting in smaller voltage per step and finer detail compared to a 10-bit ADC.\n- **Sensor Choice**: If you have a sensor that outputs very tiny voltage changes for significant measurements (e.g., a high-precision temperature sensor), you might need a microcontroller with a higher resolution ADC or an external ADC chip.\n- **Noise**: If your electrical circuit has a lot of \"noise\" (unwanted electrical fluctuations), it might cause the ADC reading to jump around, even if the actual physical quantity isn't changing. High resolution can make this noise more apparent if not properly handled.\n\n---\n\n**🔢 Bits of Resolution and Number of Steps**\n\nThe \"bits\" tell you how many binary digits the ADC uses to represent the analog voltage. A 10-bit ADC means it uses 10 binary digits (0s or 1s) to represent the value.\n\nThe total number of distinct steps or values it can represent is $2^{\text{number of bits}}$.\n\nFor a 10-bit ADC, $2^{10} = 1024$ steps. This means the `analogRead()` function will return values from 0 to 1023 (inclusive), which are 1024 total distinct values.\n\n---\n\n**📊 Voltage Per Step or LSB Voltage**\n\nSince Arduino takes the entire reference voltage range (usually 5V) and divides it into these 1024 steps, each \"step\" in the raw 0-1023 value corresponds to a very small voltage change. This is often called the **voltage per step** or the **Least Significant Bit (LSB) voltage**.\n\n**Formula:**\n`Voltage per Step = Reference Voltage / Number of Steps`\n\nFor a standard Arduino (5V reference, 10-bit ADC):\n`Voltage per Step = 5V / 1024 steps`\n`Voltage per Step ≈ 0.00488 Volts/step` or `4.88 mV/step` (millivolts per step).\n\nThis means your Arduino can only detect voltage changes that are approximately 4.88 millivolts or larger. If your sensor's voltage output changes by less than this amount, the `analogRead()` value might not change, because it's too small a change for the ADC to distinguish between two adjacent steps.\n\n**Example: Calculating and Displaying ADC Resolution Details**\n\n```cpp\nconst int SENSOR_PIN = A0; // Analog pin for sensor/potentiometer\nconst float REFERENCE_VOLTAGE = 5.0; // Your Arduino's operating voltage (e.g., 5.0V or 3.3V)\nconst int ADC_BITS = 10; // Number of bits for the ADC (e.g., 10 for Arduino Uno)\nconst int ADC_STEPS = 1 << ADC_BITS; // Calculate 2^ADC_BITS (e.g., 1024 for 10-bit ADC)\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(\"ADC Resolution Monitor Started!\");\n  Serial.print(\"Reference Voltage: \");\n  Serial.print(REFERENCE_VOLTAGE);\n  Serial.println(\" V\");\n  Serial.print(\"ADC Bits: \");\n  Serial.println(ADC_BITS);\n  Serial.print(\"ADC Steps: \");\n  Serial.println(ADC_STEPS); // Will print 1024\n\n  float voltagePerStep = REFERENCE_VOLTAGE / ADC_STEPS;\n  Serial.print(\"Voltage per Step: \");\n  Serial.print(voltagePerStep, 4); // Print with 4 decimal places\n  Serial.println(\" V/step\");\n  Serial.println(\"---\");\n}\n\nvoid loop() {\n  int rawValue = analogRead(SENSOR_PIN);\n\n  // Convert raw 0-1023 value to voltage (0.0 to REFERENCE_VOLTAGE)\n  // Using ADC_STEPS - 1 for maximum value of the range (1023 for 10-bit)\n  float voltage = (rawValue * REFERENCE_VOLTAGE) / (ADC_STEPS - 1);\n\n  Serial.print(\"Raw: \");\n  Serial.print(rawValue);\n  Serial.print(\" | Voltage: \");\n  Serial.print(voltage, 3); // Print with 3 decimal places\n  Serial.println(\" V\");\n\n  delay(200); // Small delay for readability\n}\n```"
,questions: []
},
{
  "day": "15",
  "title": "External Voltage References",
  "summary": "Explore how to optimize Arduino's Analog-to-Digital Converter (ADC) by understanding and changing its reference voltage. Learn about default, internal (1.1V, 2.56V), and external voltage reference options using `analogReference()` for improved precision with various sensors.",
  "tags": ["Intermediate", "Analog Input", "ADC", "Reference Voltage", "Precision", "Arduino"],
  "image": "/pic16.png",
  "content": "**⚡ The Reference Voltage**\n\nThe reference voltage is the maximum voltage that your Arduino's Analog-to-Digital Converter (ADC) considers to be '1023'. Everything else is scaled proportionally. By default, your Arduino uses its operating voltage of 5V as this reference. But what if this 5V isn't perfectly stable, or if your sensor only outputs a very small voltage range? This is where understanding and choosing your voltage reference becomes important.\n\n---\n\n**🔄 Changing the Reference with `analogReference()`**\n\nYou use the `analogReference()` function in your `void setup()` to select the reference.\n\n**Syntax:**\n\n```cpp\nanalogReference(type)\n```\n\n- `type`: Can be `DEFAULT`, `INTERNAL`, `INTERNAL1V1`, `INTERNAL2V56`, or `EXTERNAL`.\n\n---\n\n**1. The Default Reference - `DEFAULT`**\n\n- **Use Case**: This is the most common setting and works well for many applications where sensors output signals across the full 0 to 5V range.\n- **Behavior**: Uses the analog reference from your Arduino's power supply (e.g., 5V on an Uno).\n- **Limitation**: If your Arduino's 5V supply fluctuates due to power demands or external factors, your analog readings might become slightly inaccurate.\n\n**Example:**\n\n```cpp\nvoid setup() {\n  analogReference(DEFAULT); // Uses board supply voltage (e.g., 5V) as reference\n  Serial.begin(9600);\n  Serial.println(\"Using DEFAULT voltage reference.\");\n}\n\nvoid loop() {\n  int sensorValue = analogRead(A0); // Read analog value from pin A0 (0-1023 scaled to 0-5V)\n  Serial.print(\"Sensor Value (0-1023): \");\n  Serial.println(sensorValue);\n  delay(100);\n}\n```\n\n---\n\n**2. Internal Voltage References - `INTERNAL` / `INTERNAL1V1` / `INTERNAL2V56`**\n\nArduino microcontrollers often have highly stable, built-in voltage references.\n\n**`INTERNAL` or `INTERNAL1V1`**\n\n- **Behavior**: Uses a built-in 1.1-volt reference. This is a very precise and stable 1.1V source, independent of the main board supply.\n- **Ideal For**: Measuring small voltages (0V to 1.1V) with higher effective resolution. For example, if your sensor only outputs up to 1V, using the 1.1V reference means that 0 to 1V will be mapped across the full 0 to 1023 range, giving you more detail than if 0 to 1V was squashed into only the first fifth of a 0 to 5V range.\n\n**Example (`INTERNAL1V1`):**\n\n```cpp\nvoid setup() {\n  analogReference(INTERNAL); // Or analogReference(INTERNAL1V1);\n  Serial.begin(9600);\n  Serial.println(\"Using INTERNAL 1.1V voltage reference.\");\n}\n\nvoid loop() {\n  int sensorValue = analogRead(A0); // Now, 1023 = 1.1V on A0 (better for small signal sensors)\n  float voltage = (sensorValue * 1.1) / 1023.0; // Convert to actual voltage\n  Serial.print(\"Sensor Value (0-1023): \");\n  Serial.print(sensorValue);\n  Serial.print(\" | Voltage (0-1.1V): \");\n  Serial.print(voltage, 3);\n  Serial.println(\" V\");\n  delay(100);\n}\n```\n\n**`INTERNAL2V56`**\n\n- **Behavior**: Uses a built-in 2.56-volt reference. Similar to the 1.1V internal reference, but designed for sensors outputting voltages up to 2.56V.\n- **Availability**: This option is only available on some boards, such as the Arduino Mega.\n\n**Example (`INTERNAL2V56`):**\n\n```cpp\nvoid setup() {\n  analogReference(INTERNAL2V56); // Only available on some boards like Arduino Mega\n  Serial.begin(9600);\n  Serial.println(\"Using INTERNAL 2.56V voltage reference.\");\n}\n\nvoid loop() {\n  int sensorValue = analogRead(A0); // Now, 1023 = 2.56V on A0\n  float voltage = (sensorValue * 2.56) / 1023.0;\n  Serial.print(\"Sensor Value (0-1023): \");\n  Serial.print(sensorValue);\n  Serial.print(\" | Voltage (0-2.56V): \");\n  Serial.print(voltage, 3);\n  Serial.println(\" V\");\n  delay(100);\n}\n```\n\n---\n\n**3. External Voltage Reference - `EXTERNAL`**\n\n- **Control and Precision**: `EXTERNAL` gives you the most control and potentially the highest precision. You can provide your own stable voltage source to a special pin on the Arduino called **AREF** (Analog Reference).\n- **How it Works**: You connect a precise, stable voltage source (e.g., a dedicated voltage reference IC, or even a very stable power supply) to the `AREF` pin. This voltage then becomes the new `HIGH` point for your `analogRead()` function.\n- **Use Case**: When you need the absolute highest precision, or when your sensor's output range precisely matches a custom reference voltage you can provide.\n\n**Important Considerations:**\n- When using `EXTERNAL`, **do not connect a voltage greater than 5V** to the `AREF` pin, or you could damage your Arduino. Ensure the external reference is stable and within the Arduino's acceptable range.\n- After calling `analogReference(EXTERNAL)`, **disconnect any external reference voltage from the AREF pin** when switching back to `DEFAULT` or `INTERNAL` references, as connecting both simultaneously can cause damage.\n\n**Example (`EXTERNAL`):**\n\n```cpp\n// Assume you have connected a stable 3.3V source to the AREF pin\nconst float EXTERNAL_REF_VOLTAGE = 3.3; // Define your external reference voltage\n\nvoid setup() {\n  analogReference(EXTERNAL); // Uses the voltage you supply to AREF\n  Serial.begin(9600);\n  Serial.println(\"Using EXTERNAL voltage reference.\");\n  Serial.print(\"External Reference set to: \");\n  Serial.print(EXTERNAL_REF_VOLTAGE);\n  Serial.println(\" V\");\n}\n\nvoid loop() {\n  int sensorValue = analogRead(A0); // Now, 1023 = voltage on AREF pin (e.g., 3.3V)\n  float voltage = (sensorValue * EXTERNAL_REF_VOLTAGE) / 1023.0; // Convert to actual voltage\n  Serial.print(\"Sensor Value (0-1023): \");\n  Serial.print(sensorValue);\n  Serial.print(\" | Voltage (0-\");\n  Serial.print(EXTERNAL_REF_VOLTAGE);\n  Serial.print(\"V): \");\n  Serial.print(voltage, 3);\n  Serial.println(\" V\");\n  delay(100);\n}\n```\n\n---\n\n**🤔 When to Use Which Reference?**\n\n- **`DEFAULT`**: Most common. Use for sensors that output across the full 0 to 5V range, or when slight fluctuations in 5V aren't critical.\n- **`INTERNAL` (`INTERNAL1V1` / `INTERNAL2V56`)**: Use for sensors that output small voltages (e.g., 0V to 1V or 0V to 2.5V) and you want maximum precision for those small signals.\n- **`EXTERNAL`**: Use when you have a custom, very precise, and stable voltage reference that exactly matches your sensor's output range, giving you the best possible accuracy. This is for advanced use cases requiring high precision."
,questions: []  
}
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
  const [answers, setAnswers] = useState(Array(arduinoQuizQuestions.length).fill(null));
  const [checked, setChecked] = useState(Array(arduinoQuizQuestions.length).fill(false));
  const [feedback, setFeedback] = useState(Array(arduinoQuizQuestions.length).fill(null));

  const handleCheck = (idx) => {
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
function ArduinoDayCard({ day, title, summary, tags, image, onClick }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800 hover:shadow-2xl transition cursor-pointer flex flex-col" onClick={onClick}>
      <div className="h-36 w-full bg-gray-700 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="object-cover w-full h-full" />
        ) : (
          <span className="text-4xl text-yellow-400">⚡</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs bg-yellow-400 text-gray-900 rounded px-2 py-1 mb-2 w-fit font-semibold">Day {day}</span>
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

const ArduinoDetail = ({ onBack, dayIdx, overview = null }) => {
  const item = overview || arduinoDays[dayIdx];
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
                <ArduinoQuizCustom questions={item.quiz} />
              )}
              {/* Quiz Section (only for days, not overview, fallback to day 1 quiz) */}
              {item.day && !item.quiz && <ArduinoQuiz />}
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
function ArduinoQuizCustom({ questions }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [checked, setChecked] = useState(Array(questions.length).fill(false));
  const [feedback, setFeedback] = useState(Array(questions.length).fill(null));

  const handleCheck = (idx) => {
    setChecked(c => c.map((v, i) => i === idx ? true : v));
    if (answers[idx] === questions[idx].answer) {
      setFeedback(f => f.map((v, i) => i === idx ? 'correct' : v));
    } else {
      setFeedback(f => f.map((v, i) => i === idx ? 'incorrect' : v));
    }
  };

  return (
    <div className="bg-gray-900 border border-yellow-400/40 rounded-xl p-6 shadow-inner mt-10 mb-10">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">📝 Practice Quiz</h3>
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
  const [selectedDay, setSelectedDay] = useState(null);

  if (selectedDay !== null) {
    return <ArduinoDetail onBack={() => setSelectedDay(null)} dayIdx={selectedDay} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-2">
        ⚡ Arduino Day-wise Modules
      </h1>
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
  );
};

export default CoursePage;


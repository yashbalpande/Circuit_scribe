const express = require('express');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const app = express();
const port = 5000;

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function blockToMarkdown(block) {
  if (block.type === 'paragraph') {
    return block.paragraph.text.map(t => t.plain_text).join('');
  }
  if (block.type === 'heading_1') {
    return '# ' + block.heading_1.text.map(t => t.plain_text).join('');
  }
  if (block.type === 'heading_2') {
    return '## ' + block.heading_2.text.map(t => t.plain_text).join('');
  }
  if (block.type === 'heading_3') {
    return '### ' + block.heading_3.text.map(t => t.plain_text).join('');
  }
  // Add more block types as needed
  return '';
}

app.get('/api/arduino-plan', async (req, res) => {
  try {
    // Full markdown content for Day 1
    const day1Content = `## 🎯 Goals

- Void Setup & Void Loop
- Understand basic C data types in embedded
- Declare and initialize variables properly
- Print variable values to Serial Monitor

### 0. Void Setup & Void Loop

- 🛠 \`void setup() //setup()\` = Setting up your kitchen once before cooking
    
    This runs **only once** when your Arduino is powered on or reset.
    
    Use it to:
    - Set **pin modes** (input/output)
    - Start **Serial communication**
    - Initialize sensors or modules
- 🔁 \`void loop() //loop()\` = The cooking routine you repeat every day
    
    This runs **repeatedly, forever** like a **cycle**.
    
    Put your main code here, the stuff you want to happen **again and again**.

### 1. Essential Data Types

```arduino
int "variable" = 2;             *// int has 2^16 i.e 2 bytes | Whole numbers (-32,768 to 32,767)*
long "variable" = 123456;      *// long has 2^32 i.e 4 bytes | Large numbers (-2,147,483,648 to 2,147,483,647)*
float "variable" = 3.3;       *// float has 2^32 i.e 4 bytes | Decimal numbers (32-bit precision)*
bool "variable" = true;      *// bool has 2^8 i.e 1 byte | true or false values*
char "variable" = 'A';      *// char has 2^8 i.e 1 byte | char has is ideal for single character (ASCII)*
byte "variable" = 255;     *// byte has 2^8 i.e 1 byte | 0-255 range (memory efficient)*
```

### 2. Why Data Types Matter in Embedded Systems

- **Memory is limited**
    
    Choose smallest suitable type
    
- **Processing speed**
    
    Smaller types = faster operations
    
- **Hardware compatibility**
    
    Some functions expect specific types
    

### 3. Variable Declaration Best Practices

```arduino
*// Avoid unclear names*
int x = 4;
float v = 0.0;

*// Use descriptive names*
int buttonPin = 4;
float sensorVoltage = 0.0;
```

### 4. Serial Communication

- **Serial.begin(9600)**
    - Starts communication at 9600 baud rate
        
        \`baud rate tells you how fast data is being sent or received over serial communication. 
        typical baud rates are 9600, 14400, 19200, 38400, 57600, 115200\`
        
- **Serial.print()**
    
    Prints text/numbers without new line
    
- **Serial.println()**
    
    Prints text/numbers with new line
    

### 5. Example

```arduino
void setup() {
// Initialize serial communication

Serial.begin(9600); // Declare and initialize variables
int ledPin = 2;
long uptime = 86400;      // Seconds in a day
float voltage = 3.3;
bool systemReady = true;
char status = 'R';        // R for Ready
byte brightness = 128;    // Half brightness

// Print all variables to Serial Monitor
Serial.println("===Variables Demo ===");
Serial.print("LED Pin: ");
Serial.println(ledPin);

Serial.print("Uptime: ");
Serial.print(uptime);
Serial.println(" seconds");

Serial.print("System Voltage: ");
Serial.print(voltage);
Serial.println(" V");

Serial.print("System Ready: ");
Serial.println(systemReady ? "YES" : "NO");

Serial.print("Status Code: ");
Serial.println(status);

Serial.print("LED Brightness: ");
Serial.println(brightness);
}

void loop() {
// Empty for now we'll use this later
}
```
`;

    const questions = [
      {
        question: '1. Which data type uses the least memory?'
      },
      {
        question: '2. What\'s the difference between Serial.print() and Serial.println()?'
      },
      {
        question: '3. What baud rate is used in today\'s example?'
      },
      {
        question: '4. Which data type is best for storing large timestamp values?'
      },
      {
        question: '5. What does Serial.begin(9600) do?'
      },
      {
        question: 'Snippet 1: What will this code print?',
        code: 'int x = 25;\nSerial.print("Value: ");\nSerial.println(x);'
      },
      {
        question: 'Snippet 2: Which variable declaration is CORRECT?',
        code: 'A) int ledPin = 2.5;\nB) float voltage = 3.3;\nC) bool status = "true";\nD) char letter = 65;'
      },
      {
        question: 'Snippet 3: What\'s wrong with this code?',
        code: 'void setup() {\n  int pin = 13;\n  Serial.println(pin);\n}'
      },
      {
        question: 'Snippet 4: What will be the output?',
        code: 'bool ready = false;\nSerial.println(ready ? "YES" : "NO");'
      },
      {
        question: 'Snippet 5: Which line will cause an error?',
        code: 'byte brightness = 255;    *// Line 1*\nbyte overflow = 300;      *// Line 2*  \nchar letter = \'A\';        *// Line 3*\nfloat temp = -5.5;        *// Line 4*'
      }
    ];

    const assignment = {
      task: 'Create your own variable demonstration program',
      requirements: [
        'Declare variables in setup()',
        'Print each variable with a descriptive label.',
        'Upload and verify output in Serial Monitor.'
      ],
      expectedOutput: 'LED Pin: 2\nUptime: 86400 seconds\nSystem Voltage: 3.3 V\nSystem Ready: YES\nStatus Code: R\nLED Brightness: 128'
    };

    res.json([
      {
        day: '1',
        title: 'Variables and Data Types',
        content: day1Content,
        questions,
        assignment
      }
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
}); 
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
  },
  // 1. Ohm's Law PWM Output
  {
    id: 'ohms-law-pwm',
    title: "Ohm's Law PWM Output",
    description: 'Take user input current I in mA (via Serial.read()), with a known resistor R = 100Ω. Output PWM voltage such that V = I × R.',
    difficulty: 'beginner',
    solution: `const int PWM_PIN = 9;
const float R = 100.0;
const float VCC = 5.0;
void setup() {
  Serial.begin(9600);
  pinMode(PWM_PIN, OUTPUT);
  Serial.println("Enter current in mA:");
}
void loop() {
  if (Serial.available() > 0) {
    float current_mA = Serial.parseFloat();
    float current_A = current_mA / 1000.0;
    float voltage = current_A * R;
    int pwm_value = (voltage / VCC) * 255;
    pwm_value = constrain(pwm_value, 0, 255);
    analogWrite(PWM_PIN, pwm_value);
    Serial.print("Current: ");
    Serial.print(current_mA);
    Serial.print(" mA, Voltage: ");
    Serial.print(voltage);
    Serial.print(" V, PWM: ");
    Serial.println(pwm_value);
  }
}`,
    requirements: ['Serial.begin', 'Serial.parseFloat', 'analogWrite', 'constrain', 'pinMode', 'setup', 'loop'],
    hints: [
      'Use Serial.parseFloat() to read current input',
      'Calculate voltage using Ohm\'s Law',
      'Convert voltage to PWM value (0-255)',
      'Use analogWrite() to output PWM'
    ]
  },
  // 2. KCL Balancer
  {
    id: 'kcl-balancer',
    title: 'KCL Balancer',
    description: 'Read analog voltages from two inputs (A0 and A1), calculate currents assuming same R, and output a PWM such that the net current at node is zero.',
    difficulty: 'intermediate',
    solution: `const int INPUT1 = A0;
const int INPUT2 = A1;
const int PWM_OUT = 9;
const float VCC = 5.0;
void setup() {
  Serial.begin(9600);
  pinMode(PWM_OUT, OUTPUT);
}
void loop() {
  float v1 = analogRead(INPUT1) * (VCC / 1023.0);
  float v2 = analogRead(INPUT2) * (VCC / 1023.0);
  float target_voltage = (v1 + v2) / 2.0;
  int pwm_value = (target_voltage / VCC) * 255;
  pwm_value = constrain(pwm_value, 0, 255);
  analogWrite(PWM_OUT, pwm_value);
  Serial.print("V1: ");
  Serial.print(v1);
  Serial.print(" V, V2: ");
  Serial.print(v2);
  Serial.print(" V, Target: ");
  Serial.print(target_voltage);
  Serial.print(" V, PWM: ");
  Serial.println(pwm_value);
  delay(100);
}`,
    requirements: ['analogRead', 'analogWrite', 'constrain', 'Serial.print', 'setup', 'loop'],
    hints: [
      'Read both analog inputs',
      'Average the voltages for zero net current',
      'Convert voltage to PWM',
      'Output with analogWrite()'
    ]
  },
  // 3. Thevenin Estimator
  {
    id: 'thevenin-estimator',
    title: 'Thevenin Estimator',
    description: 'Read voltage at A0 with and without a load (triggered by digital output). Calculate Thevenin voltage Vth and resistance Rth using voltage drop.',
    difficulty: 'advanced',
    solution: `const int VOLTAGE_PIN = A0;
const int LOAD_CONTROL = 8;
const float VCC = 5.0;
const float LOAD_RESISTANCE = 1000.0;
void setup() {
  Serial.begin(9600);
  pinMode(LOAD_CONTROL, OUTPUT);
  digitalWrite(LOAD_CONTROL, LOW);
  Serial.println("Press any key to measure Thevenin equivalent");
}
void loop() {
  if (Serial.available() > 0) {
    Serial.read();
    digitalWrite(LOAD_CONTROL, LOW);
    delay(100);
    float vopen = analogRead(VOLTAGE_PIN) * (VCC / 1023.0);
    digitalWrite(LOAD_CONTROL, HIGH);
    delay(100);
    float vload = analogRead(VOLTAGE_PIN) * (VCC / 1023.0);
    float rth = (vopen - vload) * LOAD_RESISTANCE / vload;
    Serial.print("Vth (open): ");
    Serial.print(vopen);
    Serial.println(" V");
    Serial.print("Rth: ");
    Serial.print(rth);
    Serial.println(" Ω");
    digitalWrite(LOAD_CONTROL, LOW);
  }
}`,
    requirements: ['analogRead', 'Serial.print', 'digitalWrite', 'delay', 'setup', 'loop'],
    hints: [
      'Use digitalWrite to switch load',
      'Measure open and loaded voltages',
      'Apply Thevenin formula',
      'Print results to Serial'
    ]
  },
  // 4. Voltage Divider ADC Read
  {
    id: 'voltage-divider-adc',
    title: 'Voltage Divider ADC Read',
    description: 'Read midpoint of a voltage divider at A0 and display real voltage (0-5V) on Serial.',
    difficulty: 'beginner',
    solution: `const int VOLTAGE_PIN = A0;
const float VCC = 5.0;
void setup() {
  Serial.begin(9600);
  Serial.println("Voltage Divider Reader");
}
void loop() {
  int adc_value = analogRead(VOLTAGE_PIN);
  float voltage = adc_value * (VCC / 1023.0);
  Serial.print("ADC: ");
  Serial.print(adc_value);
  Serial.print(", Voltage: ");
  Serial.print(voltage);
  Serial.println(" V");
  delay(500);
}`,
    requirements: ['analogRead', 'Serial.print', 'setup', 'loop'],
    hints: [
      'Use analogRead() to read A0',
      'Convert ADC value to voltage',
      'Print voltage to Serial'
    ]
  },
  // 5. RC Charge Timer
  {
    id: 'rc-charge-timer',
    title: 'RC Charge Timer',
    description: 'On a button press, charge capacitor via digital pin HIGH. Log voltage every 100ms using ADC until 4.5V.',
    difficulty: 'intermediate',
    solution: `const int BUTTON_PIN = 2;
const int CHARGE_PIN = 8;
const int VOLTAGE_PIN = A0;
const float VCC = 5.0;
const float TARGET_VOLTAGE = 4.5;
bool charging = false;
unsigned long start_time = 0;
void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(CHARGE_PIN, OUTPUT);
  digitalWrite(CHARGE_PIN, LOW);
  Serial.println("Press button to start charging");
}
void loop() {
  if (digitalRead(BUTTON_PIN) == LOW && !charging) {
    charging = true;
    start_time = millis();
    digitalWrite(CHARGE_PIN, HIGH);
    Serial.println("Charging started...");
  }
  if (charging) {
    float voltage = analogRead(VOLTAGE_PIN) * (VCC / 1023.0);
    unsigned long elapsed = millis() - start_time;
    Serial.print("Time: ");
    Serial.print(elapsed);
    Serial.print(" ms, Voltage: ");
    Serial.print(voltage);
    Serial.println(" V");
    if (voltage >= TARGET_VOLTAGE) {
      charging = false;
      digitalWrite(CHARGE_PIN, LOW);
      Serial.println("Charging complete!");
    }
    delay(100);
  }
}`,
    requirements: ['digitalRead', 'digitalWrite', 'analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Use a button to start charging',
      'Log voltage every 100ms',
      'Stop charging at 4.5V'
    ]
  },
  // 6. PWM Tone Generator
  {
    id: 'pwm-tone-generator',
    title: 'PWM Tone Generator',
    description: 'Output 440Hz tone on PWM pin using tone() and stop after 2 seconds.',
    difficulty: 'beginner',
    solution: `const int TONE_PIN = 9;
const int FREQUENCY = 440;
const int DURATION = 2000;
void setup() {
  Serial.begin(9600);
  Serial.println("Playing 440Hz tone for 2 seconds");
  tone(TONE_PIN, FREQUENCY);
  delay(DURATION);
  noTone(TONE_PIN);
  Serial.println("Tone complete");
}
void loop() {
  // Empty loop
}`,
    requirements: ['tone', 'noTone', 'delay', 'Serial.println', 'setup', 'loop'],
    hints: [
      'Use tone() to generate sound',
      'Use delay() for duration',
      'Stop with noTone()'
    ]
  },
  // 7. Transient Supply Drop Detection
  {
    id: 'transient-supply-drop',
    title: 'Transient Supply Drop Detection',
    description: 'Monitor A0. If voltage drops below 3.0V suddenly, flash LED rapidly.',
    difficulty: 'intermediate',
    solution: `const int VOLTAGE_PIN = A0;
const int LED_PIN = 13;
const float VCC = 5.0;
const float THRESHOLD = 3.0;
const int THRESHOLD_ADC = (THRESHOLD / VCC) * 1023;
bool alarm_active = false;
void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("Monitoring supply voltage...");
}
void loop() {
  int adc_value = analogRead(VOLTAGE_PIN);
  float voltage = adc_value * (VCC / 1023.0);
  if (adc_value < THRESHOLD_ADC) {
    if (!alarm_active) {
      alarm_active = true;
      Serial.print("VOLTAGE DROP DETECTED: ");
      Serial.print(voltage);
      Serial.println(" V");
    }
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
    delay(100);
  } else {
    alarm_active = false;
    digitalWrite(LED_PIN, LOW);
  }
  delay(50);
}`,
    requirements: ['analogRead', 'digitalWrite', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Monitor voltage on A0',
      'Flash LED if voltage drops',
      'Use threshold for detection'
    ]
  },
  // 8. Capacitor Discharge Logger
  {
    id: 'capacitor-discharge-logger',
    title: 'Capacitor Discharge Logger',
    description: 'Initially charge capacitor, then discharge through resistor. Log A0 value every 100ms.',
    difficulty: 'intermediate',
    solution: `const int CHARGE_PIN = 8;
const int VOLTAGE_PIN = A0;
const float VCC = 5.0;
bool logging = false;
unsigned long start_time = 0;
void setup() {
  Serial.begin(9600);
  pinMode(CHARGE_PIN, OUTPUT);
  digitalWrite(CHARGE_PIN, HIGH);
  delay(2000);
  Serial.println("Starting discharge logging...");
  digitalWrite(CHARGE_PIN, LOW);
  logging = true;
  start_time = millis();
}
void loop() {
  if (logging) {
    int adc_value = analogRead(VOLTAGE_PIN);
    float voltage = adc_value * (VCC / 1023.0);
    unsigned long elapsed = millis() - start_time;
    Serial.print("Time: ");
    Serial.print(elapsed);
    Serial.print(" ms, ADC: ");
    Serial.print(adc_value);
    Serial.print(", Voltage: ");
    Serial.print(voltage);
    Serial.println(" V");
    if (voltage < 0.1) {
      logging = false;
      Serial.println("Discharge complete");
    }
    delay(100);
  }
}`,
    requirements: ['digitalWrite', 'analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Charge then discharge capacitor',
      'Log voltage every 100ms',
      'Stop when voltage is near zero'
    ]
  },
  // 9. Diode Forward Drop Detector
  {
    id: 'diode-forward-drop',
    title: 'Diode Forward Drop Detector',
    description: 'Gradually increase PWM output and read voltage drop across a diode. Detect when it exceeds 0.7V.',
    difficulty: 'beginner',
    solution: `const int PWM_PIN = 9;
const int VOLTAGE_PIN = A0;
const float VCC = 5.0;
const float FORWARD_DROP = 0.7;
const int THRESHOLD_ADC = (FORWARD_DROP / VCC) * 1023;
void setup() {
  Serial.begin(9600);
  pinMode(PWM_PIN, OUTPUT);
  Serial.println("Diode forward drop detector");
}
void loop() {
  for (int pwm = 0; pwm <= 255; pwm++) {
    analogWrite(PWM_PIN, pwm);
    delay(50);
    int adc_value = analogRead(VOLTAGE_PIN);
    float voltage = adc_value * (VCC / 1023.0);
    Serial.print("PWM: ");
    Serial.print(pwm);
    Serial.print(", Voltage: ");
    Serial.print(voltage);
    Serial.print(" V");
    if (adc_value > THRESHOLD_ADC) {
      Serial.print(" - CONDUCTING");
    }
    Serial.println();
    if (pwm == 255) {
      delay(1000);
    }
  }
}`,
    requirements: ['analogWrite', 'analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Sweep PWM from 0 to 255',
      'Detect when voltage exceeds 0.7V',
      'Print "CONDUCTING" when detected'
    ]
  },
  // 10. Zener Regulation Test
  {
    id: 'zener-regulation-test',
    title: 'Zener Regulation Test',
    description: 'Apply increasing PWM and detect when voltage across Zener stops increasing (clamps to 3.3V or 5.1V).',
    difficulty: 'intermediate',
    solution: `const int PWM_PIN = 9;
const int VOLTAGE_PIN = A0;
const float VCC = 5.0;
float previous_voltage = 0;
int clamp_detected = 0;
void setup() {
  Serial.begin(9600);
  pinMode(PWM_PIN, OUTPUT);
  Serial.println("Zener regulation test");
}
void loop() {
  for (int pwm = 0; pwm <= 255; pwm++) {
    analogWrite(PWM_PIN, pwm);
    delay(100);
    float voltage = analogRead(VOLTAGE_PIN) * (VCC / 1023.0);
    float voltage_change = voltage - previous_voltage;
    Serial.print("PWM: ");
    Serial.print(pwm);
    Serial.print(", Voltage: ");
    Serial.print(voltage);
    Serial.print(" V");
    if (pwm > 50 && voltage_change < 0.01 && !clamp_detected) {
      Serial.print(" - CLAMPED at ");
      Serial.print(voltage);
      Serial.print(" V");
      clamp_detected = 1;
    }
    Serial.println();
    previous_voltage = voltage;
    if (pwm == 255) {
      delay(2000);
      clamp_detected = 0;
      previous_voltage = 0;
    }
  }
}`,
    requirements: ['analogWrite', 'analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Sweep PWM from 0 to 255',
      'Detect voltage clamping',
      'Print clamp voltage when detected'
    ]
  },
  // 11. MOSFET Load Switch
  {
    id: 'mosfet-load-switch',
    title: 'MOSFET Load Switch',
    description: 'Turn on/off a motor or LED using digital pin and MOSFET.',
    difficulty: 'beginner',
    solution: `const int MOSFET_GATE = 8;
const int DRAIN_VOLTAGE = A0;
const int BUTTON_PIN = 2;
const float VCC = 5.0;
bool load_state = false;
void setup() {
  Serial.begin(9600);
  pinMode(MOSFET_GATE, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  digitalWrite(MOSFET_GATE, LOW);
  Serial.println("MOSFET Load Switch - Press button to toggle");
}
void loop() {
  static bool last_button = HIGH;
  bool current_button = digitalRead(BUTTON_PIN);
  if (last_button == HIGH && current_button == LOW) {
    load_state = !load_state;
    digitalWrite(MOSFET_GATE, load_state);
    delay(10);
    float drain_voltage = analogRead(DRAIN_VOLTAGE) * (VCC / 1023.0);
    Serial.print("Load: ");
    Serial.print(load_state ? "ON" : "OFF");
    Serial.print(", Drain voltage: ");
    Serial.print(drain_voltage);
    Serial.println(" V");
  }
  last_button = current_button;
  delay(50);
}`,
    requirements: ['digitalWrite', 'digitalRead', 'analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Use button to toggle MOSFET',
      'Read drain voltage',
      'Print state to Serial'
    ]
  },
  // 12. Wheatstone Balance Logic
  {
    id: 'wheatstone-balance',
    title: 'Wheatstone Balance Logic',
    description: 'Switch between two different resistor combinations. When balanced, A0 voltage is 2.5V ±5%.',
    difficulty: 'intermediate',
    solution: `const int BRIDGE_VOLTAGE = A0;
const int SWITCH_PIN = 8;
const int LED_PIN = 13;
const float VCC = 5.0;
const float BALANCE_VOLTAGE = 2.5;
const float TOLERANCE = 0.125;
void setup() {
  Serial.begin(9600);
  pinMode(SWITCH_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("Wheatstone Bridge Balance Detector");
}
void loop() {
  for (int combo = 0; combo < 2; combo++) {
    digitalWrite(SWITCH_PIN, combo);
    delay(100);
    float voltage = analogRead(BRIDGE_VOLTAGE) * (VCC / 1023.0);
    bool balanced = abs(voltage - BALANCE_VOLTAGE) < TOLERANCE;
    Serial.print("Combo ");
    Serial.print(combo);
    Serial.print(": ");
    Serial.print(voltage);
    Serial.print(" V - ");
    Serial.println(balanced ? "BALANCED" : "UNBALANCED");
    digitalWrite(LED_PIN, balanced);
    delay(1000);
  }
}`,
    requirements: ['digitalWrite', 'analogRead', 'Serial.print', 'delay', 'abs', 'setup', 'loop'],
    hints: [
      'Switch resistor combinations',
      'Check for balance near 2.5V',
      'Light LED if balanced'
    ]
  },
  // 13. Comparator Logic (Digital)
  {
    id: 'comparator-logic-digital',
    title: 'Comparator Logic (Digital)',
    description: 'Read analog input. If V > 2.5V, set LED ON. Else OFF.',
    difficulty: 'beginner',
    solution: `const int ANALOG_INPUT = A0;
const int LED_PIN = 13;
const int THRESHOLD = 512;
void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("Digital Comparator - Threshold: 2.5V");
}
void loop() {
  int adc_value = analogRead(ANALOG_INPUT);
  float voltage = adc_value * (5.0 / 1023.0);
  bool led_state = adc_value > THRESHOLD;
  digitalWrite(LED_PIN, led_state);
  Serial.print("ADC: ");
  Serial.print(adc_value);
  Serial.print(", Voltage: ");
  Serial.print(voltage);
  Serial.print(" V, LED: ");
  Serial.println(led_state ? "ON" : "OFF");
  delay(100);
}`,
    requirements: ['analogRead', 'digitalWrite', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Compare analog input to threshold',
      'Turn LED on/off',
      'Print state to Serial'
    ]
  },
  // 14. Current Measurement (Shunt Resistor)
  {
    id: 'current-measurement-shunt',
    title: 'Current Measurement (Shunt Resistor)',
    description: 'Use a 1Ω shunt resistor. Read ADC voltage and calculate current.',
    difficulty: 'intermediate',
    solution: `const int SHUNT_VOLTAGE = A0;
const float VCC = 5.0;
const float SHUNT_RESISTANCE = 1.0;
void setup() {
  Serial.begin(9600);
  Serial.println("Current Measurement using Shunt Resistor");
}
void loop() {
  float voltage = analogRead(SHUNT_VOLTAGE) * (VCC / 1023.0);
  float current = voltage / SHUNT_RESISTANCE;
  Serial.print("Shunt Voltage: ");
  Serial.print(voltage);
  Serial.print(" V, Current: ");
  Serial.print(current);
  Serial.println(" A");
  delay(500);
}`,
    requirements: ['analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Read voltage across shunt',
      'Calculate current using Ohm\'s Law',
      'Print current to Serial'
    ]
  },
  // 15. Temperature Sensor LM35
  {
    id: 'temperature-sensor-lm35',
    title: 'Temperature Sensor LM35',
    description: 'Read LM35 analog output (10mV/°C). Convert to temperature.',
    difficulty: 'beginner',
    solution: `const int TEMP_PIN = A0;
const float VCC = 5.0;
void setup() {
  Serial.begin(9600);
  Serial.println("LM35 Temperature Sensor");
}
void loop() {
  float voltage = analogRead(TEMP_PIN) * (VCC / 1023.0);
  float temperature = voltage * 100.0;
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print(" V, Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  delay(1000);
}`,
    requirements: ['analogRead', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Read analog value from LM35',
      'Convert voltage to temperature',
      'Print temperature to Serial'
    ]
  },
  // 16. LED Dimming
  {
    id: 'led-dimming',
    title: 'LED Dimming',
    description: 'Use potentiometer to control LED brightness via PWM.',
    difficulty: 'beginner',
    solution: `const int POT_PIN = A0;
const int LED_PIN = 9;
void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("LED Dimming with Potentiometer");
}
void loop() {
  int pot_value = analogRead(POT_PIN);
  int led_brightness = pot_value / 4;
  analogWrite(LED_PIN, led_brightness);
  Serial.print("Pot: ");
  Serial.print(pot_value);
  Serial.print(", LED brightness: ");
  Serial.println(led_brightness);
  delay(100);
}`,
    requirements: ['analogRead', 'analogWrite', 'Serial.print', 'delay', 'pinMode', 'setup', 'loop'],
    hints: [
      'Read potentiometer value',
      'Map to PWM for LED',
      'Print brightness to Serial'
    ]
  },
  // 17. Inductive Kickback Trap
  {
    id: 'inductive-kickback-trap',
    title: 'Inductive Kickback Trap',
    description: 'Pulse relay coil using digital output. Detect spike on flyback path using A0.',
    difficulty: 'intermediate',
    solution: `const int RELAY_PIN = 8;
const int KICKBACK_PIN = A0;
const float VCC = 5.0;
void setup() {
  Serial.begin(9600);
  pinMode(RELAY_PIN, OUTPUT);
  Serial.println("Inductive Kickback Detector");
}
void loop() {
  digitalWrite(RELAY_PIN, HIGH);
  delay(1000);
  digitalWrite(RELAY_PIN, LOW);
  delayMicroseconds(10);
  int kickback_value = analogRead(KICKBACK_PIN);
  float kickback_voltage = kickback_value * (VCC / 1023.0);
  Serial.print("Kickback ADC: ");
  Serial.print(kickback_value);
  Serial.print(", Voltage: ");
  Serial.print(kickback_voltage);
  Serial.println(" V");
  delay(2000);
}`,
    requirements: ['digitalWrite', 'analogRead', 'Serial.print', 'delay', 'delayMicroseconds', 'setup', 'loop'],
    hints: [
      'Pulse relay coil',
      'Detect voltage spike on A0',
      'Print spike value to Serial'
    ]
  },
  // 18. Comparator with Hysteresis
  {
    id: 'comparator-hysteresis',
    title: 'Comparator with Hysteresis',
    description: 'Avoid flickering by setting ON threshold at 2.8V and OFF at 2.2V.',
    difficulty: 'intermediate',
    solution: `const int INPUT_PIN = A0;
const int LED_PIN = 13;
const float VCC = 5.0;
const float ON_THRESHOLD = 2.8;
const float OFF_THRESHOLD = 2.2;
bool state = false;
void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("Comparator with Hysteresis");
}
void loop() {
  float voltage = analogRead(INPUT_PIN) * (VCC / 1023.0);
  if (!state && voltage > ON_THRESHOLD) {
    state = true;
    Serial.println("State: ON");
  }
  if (state && voltage < OFF_THRESHOLD) {
    state = false;
    Serial.println("State: OFF");
  }
  digitalWrite(LED_PIN, state);
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print(" V, State: ");
  Serial.println(state ? "ON" : "OFF");
  delay(100);
}`,
    requirements: ['analogRead', 'digitalWrite', 'Serial.print', 'delay', 'setup', 'loop'],
    hints: [
      'Use two thresholds for ON/OFF',
      'Avoid flickering',
      'Print state to Serial'
    ]
  },
  // 19. Multi-Loop Simulation
  {
    id: 'multi-loop-simulation',
    title: 'Multi-Loop Simulation',
    description: 'Create two LEDs controlled by switches with logic mimicking loop interaction. LED1 ON only if SW1 is HIGH and SW2 is LOW.',
    difficulty: 'intermediate',
    solution: `const int SW1_PIN = 2;
const int SW2_PIN = 3;
const int LED1_PIN = 12;
const int LED2_PIN = 13;
void setup() {
  Serial.begin(9600);
  pinMode(SW1_PIN, INPUT_PULLUP);
  pinMode(SW2_PIN, INPUT_PULLUP);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  Serial.println("Multi-Loop Logic Simulation");
}
void loop() {
  bool sw1 = !digitalRead(SW1_PIN);
  bool sw2 = !digitalRead(SW2_PIN);
  bool led1_state = sw1 && !sw2;
  bool led2_state = sw2 || sw1;
  digitalWrite(LED1_PIN, led1_state);
  digitalWrite(LED2_PIN, led2_state);
  Serial.print("SW1: ");
  Serial.print(sw1);
  Serial.print(", SW2: ");
  Serial.print(sw2);
  Serial.print(", LED1: ");
  Serial.print(led1_state);
  Serial.print(", LED2: ");
  Serial.println(led2_state);
  delay(200);
}`,
    requirements: ['digitalRead', 'digitalWrite', 'Serial.print', 'delay', 'pinMode', 'setup', 'loop'],
    hints: [
      'Use switches to control LEDs',
      'LED1 logic: SW1 && !SW2',
      'LED2 logic: SW2 || SW1'
    ]
  },
  // 20. Filtered PWM Simulation (No Real Filter)
  {
    id: 'filtered-pwm-simulation',
    title: 'Filtered PWM Simulation (No Real Filter)',
    description: 'Output variable PWM value based on ADC read and display equivalent analog voltage.',
    difficulty: 'beginner',
    solution: `const int ADC_PIN = A0;
const int PWM_PIN = 9;
const float VCC = 5.0;
void setup() {
  Serial.begin(9600);
  pinMode(PWM_PIN, OUTPUT);
  Serial.println("Filtered PWM Simulation");
}
void loop() {
  int adc_value = analogRead(ADC_PIN);
  int pwm_value = adc_value / 4;
  float equivalent_voltage = adc_value * (VCC / 1023.0);
  analogWrite(PWM_PIN, pwm_value);
  Serial.print("ADC: ");
  Serial.print(adc_value);
  Serial.print(", PWM: ");
  Serial.print(pwm_value);
  Serial.print(", Equivalent Voltage: ");
  Serial.print(equivalent_voltage);
  Serial.println(" V");
  delay(100);
}`,
    requirements: ['analogRead', 'analogWrite', 'Serial.print', 'delay', 'pinMode', 'setup', 'loop'],
    hints: [
      'Read ADC value',
      'Map to PWM output',
      'Print equivalent voltage to Serial'
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
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, ArrowRight, Zap } from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Building an LED Blinker Circuit with Arduino",
      excerpt: `Light Emitting Diodes (LEDs) are semiconductor devices that emit light when current flows through them. To control an LED with a microcontroller like Arduino, we need to understand a few key concepts:

1. **Forward Voltage**: LEDs have a forward voltage drop (typically 1.8-3.3V depending on color)
2. **Current Limiting**: LEDs require current limiting resistors to prevent damage
3. **Digital I/O**: Arduino pins can source/sink current to drive LEDs
4. **PWM (Pulse Width Modulation)**: Technique to control LED brightness by rapidly switching the pin on/off

For a basic LED circuit, we calculate the resistor value using Ohm's law:
R = (Vsupply - Vled) / Iled

Where:
- Vsupply = 5V (Arduino supply)
- Vled = 2.0V (typical red LED)
- Iled = 20mA (desired current)

Therefore: R = (5-2)/0.02 = 150Ω (use 220Ω for safety margin)

---

**Arduino LED Blinker Code**

void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}

---

**Circuit Simulation**

This circuit shows a simple LED connected to Arduino pin 13 through a 220Ω current-limiting resistor. The LED will blink on and off every second.`,
      author: "Circuit Scribe",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Beginner",
      tags: ["Arduino", "LED", "Beginner", "PWM"],
      icon: Zap,
      featured: true
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Engineering Blog 📚
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore tutorials, tips, and insights from real projects! Learn Arduino programming, 
          circuit design, and practical engineering concepts.
        </p>
      </div>

      {/* Featured Article */}
      {articles.filter(article => article.featured).map(article => {
        const Icon = article.icon;
        return (
          <Card key={article.id} className="border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              <CardTitle className="text-2xl flex items-center space-x-3">
                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span>{article.title}</span>
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <span>•</span>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Section: Understanding LED Control */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <span>💡</span> Understanding LED Control
                </h3>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="mb-3 text-gray-800 dark:text-gray-200">
                    Light Emitting Diodes (LEDs) are semiconductor devices that emit light when current flows through them. To control an LED with a microcontroller like Arduino, we need to understand a few key concepts:
                  </p>
                  <ul className="list-disc pl-6 mb-3 text-gray-800 dark:text-gray-200">
                    <li><b>Forward Voltage</b>: LEDs have a forward voltage drop (typically 1.8-3.3V depending on color)</li>
                    <li><b>Current Limiting</b>: LEDs require current limiting resistors to prevent damage</li>
                    <li><b>Digital I/O</b>: Arduino pins can source/sink current to drive LEDs</li>
                    <li><b>PWM (Pulse Width Modulation)</b>: Technique to control LED brightness by rapidly switching the pin on/off</li>
                  </ul>
                  <p className="mb-1 text-gray-800 dark:text-gray-200">For a basic LED circuit, we calculate the resistor value using Ohm's law:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-sm mb-1">R = (Vsupply - Vled) / Iled</pre>
                  <ul className="list-none pl-0 mb-1 text-gray-800 dark:text-gray-200">
                    <li>- Vsupply = 5V (Arduino supply)</li>
                    <li>- Vled = 2.0V (typical red LED)</li>
                    <li>- Iled = 20mA (desired current)</li>
                  </ul>
                  <p className="mb-0 text-gray-800 dark:text-gray-200">Therefore: <b>R = (5-2)/0.02 = 150Ω</b> (use 220Ω for safety margin)</p>
                </div>
              </div>

              {/* Section: Code Implementation */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-300">
                  <span>🧑‍💻</span> Code Implementation
                </h3>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Arduino LED Blinker Code</div>
                  <pre className="bg-black text-green-400 rounded p-4 overflow-x-auto text-sm mb-0">
{`void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`}
                  </pre>
                </div>
              </div>

              {/* Section: Circuit Simulation */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <span>🔬</span> Circuit Simulation
                </h3>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
                  <img
                    src="/circuit-20250713-0003.png"
                    alt="LED Blinker Circuit Schematic"
                    className="w-full max-w-xl h-auto border bg-white rounded mb-2"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    This circuit shows a simple LED connected to Arduino pin 13 through a 220Ω current-limiting resistor. The LED will blink on and off every second.
                  </p>
                </div>
              </div>

              {/* Tags and Read Article Button */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="flex items-center space-x-2" disabled>
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
        <CardContent className="pt-6">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              Stay Updated! ⚡
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest tutorials, project ideas, and engineering insights delivered to your inbox. 
              Join our community of makers and learners!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
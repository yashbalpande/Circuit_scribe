import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  User, 
  Tag, 
  Search, 
  ArrowLeft,
  Code,
  Zap,
  Lightbulb,
  Play,
  Copy,
  ExternalLink
} from 'lucide-react';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 'led-blinker-arduino',
      title: 'Building an LED Blinker Circuit with Arduino',
      author: 'Circuit Scribe',
      date: '2024-01-15',
      category: 'Arduino',
      tags: ['LED', 'Beginner', 'PWM'],
      readTime: '5 min read',
      excerpt: 'Learn the fundamentals of LED control with Arduino. From understanding forward voltage to implementing PWM, this guide covers everything you need to build your first blinking LED circuit.',
      image: '💡',
      content: `
## Understanding LED Control

Light Emitting Diodes (LEDs) are semiconductor devices that emit light when current flows through them. To control an LED with a microcontroller like Arduino, we need to understand a few key concepts:

### Key Concepts

1. **Forward Voltage**: LEDs have a forward voltage drop (typically 1.8-3.3V depending on color)
2. **Current Limiting**: LEDs require current limiting resistors to prevent damage  
3. **Digital I/O**: Arduino pins can source/sink current to drive LEDs
4. **PWM (Pulse Width Modulation)**: Technique to control LED brightness by rapidly switching the pin on/off

### Calculating Resistor Values

For a basic LED circuit, we calculate the resistor value using Ohm's law:

**R = (Vsupply - Vled) / Iled**

Where:
- Vsupply = 5V (Arduino supply)
- Vled = 2.0V (typical red LED)  
- Iled = 20mA (desired current)

Therefore: **R = (5-2)/0.02 = 150Ω** (use 220Ω for safety margin)

## Code Implementation

Here's how to implement a basic LED blinker:

### Basic Blink Code
\`\`\`arduino
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);  // Turn LED on
  delay(1000);             // Wait 1 second
  digitalWrite(13, LOW);   // Turn LED off
  delay(1000);             // Wait 1 second
}
\`\`\`

### PWM Fade Code
\`\`\`arduino
int ledPin = 9;    // LED connected to PWM pin
int brightness = 0;    // Current brightness
int fadeAmount = 5;    // Fade step size

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, brightness);
  brightness = brightness + fadeAmount;
  
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }
  delay(30);
}
\`\`\`

## Circuit Diagram

The circuit consists of:
- Arduino Uno
- LED (any color)
- 220Ω resistor
- Breadboard and jumper wires

**Connection:**
1. Connect Arduino pin 13 to one end of the 220Ω resistor
2. Connect the other end of the resistor to the positive leg (anode) of the LED
3. Connect the negative leg (cathode) of the LED to Arduino GND

## Why This Works

The Arduino's digital pin 13 can output either 5V (HIGH) or 0V (LOW). When set to HIGH, current flows through the resistor and LED, lighting it up. The resistor limits the current to a safe level (about 14mA with our 220Ω resistor).

## Next Steps

Try these variations:
- Change the delay times to make it blink faster/slower
- Use PWM to create a breathing effect
- Connect multiple LEDs to different pins
- Add a button to control the blinking

Happy building! ⚡✨
      `
    },
    {
      id: 'understanding-capacitors',
      title: 'Understanding Capacitors: Storage and Filtering',
      author: 'Circuit Scribe',
      date: '2024-01-10',
      category: 'Components',
      tags: ['Capacitor', 'Intermediate', 'Filtering'],
      readTime: '7 min read',
      excerpt: 'Dive deep into capacitors - how they store energy, their role in filtering, and practical applications in electronic circuits.',
      image: '🔋',
      content: `## What Are Capacitors?

Capacitors are passive electronic components that store electrical energy in an electric field. Think of them as tiny rechargeable batteries that can charge and discharge very quickly.

### How Capacitors Work

A capacitor consists of two conductive plates separated by an insulating material called a dielectric. When voltage is applied:

1. **Charging**: Electrons accumulate on one plate, creating a potential difference
2. **Storing**: Energy is stored in the electric field between the plates
3. **Discharging**: When connected to a load, stored energy is released

### Key Parameters

- **Capacitance (C)**: Measured in Farads (F), indicates storage capacity
- **Voltage Rating**: Maximum voltage the capacitor can handle safely
- **ESR (Equivalent Series Resistance)**: Internal resistance affecting performance

### Common Applications

1. **Power Supply Filtering**: Smoothing out voltage ripples
2. **Coupling/Decoupling**: Blocking DC while allowing AC signals
3. **Timing Circuits**: Used with resistors to create delays
4. **Energy Storage**: Providing quick bursts of power

### Types of Capacitors

- **Ceramic**: Small, stable, good for high frequencies
- **Electrolytic**: High capacitance, polarized, good for power supplies
- **Tantalum**: Stable, reliable, used in critical applications
- **Film**: Low ESR, good for audio applications

Understanding capacitors is crucial for designing stable, efficient electronic circuits! 🚀`
    },
    {
      id: 'ohms-law-practical',
      title: "Ohm's Law in Practice: Real Circuit Examples",
      author: 'Circuit Scribe', 
      date: '2024-01-05',
      category: 'Fundamentals',
      tags: ['Ohms Law', 'Beginner', 'Calculations'],
      readTime: '4 min read',
      excerpt: "Master Ohm's Law with practical examples and real-world applications. Learn to calculate voltage, current, and resistance in everyday circuits.",
      image: '⚡',
      content: `## Ohm's Law: The Foundation of Electronics

Ohm's Law is the most fundamental relationship in electronics, relating voltage, current, and resistance.

### The Basic Formula

**V = I × R**

Where:
- V = Voltage (Volts)
- I = Current (Amperes) 
- R = Resistance (Ohms)

### Practical Example 1: LED Circuit

Let's calculate the resistor needed for an LED:

**Given:**
- Supply voltage: 5V
- LED forward voltage: 2V
- Desired current: 20mA (0.02A)

**Solution:**
- Voltage across resistor = 5V - 2V = 3V
- Using V = I × R: R = V/I = 3V/0.02A = 150Ω

### Practical Example 2: Power Calculations

Power consumed by a component:
**P = V × I = I² × R = V²/R**

For our LED circuit:
- P = I² × R = (0.02)² × 150 = 0.06W

### Memory Tricks

Use the "Magic Triangle":

Cover what you want to find:
- Want V? V = I × R
- Want I? I = V/R  
- Want R? R = V/I

### Real-World Applications

1. **Battery Life**: Calculate how long a battery will last
2. **Heat Generation**: Determine if components need heat sinks
3. **Wire Sizing**: Choose appropriate wire gauge for current
4. **Fuse Selection**: Pick the right fuse rating

Master Ohm's Law, and you've mastered the basics of electronics! 💡`
    }
  ];

  const categories = ['All', 'Arduino', 'Components', 'Fundamentals', 'Advanced'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPost(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>

        <article className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
            <CardHeader className="text-center pb-8">
              <div className="text-6xl mb-4">{post.image}</div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                {post.title}
              </CardTitle>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Badge variant="outline">{post.category}</Badge>
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">$1</h2>')
                    .replace(/```arduino\n([\s\S]*?)\n```/g, 
                      '<div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-4 relative"><div class="flex justify-between items-center mb-2"><span class="text-blue-400">Arduino Code</span><button onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)" class="text-gray-400 hover:text-white"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></button></div><pre>$1</pre></div>')
                    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(.*)$/gm, '<p class="mb-4">$1</p>')
                    .replace(/<p class="mb-4"><\/p>/g, '')
                }}
              />
            </CardContent>
          </Card>

          {/* Related Posts or Comments section could go here */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mt-8">
            <CardContent className="p-6 text-center">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Found this helpful? ⚡
              </h3>
              <p className="text-gray-700">
                Keep exploring more tutorials and challenges to master electrical engineering concepts!
                Every expert was once a beginner! 🚀
              </p>
            </CardContent>
          </Card>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          📚 Engineering Blog
        </h2>
        <p className="text-gray-600 text-lg">
          Explore tutorials, tips, and insights to level up your electrical engineering skills! 
          Learn from real projects and practical examples! ⚡
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card 
            key={post.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white/90 backdrop-blur-sm border-gray-200"
            onClick={() => setSelectedPost(post.id)}
          >
            <CardHeader>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{post.image}</div>
                <Badge variant="outline" className="mb-2">{post.category}</Badge>
              </div>
              <CardTitle className="text-blue-600 text-lg line-clamp-2">
                {post.title}
              </CardTitle>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{post.readTime}</span>
                <Button size="sm" variant="outline">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all categories.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Featured Section */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Zap className="h-12 w-12 text-orange-500 animate-pulse" />
              <Code className="h-6 w-6 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Want to contribute? 🚀
          </h3>
          <p className="text-gray-700 mb-4">
            Have an amazing project or tutorial to share? We'd love to feature your work 
            and help other engineers learn from your experience!
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <ExternalLink className="h-4 w-4 mr-2" />
            Submit Your Article
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
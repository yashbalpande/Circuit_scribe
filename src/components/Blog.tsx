import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, ArrowRight, Zap } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Helper to render HTML with syntax highlighting for code blocks
const renderExcerptWithCode = (excerpt: string) => {
  // Replace triple backtick code blocks with syntax highlighted components
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];
  let match;
  let key = 0;
  while ((match = codeBlockRegex.exec(excerpt)) !== null) {
    // Text before code block
    if (match.index > lastIndex) {
      const text = excerpt.slice(lastIndex, match.index);
      elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />);
    }
    // Code block
    const lang = match[1] || 'cpp';
    const code = match[2];
    elements.push(
      <div key={key++} className="my-4">
        <ReactSyntaxHighlighter language={lang} style={atomOneLight} className="rounded-lg text-sm" showLineNumbers>
          {code}
        </ReactSyntaxHighlighter>
      </div>
    );
    lastIndex = codeBlockRegex.lastIndex;
  }
  // Remaining text after last code block
  if (lastIndex < excerpt.length) {
    elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: excerpt.slice(lastIndex).replace(/\n/g, '<br/>') }} />);
  }
  return elements;
};

const Blog = () => {
  const [articles, setArticles] = useState([
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
      author: "Circuit Scribe Team",
      date: "2024-07-13",
      readTime: "8 min read",
      category: "Beginner",
      tags: ["Arduino", "LED", "Beginner", "PWM"],
      icon: Zap,
      featured: true
    },
    {
      id: 2,
      title: "Making Microcontrollers Speak: Audio with PWM & Filters",
      excerpt: "Ever tried to make your microcontroller speak or play a tone and it sounded more like static than music? That’s because microcontrollers aren't naturally built for analog sound but with Pulse Width Modulation (PWM) and a simple filter, you can turn those jagged pulses into smooth, audible sound. Let’s dive into how you can generate decent quality audio using just PWM, a filter, and some clever coding.\n\n" +
        "PWM creates a square wave with variable duty cycles to approximate analog signals. By adjusting the pulse width rapidly, you can encode audio amplitude into the digital signal. However, PWM signals are still steppy. To make them smooth, you need a Low-Pass Filter to filter out the high-frequency components, leaving behind the audio waveform.\n\n" +
        "**Analogy Time: Water Faucet Drips:**\nImagine controlling water flow with rapid on-off bursts. If the bursts are fast enough, the flow feels continuous, that's PWM. The filter is like a sponge that absorbs the bursts, smoothing the flow into a steady stream.\n\n" +
        "---\n\n" +
        "**Generating Simple Tones with PWM**\n\n*Case: Create a basic tone generator using PWM on Arduino.*\n\n" +
        "```cpp\nconst int speakerPin = 9;\nvoid setup() {\n  pinMode(speakerPin, OUTPUT);\n}\nvoid loop() {\n  tone(speakerPin, 1000); // Play 1kHz tone\n  delay(1000);\n  noTone(speakerPin);\n  delay(500);\n}\n```\n\n" +
        "_Real Life Case: Useful for alerts, beeps, or notification sounds._\n\n---\n\n" +
        "**Playing Audio Samples via PWM**\n\n*Case: Playing pre-recorded audio (like a WAV file) using PWM.*\n\n" +
        "```cpp\n#include <Arduino.h>\nconst int pwmPin = 9;\nconst unsigned char audioData[] = {128, 200, 255, 200, 128, 50, 0, 50};\nint index = 0;\nvoid setup() {\n  pinMode(pwmPin, OUTPUT);\n  analogWrite(pwmPin, 128);\n}\nvoid loop() {\n  analogWrite(pwmPin, audioData[index]);\n  index = (index + 1) % (sizeof(audioData) / sizeof(audioData[0]));\n  delayMicroseconds(125); // Controls playback rate\n}\n```\n\n" +
        "_Real Life Case: Enables simple audio playback in toys, gadgets, or notifications without needing a DAC._\n\n---\n\n" +
        "**Generating Varying Audio Frequencies via PWM**\n\n*Case: Use PWM to dynamically generate different tones like a simple melody.*\n\n" +
        "```cpp\nconst int speakerPin = 9;\n// C major scale frequencies\nint melody[] = {262, 294, 330, 349, 392, 440, 494, 523};\nvoid setup() {\n  pinMode(speakerPin, OUTPUT);\n}\nvoid loop() {\n  for (int i = 0; i < 8; i++) {\n    tone(speakerPin, melody[i]);\n    delay(300);\n    noTone(speakerPin);\n    delay(50);\n  }\n  delay(1000); // Pause before repeating\n}\n```\n\n" +
        "_Real Life Case: Common in toys, alarms, or any embedded device needing audible feedback or melodies._",
      author: "Circuit Scribe Team",
      date: "2024-07-14",
      readTime: "10 min read",
      category: "Intermediate",
      tags: ["Arduino", "PWM", "Audio", "Embedded"],
      icon: BookOpen,
      featured: false
    },
    {
      id: 4,
      title: "Filtering the Noise: Bandpass & Notch Filters in Embedded Systems",
      excerpt:
        "Ever dealt with annoying background noise in a sensor reading or wondered how devices like radios or medical monitors keep their signals clean? That’s where bandpass and notch filters quietly do the heavy lifting. In the world of embedded systems, filters aren’t just for sound engineers, they're your toolkit for ensuring that the data and signals you process are sharp, clear, and reliable. Let’s see how these filters help us separate the signal from the noise, both literally and figuratively.<br/><br/>" +
        "**Bandpass Filter:** Allows only a specific range of frequencies to pass through while attenuating frequencies outside this range.<br/>" +
        "**Notch (Bandstop) Filter:** Blocks or attenuates a specific narrow band of frequencies, allowing others to pass.<br/><br/>" +
        "**Analogy Time: Frequency Bouncer:**<br/>" +
        "Imagine a club where the bouncer only lets in people (frequencies) from a certain age group.<br/>" +
        "- Bandpass Filter: Only lets in people aged 20-30 (desired frequency range)<br/>" +
        "- Notch Filter: Bans a specific troublemaker (unwanted frequency), while others can party.<br/><br/>" +
        "---<br/><br/>" +
        "**Cleaning Audio Signals**<br/>" +
        "*Case: Removing unwanted low-frequency hums and high-frequency hiss from microphone inputs.*<br/><br/>" +
        "```cpp\n// Pseudo-logic for filtering in microcontrollers using a basic moving\naverage as a smoothing filter\nconst int micPin = A0;\nint rawAudio;\nint filteredAudio;\nvoid setup() {\nSerial.begin(9600);\n}\nvoid loop() {\nrawAudio = analogRead(micPin);\n// Simulating basic filtering effect\nfilteredAudio = constrain(rawAudio, 300, 700); // bandpass constraint\nSerial.println(filteredAudio);\ndelay(10);\n}\n```<br/>" +
        "_Real Life Case: Produces clearer audio for voice recognition or communication devices._<br/><br/>" +
        "---<br/><br/>" +
        "**Power Line Noise Removal**<br/>" +
        "*Case: Removing 50Hz or 60Hz noise from analog sensor readings.*<br/><br/>" +
        "```cpp\n const int sensorPin = A1;\n int rawData;\nint cleanData;\nvoid setup() {\nSerial.begin(9600);\n}\nvoid loop() {\nrawData = analogRead(sensorPin);\n// Simulate a software-based notch filter by ignoring specific ranges\nif (rawData > 480 && rawData < 520) {\ncleanData = 500; // Suppressing the noisy band\n} else {\ncleanData = rawData;\n}\nSerial.println(cleanData);\ndelay(10);\n}\n```<br/>" +
        "_Real Life Case: Improves reliability of analog sensors in industrial environments._<br/><br/>" +
        "---<br/><br/>" +
        "**RF Communication Tuning**<br/>" +
        "*Case: Tuning a radio receiver to only pick signals in the desired frequency band, ignoring side noise.*<br/><br/>" +
        "```cpp\n// Simulated frequency selector\nint incomingSignalFreq = 915; // Example frequency in MHz\nint lowerBound = 900;\nint upperBound = 930;\nvoid setup() {\nSerial.begin(9600);\n}\nvoid loop() {\nif (incomingSignalFreq >= lowerBound && incomingSignalFreq <= upperBound) {\nSerial.println(\"Signal Accepted\");\n} else {\nSerial.println(\"Signal Rejected\");\n}\ndelay(1000);\n}\n```<br/>" +
        "_Real Life Case: Ensures stable wireless communication by preventing interference._",
      author: "Embedded Insights Team",
      date: "2024-07-14",
      readTime: "7 min read",
      category: "Signal Processing",
      tags: ["Filters", "Bandpass", "Notch", "Embedded", "Noise"],
      icon: Zap,
      featured: false
    },
  ]);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    author: '',
    date: '',
    readTime: '',
    category: '',
    tags: '',
    featured: false,
    imageUrl: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleExcerptChange = (value: string) => {
    setForm(prev => ({ ...prev, excerpt: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt) return;
    setArticles(prev => [
      {
        id: Date.now(),
        title: form.title,
        excerpt: form.excerpt,
        author: form.author || 'Anonymous',
        date: form.date || new Date().toISOString().slice(0, 10),
        readTime: form.readTime || '5 min read',
        category: form.category || 'General',
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        icon: BookOpen,
        featured: form.featured,
        imageUrl: form.imageUrl,
      },
      ...prev,
    ]);
    setForm({
      title: '', excerpt: '', author: '', date: '', readTime: '', category: '', tags: '', featured: false, imageUrl: '',
    });
    setShowForm(false);
  };

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
    <div className="space-y-12 max-w-4xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Engineering Blog <span role="img" aria-label="books">📚</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore tutorials, tips, and insights from real projects! Learn Arduino programming, 
          circuit design, and practical engineering concepts.
        </p>
      </div>

      {/* Blog Add Form Toggle */}
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(f => !f)} variant="outline">
          {showForm ? 'Cancel' : 'Add Blog'}
        </Button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8 space-y-4 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Title</label>
            <input name="title" value={form.title} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Excerpt / Content</label>
            <ReactQuill value={form.excerpt} onChange={handleExcerptChange} theme="snow" modules={{ toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline', 'code-block'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean']
            ]}} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Author</label>
            <input name="author" value={form.author} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Date</label>
            <input name="date" type="date" value={form.date} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Read Time</label>
            <input name="readTime" value={form.readTime} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Category</label>
            <input name="category" value={form.category} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <div className="flex items-center gap-2">
            <input name="featured" type="checkbox" checked={form.featured} onChange={handleFormChange} />
            <label className="font-semibold">Featured</label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Image URL (optional)</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      )}

      {/* Blog Articles */}
      <div className="space-y-10">
        {articles.map(article => (
          <Card key={article.id} className={`relative group transition-shadow duration-200 shadow-md hover:shadow-xl border-2 ${article.featured ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-gray-950`}>  
            {article.featured && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">Featured</span>
            )}
            <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{article.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {article.author || 'Anonymous'}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.date}</span>
                  <span className="flex items-center gap-1"><ArrowRight className="w-4 h-4" /> {article.readTime}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(article.category)}`}>{article.category}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags && article.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-0.5 text-xs font-medium">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-base dark:prose-invert max-w-none text-gray-800 dark:text-gray-100 leading-relaxed">
              {/* Render excerpt/content as HTML for formatting and highlight code blocks */}
              {renderExcerptWithCode(article.excerpt)}
            </CardContent>
          </Card>
        ))}
      </div>

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
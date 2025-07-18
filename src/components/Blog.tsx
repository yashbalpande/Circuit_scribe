import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactSyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, ArrowRight, Zap, Tag } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// Helper to render HTML with syntax highlighting for code blocks
const renderExcerptWithCode = (excerpt: string) => {
  // Replace triple backtick code blocks with syntax highlighted components
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];
  let match;
  let key = 0;
  // Custom regex for Analogy Time block
  const analogyRegex = /\*\*Analogy Time:([^\n]*)\*\*/g;
  // First, split excerpt into code and non-code blocks
  while ((match = codeBlockRegex.exec(excerpt)) !== null) {
    // Text before code block
    if (match.index > lastIndex) {
      let text = excerpt.slice(lastIndex, match.index);
      // Replace Analogy Time block with styled span
      text = text.replace(analogyRegex, (m, p1) =>
        `<span class="analogy-block"><b>🔎 Analogy Time:${p1}</b></span>`
      );
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
    let text = excerpt.slice(lastIndex);
    text = text.replace(analogyRegex, (m, p1) =>
      `<span class="analogy-block"><b>🔎 Analogy Time:${p1}</b></span>`
    );
    elements.push(<span key={key++} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />);
  }
  return elements;
};

const Blog = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Building an LED Blinker Circuit with Arduino",
      excerpt: `Light Emitting Diodes (LEDs) are semiconductor devices that emit light when current flows through them. To control an LED with a microcontroller like Arduino, we need to understand a few key concepts. For a basic LED circuit, we calculate the resistor value using Ohm's law. This circuit shows a simple LED connected to Arduino pin 13 through a 220\u03A9 current-limiting resistor. The LED will blink on and off every second.`,
      content: `Light Emitting Diodes (LEDs) are semiconductor devices that emit light when current flows through them. To control an LED with a microcontroller like Arduino, we need to understand a few key concepts.

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

Therefore: R = (5-2)/0.02 = 150\u03A9 (use 220\u03A9 for safety margin)

---

**Arduino LED Blinker Code**

~~~cpp
void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
~~~

---

**Circuit Simulation**

This circuit shows a simple LED connected to Arduino pin 13 through a 220\u03A9 current-limiting resistor. The LED will blink on and off every second.`,
      author: "CircuitCode Team",
      date: "2024-07-13",
      readTime: "8 min read",
      category: "Beginner",
      tags: ["Arduino", "LED", "Beginner", "PWM"],
      icon: Zap,
      featured: true,
      imageUrl: '/public/circuit-20250713-0003.png',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=CircuitCodeTeam'
    },
    {
      id: 2,
      title: "Making Microcontrollers Speak: Audio with PWM & Filters",
      excerpt: `Ever tried to make your microcontroller speak or play a tone and it sounded more like static than music? ...`,
      content: `Ever tried to make your microcontroller speak or play a tone and it sounded more like static than music? That’s because microcontrollers aren't naturally built for analog sound but with Pulse Width Modulation (PWM) and a simple filter, you can turn those jagged pulses into smooth, audible sound. Let’s dive into how you can generate decent quality audio using just PWM, a filter, and some clever coding.

PWM creates a square wave with variable duty cycles to approximate analog signals. By adjusting the pulse width rapidly, you can encode audio amplitude into the digital signal. However, PWM signals are still steppy. To make them smooth, you need a Low-Pass Filter to filter out the high-frequency components, leaving behind the audio waveform.

**Analogy Time: Water Faucet Drips:**
Imagine controlling water flow with rapid on-off bursts. If the bursts are fast enough, the flow feels continuous, that's PWM. The filter is like a sponge that absorbs the bursts, smoothing the flow into a steady stream.

---

**Generating Simple Tones with PWM**

*Case: Create a basic tone generator using PWM on Arduino.*

~~~cpp
const int speakerPin = 9;
void setup() {
  pinMode(speakerPin, OUTPUT);
}
void loop() {
  tone(speakerPin, 1000); // Play 1kHz tone
  delay(1000);
  noTone(speakerPin);
  delay(500);
}
~~~

Real Life Case: Useful for alerts, beeps, or notification sounds._

---

**Playing Audio Samples via PWM**

*Case: Playing pre-recorded audio (like a WAV file) using PWM.*

~~~cpp
#include <Arduino.h>
const int pwmPin = 9;
const unsigned char audioData[] = {128, 200, 255, 200, 128, 50, 0, 50};
int index = 0;
void setup() {
  pinMode(pwmPin, OUTPUT);
  analogWrite(pwmPin, 128);
}
void loop() {
  analogWrite(pwmPin, audioData[index]);
  index = (index + 1) % (sizeof(audioData) / sizeof(audioData[0]));
  delayMicroseconds(125); // Controls playback rate
}
~~~

Real Life Case: Enables simple audio playback in toys, gadgets, or notifications without needing a DAC._

---

**Generating Varying Audio Frequencies via PWM**

*Case: Use PWM to dynamically generate different tones like a simple melody.*

~~~cpp
const int speakerPin = 9;
// C major scale frequencies
int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};
void setup() {
  pinMode(speakerPin, OUTPUT);
}
void loop() {
  for (int i = 0; i < 8; i++) {
    tone(speakerPin, melody[i]);
    delay(300);
    noTone(speakerPin);
    delay(50);
  }
  delay(1000); // Pause before repeating
}
~~~

Real Life Case: Common in toys, alarms, or any embedded device needing audible feedback or melodies._`,
      author: "CircuitCode Team",
      date: "2024-07-14",
      readTime: "10 min read",
      category: "Intermediate",
      tags: ["Arduino", "PWM", "Audio", "Embedded"],
      icon: BookOpen,
      featured: false,
      imageUrl: '/public/circuit-20250713-0003.png',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=CircuitCodeTeam'
    },
    {
      id: 4,
      title: "Filtering the Noise: Bandpass & Notch Filters in Embedded Systems",
      excerpt: `Ever dealt with annoying background noise in a sensor reading or wondered how devices like radios or medical monitors keep their signals clean? ...`,
      content: `Ever dealt with annoying background noise in a sensor reading or wondered how devices like radios or medical monitors keep their signals clean? That’s where bandpass and notch filters quietly do the heavy lifting. In the world of embedded systems, filters aren’t just for sound engineers, they're your toolkit for ensuring that the data and signals you process are sharp, clear, and reliable. Let’s see how these filters help us separate the signal from the noise, both literally and figuratively.

**Bandpass Filter:** Allows only a specific range of frequencies to pass through while attenuating frequencies outside this range.
**Notch (Bandstop) Filter:** Blocks or attenuates a specific narrow band of frequencies, allowing others to pass.

**Analogy Time: Frequency Bouncer:**
Imagine a club where the bouncer only lets in people (frequencies) from a certain age group.
- Bandpass Filter: Only lets in people aged 20-30 (desired frequency range)
- Notch Filter: Bans a specific troublemaker (unwanted frequency), while others can party.

---

**Cleaning Audio Signals**
*Case: Removing unwanted low-frequency hums and high-frequency hiss from microphone inputs.*

~~~cpp
// Pseudo-logic for filtering in microcontrollers using a basic moving
average as a smoothing filter
const int micPin = A0;
int rawAudio;
int filteredAudio;
void setup() {
Serial.begin(9600);
}
void loop() {
rawAudio = analogRead(micPin);
// Simulating basic filtering effect
filteredAudio = constrain(rawAudio, 300, 700); // bandpass constraint
Serial.println(filteredAudio);
delay(10);
}
~~~

_Real Life Case: Produces clearer audio for voice recognition or communication devices._

---

**Power Line Noise Removal**
*Case: Removing 50Hz or 60Hz noise from analog sensor readings.*

~~~cpp
 const int sensorPin = A1;
 int rawData;
int cleanData;
void setup() {
Serial.begin(9600);
}
void loop() {
rawData = analogRead(sensorPin);
// Simulate a software-based notch filter by ignoring specific ranges
if (rawData > 480 && rawData < 520) {
cleanData = 500; // Suppressing the noisy band
} else {
cleanData = rawData;
}
Serial.println(cleanData);
delay(10);
}
~~~

_Real Life Case: Improves reliability of analog sensors in industrial environments._

---

**RF Communication Tuning**
*Case: Tuning a radio receiver to only pick signals in the desired frequency band, ignoring side noise.*

~~~cpp
// Simulated frequency selector
int incomingSignalFreq = 915; // Example frequency in MHz
int lowerBound = 900;
int upperBound = 930;
void setup() {
Serial.begin(9600);
}
void loop() {
if (incomingSignalFreq >= lowerBound && incomingSignalFreq <= upperBound) {
Serial.println("Signal Accepted");
} else {
Serial.println("Signal Rejected");
}
delay(1000);
}
~~~

_Real Life Case: Ensures stable wireless communication by preventing interference._`,
      author: "Embedded Insights Team",
      date: "2024-07-14",
      readTime: "7 min read",
      category: "Signal Processing",
      tags: ["Filters", "Bandpass", "Notch", "Embedded", "Noise"],
      icon: Zap,
      featured: false,
      imageUrl: '/public/circuit-20250713-0003.png',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=EmbeddedInsightsTeam'
    }
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
    avatarUrl: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<null | typeof articles[0]>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    }
    setForm(prev => ({
      ...prev,
      [name]: fieldValue,
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
        content: form.excerpt, // Ensure content field is present
        author: form.author || 'Anonymous',
        date: form.date || new Date().toISOString().slice(0, 10),
        readTime: form.readTime || '5 min read',
        category: form.category || 'General',
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        icon: BookOpen,
        featured: form.featured,
        imageUrl: form.imageUrl || '/public/circuit-20250713-0003.png',
        avatarUrl: form.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(form.author || 'Anonymous')}`,
      },
      ...prev.map(a => ({ ...a, content: a.content ?? a.excerpt })),
    ]);
    setForm({
      title: '', excerpt: '', author: '', date: '', readTime: '', category: '', tags: '', featured: false, imageUrl: '', avatarUrl: '',
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
    <div className="space-y-12 max-w-6xl mx-auto px-2 sm:px-4">
      {/* Hero Banner */}
      <section className="w-full bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-8 px-6 py-10 md:py-16 mb-8 relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-purple-800 dark:text-yellow-200 mb-2 leading-tight">
            Welcome to the CircuitCode Blog!
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-pink-600 dark:text-yellow-400 mb-2">Explore real-world electrical engineering stories, tutorials, and student journeys.</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-xl">
            Dive into hands-on projects, simulation tips, and community insights. Learn, share, and grow with fellow makers!
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src="/public/circuit-20250713-0003.png" alt="Circuit board illustration" className="w-64 h-40 object-contain rounded-2xl shadow-xl border-2 border-purple-200 dark:border-yellow-300" />
        </div>
      </section>
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
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Avatar URL (optional)</label>
            <input name="avatarUrl" value={form.avatarUrl} onChange={handleFormChange} className="border rounded px-3 py-2 dark:bg-gray-800" />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      )}

      {/* Blog Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <motion.div
            key={article.id}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,0,120,0.12)' }}
            className="bg-white dark:bg-gray-950 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden transition-all duration-200 group hover:shadow-xl"
            onClick={() => setSelectedArticle(article)}
          >
            {/* Thumbnail */}
            <div className="h-40 w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                src={article.imageUrl || '/public/circuit-20250713-0003.png'}
                alt={article.title + ' thumbnail'}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Card Content */}
            <div className="flex-1 flex flex-col p-5 gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(article.category)}`}>{article.category}</span>
              </div>
              <h3 className="text-lg font-bold text-purple-800 dark:text-yellow-200 mb-1 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{article.excerpt.replace(/\n/g, ' ').replace(/\*\*.*?\*\*/g, '').slice(0, 120)}...</p>
              <div className="flex items-center gap-2 mt-auto pt-2">
                <img
                  src={article.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + encodeURIComponent(article.author || 'Anonymous')}
                  alt={article.author + ' avatar'}
                  className="w-8 h-8 rounded-full border border-purple-200 dark:border-yellow-300 object-cover"
                />
                <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{article.author || 'Anonymous'}</span>
                <span className="text-xs text-gray-400 ml-2">{article.date}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {article.tags && article.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-0.5 text-xs font-medium rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 relative animate-fade-in-up overflow-y-auto max-h-[90vh]">
            <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 dark:hover:text-yellow-300 text-2xl font-bold">&times;</button>
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title + ' featured'} className="w-full h-48 object-cover rounded-xl mb-4 border border-purple-200 dark:border-yellow-300" />
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(selectedArticle.category)}`}>{selectedArticle.category}</span>
              <span className="text-xs text-gray-400 ml-2">{selectedArticle.date}</span>
              <span className="text-xs text-gray-400 ml-2">{selectedArticle.readTime}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-purple-800 dark:text-yellow-200 mb-2">{selectedArticle.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <img src={selectedArticle.avatarUrl} alt={selectedArticle.author + ' avatar'} className="w-8 h-8 rounded-full border border-purple-200 dark:border-yellow-300 object-cover" />
              <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{selectedArticle.author}</span>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-100 leading-relaxed">
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    return !inline ? (
                      <pre className="bg-gray-900 text-pink-200 rounded-lg p-4 overflow-x-auto text-base my-4">
                        <code>{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 text-pink-700 dark:text-pink-300">{children}</code>
                    );
                  },
                  blockquote({children}) {
                    return <blockquote className="border-l-4 border-purple-400 bg-purple-50 dark:bg-gray-800 p-4 my-4 italic text-purple-900 dark:text-purple-200">{children}</blockquote>;
                  },
                  h2({children}) {
                    return <h2 className="text-2xl font-bold mt-8 mb-3 text-purple-700 dark:text-yellow-200">{children}</h2>;
                  },
                  h3({children}) {
                    return <h3 className="text-xl font-semibold mt-6 mb-2 text-pink-700 dark:text-yellow-300">{children}</h3>;
                  },
                  ul({children}) {
                    return <ul className="list-disc ml-6 mb-4">{children}</ul>;
                  },
                  ol({children}) {
                    return <ol className="list-decimal ml-6 mb-4">{children}</ol>;
                  },
                  li({children}) {
                    return <li className="mb-1">{children}</li>;
                  },
                  strong({children}) {
                    return <strong className="text-purple-700 dark:text-yellow-200 font-extrabold">{children}</strong>;
                  },
                  em({children}) {
                    return <em className="text-pink-600 dark:text-yellow-300 italic">{children}</em>;
                  },
                  a({href, children}) {
                    return <a href={href} className="text-blue-600 underline hover:text-blue-800 dark:text-yellow-300" target="_blank" rel="noopener noreferrer">{children}</a>;
                  },
                }}
              >
                {selectedArticle.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

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
      <style>{`
        .analogy-block {
          display: inline-block;
          font-weight: bold;
          color: #a21caf;
          font-size: 1.1em;
          background: #f3e8ff;
          border-left: 4px solid #a21caf;
          padding: 0.1em 0.6em;
          margin: 0.3em 0;
          border-radius: 0.5em;
          box-shadow: 0 1px 4px 0 #a21caf22;
        }
      `}</style>
    </div>
  );
};

export default Blog;
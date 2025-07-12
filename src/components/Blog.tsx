import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Zap, 
  Code, 
  Lightbulb, 
  Wrench,
  Cpu,
  Battery,
  Gauge
} from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Getting Started with Arduino: Your First LED Blink",
      excerpt: "Learn the fundamentals of Arduino programming by creating your first circuit - a blinking LED. This beginner-friendly guide covers everything from setting up your Arduino IDE to understanding basic programming concepts.",
      author: "Circuit Scribe Team",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Beginner",
      tags: ["Arduino", "LED", "Basics"],
      icon: Zap,
      featured: true
    },
    {
      id: 2,
      title: "Understanding PWM: Pulse Width Modulation Explained",
      excerpt: "Dive deep into PWM technology and learn how to control LED brightness, servo motors, and create smooth analog-like outputs using digital signals. Perfect for intermediate Arduino users.",
      author: "Circuit Scribe Team",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Intermediate",
      tags: ["PWM", "Analog", "Control"],
      icon: Gauge,
      featured: false
    },
    {
      id: 3,
      title: "Building a Smart Home Sensor Network",
      excerpt: "Create a network of sensors to monitor your home environment. Learn about I2C communication, sensor interfacing, and data logging with Arduino and various sensors.",
      author: "Circuit Scribe Team",
      date: "2024-01-08",
      readTime: "15 min read",
      category: "Advanced",
      tags: ["IoT", "Sensors", "Networking"],
      icon: Cpu,
      featured: false
    },
    {
      id: 4,
      title: "Debugging Arduino Code: Common Mistakes and Solutions",
      excerpt: "Master the art of debugging Arduino projects. Learn about common programming errors, how to use the Serial Monitor effectively, and troubleshooting techniques for hardware issues.",
      author: "Circuit Scribe Team",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Beginner",
      tags: ["Debugging", "Troubleshooting", "Tips"],
      icon: Wrench,
      featured: false
    },
    {
      id: 5,
      title: "Power Management in Embedded Systems",
      excerpt: "Explore efficient power management techniques for battery-powered Arduino projects. Learn about sleep modes, power consumption optimization, and extending battery life.",
      author: "Circuit Scribe Team",
      date: "2024-01-03",
      readTime: "14 min read",
      category: "Intermediate",
      tags: ["Power", "Battery", "Optimization"],
      icon: Battery,
      featured: false
    },
    {
      id: 6,
      title: "Advanced Arduino Libraries: Beyond the Basics",
      excerpt: "Discover powerful Arduino libraries that can take your projects to the next level. From display libraries to advanced communication protocols, expand your Arduino capabilities.",
      author: "Circuit Scribe Team",
      date: "2024-01-01",
      readTime: "11 min read",
      category: "Intermediate",
      tags: ["Libraries", "Advanced", "Programming"],
      icon: Code,
      featured: false
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
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="flex items-center space-x-2">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Article Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.filter(article => !article.featured).map(article => {
          const Icon = article.icon;
          return (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>{article.title}</span>
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
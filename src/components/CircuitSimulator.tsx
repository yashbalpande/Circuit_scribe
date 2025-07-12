
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Play, Square, RotateCcw, Lightbulb, Battery } from 'lucide-react';

const CircuitSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState('resistor');

  const components = [
    { id: 'resistor', name: 'Resistor', icon: '🔌', description: 'Limits current flow' },
    { id: 'capacitor', name: 'Capacitor', icon: '🔋', description: 'Stores electrical energy' },
    { id: 'led', name: 'LED', icon: '💡', description: 'Light Emitting Diode' },
    { id: 'battery', name: 'Battery', icon: '🔋', description: 'Provides voltage' }
  ];

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setCurrentFlow(Math.random() * 100);
    } else {
      setCurrentFlow(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ⚡ Circuit Simulator ⚡
        </h2>
        <p className="text-gray-600 text-lg">
          Let's build some circuits and watch the magic happen! Don't worry - you can't break anything here! 😊
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Component Palette */}
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Lightbulb className="h-5 w-5" />
              <span>Components</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {components.map((component) => (
              <div
                key={component.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedComponent === component.id
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedComponent(component.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{component.icon}</span>
                  <div>
                    <div className="font-medium text-gray-800">{component.name}</div>
                    <div className="text-sm text-gray-600">{component.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Circuit Canvas */}
        <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-600">
                <Zap className="h-5 w-5" />
                <span>Circuit Canvas</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={toggleSimulation}
                  className={`${
                    isRunning 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isRunning ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isRunning ? 'Stop' : 'Start'}
                </Button>
                <Button variant="outline" onClick={() => setCurrentFlow(0)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              {/* Simple Circuit Visualization */}
              <div className="relative">
                {/* Battery */}
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <Battery className="h-8 w-8 text-green-600" />
                    <span className="text-xs text-gray-600 mt-1">9V Battery</span>
                  </div>
                  
                  {/* Wire with Current Flow Animation */}
                  <div className="relative">
                    <div className="w-32 h-1 bg-gray-400 rounded"></div>
                    {isRunning && (
                      <div className="absolute top-0 left-0 w-4 h-1 bg-yellow-400 rounded animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Component */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
                      {components.find(c => c.id === selectedComponent)?.icon}
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                      {components.find(c => c.id === selectedComponent)?.name}
                    </span>
                  </div>
                  
                  {/* Return Wire */}
                  <div className="relative">
                    <div className="w-32 h-1 bg-gray-400 rounded"></div>
                    {isRunning && (
                      <div className="absolute top-0 right-0 w-4 h-1 bg-blue-400 rounded animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                {/* Current Flow Indicator */}
                {isRunning && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-yellow-800">
                        ⚡ Current: {currentFlow.toFixed(1)} mA
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Encouragement Message */}
            <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Great job experimenting! 🎉</span> 
                {isRunning 
                  ? " Look at that current flowing! You're doing amazing! Keep exploring different components."
                  : " Ready to see some electrical magic? Hit that Start button and watch electrons dance! ✨"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600 flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>💡 Quick Learning Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Think of electrical current like water flowing through pipes! The battery is like a water pump, 
            resistors are like narrow sections that slow the flow, and capacitors are like water tanks that 
            can store and release water. Simple analogies make complex concepts click! 🌊⚡
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitSimulator;

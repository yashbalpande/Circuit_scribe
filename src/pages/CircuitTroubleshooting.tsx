import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const troubleshootingData = [
  {
    question: 'Why is R2 heating up?',
    explanation: 'This usually happens due to a wrong resistor value (too low resistance, causing excess current) or a missing ground connection, which can create unintended current paths.',
    simulation: null // Replace with iframe or image if available
  },
  {
    question: 'Voltage at Node A is 0V. Why?',
    explanation: 'This can be caused by a floating node (not connected to any voltage source or ground) or an open circuit (broken connection).',
    simulation: null
  },
  {
    question: 'Output of RC filter is noisy',
    explanation: 'Noisy output may result from using the wrong capacitor or resistor values, or from missing a bypass capacitor to filter out high-frequency noise.',
    simulation: null
  },
  {
    question: 'RLC circuit is oscillating too much',
    explanation: 'Excessive oscillation is often due to an underdamped configuration, which means the resistance is too low relative to the inductance and capacitance.',
    simulation: null
  },
];

const CircuitTroubleshooting = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-2">Circuit Troubleshooting Q&A</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300">Common circuit issues, their causes, and how to diagnose them. Expand each question for details and simulation ideas.</p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {troubleshootingData.map((item, idx) => (
              <AccordionItem key={idx} value={String(idx)}>
                <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-4 text-gray-800 dark:text-gray-100">{item.explanation}</div>
                  {/* Simulation placeholder */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[120px] text-gray-500 dark:text-gray-400">
                    {/* Replace with iframe or image for real simulation */}
                    <span>Simulation coming soon...</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitTroubleshooting; 
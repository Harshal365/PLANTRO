'use client';

import { Droplets, Sun, Thermometer, Wind, Leaf, Scissors } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { CareInstructions } from '@/types';

interface CareInstructionsProps {
  care: CareInstructions;
}

export function CareInstructionsComponent({ care }: CareInstructionsProps) {
  const careItems = [
    {
      icon: Droplets,
      label: 'Water',
      value: care.water,
    },
    {
      icon: Sun,
      label: 'Sunlight',
      value: care.sunlight,
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: care.temperature,
    },
    {
      icon: Wind,
      label: 'Humidity',
      value: care.humidity,
    },
    {
      icon: Leaf,
      label: 'Fertilizer',
      value: care.fertilizer,
    },
    {
      icon: Scissors,
      label: 'Pruning',
      value: care.pruning,
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
        <div className="space-y-4">
          {careItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

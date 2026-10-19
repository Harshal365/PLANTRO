'use client';

import { Check, X, Sun, Droplets, Ruler, Sprout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ProductSpecs } from '@/types';

interface ProductSpecsProps {
  specifications: ProductSpecs;
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  const specItems = [
    {
      label: 'Height',
      value: specifications.height,
      icon: Ruler,
    },
    {
      label: 'Pot Size',
      value: specifications.potSize,
      icon: Sprout,
    },
    {
      label: 'Sunlight',
      value: specifications.sunlight,
      icon: Sun,
    },
    {
      label: 'Water',
      value: specifications.water,
      icon: Droplets,
    },
    {
      label: 'Difficulty',
      value: specifications.difficulty,
      icon: null,
    },
  ];

  const features = [
    { label: 'Pet Friendly', value: specifications.petFriendly },
    { label: 'Indoor', value: specifications.indoor },
    { label: 'Outdoor', value: specifications.outdoor },
    { label: 'Air Purifying', value: specifications.airPurifying },
    { label: 'Flowering', value: specifications.flowering },
    { label: 'Fruit Bearing', value: specifications.fruitBearing },
    { label: 'Fast Growing', value: specifications.fastGrowing },
    { label: 'Medicinal', value: specifications.medicinal },
  ];

  return (
    <div className="space-y-6">
      {/* Specifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          {specItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              {item.icon && (
                <item.icon className="h-5 w-5 text-forest mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium capitalize">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <Badge
              key={feature.label}
              variant={feature.value ? 'default' : 'outline'}
              className={`gap-2 ${
                feature.value ? 'bg-forest text-primary-foreground' : ''
              }`}
            >
              {feature.value ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
              {feature.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

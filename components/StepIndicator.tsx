'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  className?: string;
}

export default function StepIndicator({
  steps,
  currentStep,
  onStepClick,
  className
}: StepIndicatorProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Progress Line */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isUpcoming = currentStep < step.number;

            return (
              <div
                key={step.number}
                className={cn(
                  'flex flex-col items-center group',
                  onStepClick && 'cursor-pointer'
                )}
                onClick={() => onStepClick?.(step.number)}
              >
                {/* Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                    isCompleted && 'bg-primary border-primary text-primary-foreground scale-110',
                    isCurrent && 'bg-primary border-primary text-primary-foreground scale-125 shadow-lg',
                    isUpcoming && 'bg-background border-border text-muted-foreground group-hover:border-primary/50'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold text-sm">{step.number}</span>
                  )}
                </div>

                {/* Text */}
                <div className="mt-3 text-center max-w-[120px]">
                  <div
                    className={cn(
                      'font-medium text-sm transition-colors',
                      (isCompleted || isCurrent) && 'text-foreground',
                      isUpcoming && 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        'text-xs mt-1 transition-colors',
                        (isCompleted || isCurrent) && 'text-muted-foreground',
                        isUpcoming && 'text-muted-foreground/60'
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
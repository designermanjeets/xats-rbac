
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface WizardStepsProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (stepNumber: number) => void;
}

export const WizardSteps = ({ steps, currentStep, completedSteps, onStepClick }: WizardStepsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isClickable = step.id <= currentStep || completedSteps.includes(step.id - 1);
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    isCompleted && "bg-green-500 border-green-500 text-white",
                    isCurrent && !isCompleted && "border-blue-500 bg-blue-50 text-blue-600",
                    !isCurrent && !isCompleted && isClickable && "border-gray-300 bg-white text-gray-500 hover:border-gray-400",
                    !isClickable && "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </button>
                
                <div className="mt-2 text-center max-w-24">
                  <p className={cn(
                    "text-xs font-medium",
                    isCurrent && "text-blue-600",
                    isCompleted && "text-green-600",
                    !isCurrent && !isCompleted && "text-gray-500"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center px-4 mt-[-2rem]">
                  <div className={cn(
                    "h-0.5 w-full transition-colors duration-200",
                    completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-200"
                  )} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Cart' },
  { number: 2, label: 'Checkout' },
  { number: 3, label: 'Complete' },
];

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-3 md:gap-6">
    {steps.map((step, index) => {
      const isActive = currentStep === step.number;
      const isDone = currentStep > step.number;
      return (
        <div key={step.number} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
              isDone
                ? 'bg-ink-1 text-white'
                : isActive
                ? 'bg-ink-1 text-white ring-4 ring-surface-3'
                : 'bg-surface-3 text-ink-muted'
            }`}
          >
            {isDone ? <Check size={14} /> : step.number}
          </div>
          <span
            className={`text-sm ${isActive ? 'text-ink-1 font-medium' : 'text-ink-muted'}`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className="hidden md:block w-12 h-px bg-line" />
          )}
        </div>
      );
    })}
  </div>
);

export default CheckoutSteps;

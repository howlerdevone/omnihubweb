import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLoading?: boolean;
}

export function OnboardingNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onComplete,
}: OnboardingNavigationProps) {
  const getNextButtonText = () => {
    if (currentStep === 1) return 'Next';
    if (currentStep === 2) return 'Next';
    return 'Complete Setup';
  };

  return (
    <div className="border-outline-variant/30 border-t pt-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onPrev}
          disabled={currentStep === 1}
          variant="ghost"
          className={`flex items-center gap-2 text-base font-normal ${
            currentStep === 1
              ? 'pointer-events-none opacity-0'
              : 'hover:text-on-surface text-on-surface-variant'
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          Previous
        </Button>

        {currentStep === totalSteps ? (
          <Button
            onClick={onComplete}
            className="bg-primary shadow-primary/10 hover:bg-primary/90 flex items-center gap-3 px-8 py-3 text-lg font-semibold text-white shadow-xl"
          >
            <span>Complete Setup</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="bg-primary shadow-primary/10 hover:bg-primary/90 flex items-center gap-3 px-8 py-3 text-lg font-semibold text-white shadow-xl"
          >
            <span>{getNextButtonText()}</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}

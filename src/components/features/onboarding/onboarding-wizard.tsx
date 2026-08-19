'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingProvider, useOnboarding } from '@/context/onboarding-context';
import { CustomHttpHeaders } from '@/lib/http/http.config';
import { SpinnerOverlay } from '@/components/custom';
import { OnboardingHeader } from './onboarding-header';
import { OnboardingNavigation } from './onboarding-navigation';
import { StepOne } from './steps/step-one';
import { StepTwo } from './steps/step-two';

const OnboardingContent = () => {
  const router = useRouter();
  const { workspaceName, selectedAppIds, reset } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const totalSteps = 2;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);

    try {
      const response = await fetch('/onboarding/complete', {
        method: 'POST',
        headers: CustomHttpHeaders(),
        body: JSON.stringify({
          name: workspaceName,
          appIds: selectedAppIds,
        }),
      });

      const result = await response.json();

      if (result.success) {
        reset();
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        console.error('Onboarding failed', result);
        setIsCompleting(false);
      }
    } catch (error) {
      console.error('Error completing onboarding', error);
      setIsCompleting(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <SpinnerOverlay isVisible={isCompleting} message="Setting up your workspace..." />

      <OnboardingHeader currentStep={currentStep} totalSteps={totalSteps} />

      <div className="flex-1">
        <div className="mx-auto max-w-4xl px-8 py-10 md:px-4">
          <div className="transition-all duration-500">
            {currentStep === 1 && <StepOne />}
            {currentStep === 2 && <StepTwo />}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-8 py-10 md:px-4">
        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrev={handlePrev}
          onComplete={handleComplete}
        />
      </div>

      <div className="bg-primary/5 pointer-events-none fixed bottom-0 right-0 z-[-1] h-1/3 w-1/3 rounded-full blur-[120px]" />
      <div className="bg-secondary/5 pointer-events-none fixed left-0 top-1/4 z-[-1] h-64 w-64 rounded-full blur-[100px]" />
    </div>
  );
};

export function OnboardingWizard() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingHeader({ currentStep, totalSteps }: OnboardingHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="border-outline-variant/30 bg-background/95 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto max-w-4xl px-8 py-6 md:px-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              Initialization Phase
            </span>
            <h1 className="text-on-surface text-4xl font-semibold">Configure Workspace</h1>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-on-surface-variant">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <div
            className="bg-primary h-full transition-all duration-700 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

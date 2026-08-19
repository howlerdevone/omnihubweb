'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
  workspaceName: string;
  selectedCategoryIds: string[];
  selectedAppIds: string[];
  setWorkspaceName: (name: string) => void;
  setSelectedCategoryIds: (ids: string[]) => void;
  setSelectedAppIds: (ids: string[]) => void;
  toggleCategoryId: (id: string) => void;
  toggleAppId: (id: string) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [workspaceName, setWorkspaceName] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);

  const toggleCategoryId = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAppId = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const reset = () => {
    setWorkspaceName('');
    setSelectedCategoryIds([]);
    setSelectedAppIds([]);
  };

  return (
    <OnboardingContext.Provider
      value={{
        workspaceName,
        selectedCategoryIds,
        selectedAppIds,
        setWorkspaceName,
        setSelectedCategoryIds,
        setSelectedAppIds,
        toggleCategoryId,
        toggleAppId,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}

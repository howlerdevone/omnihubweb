import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser, AuthApiRepository } from '@/modules/auth';
import { CustomHttpHeaders } from '@/lib/http/http.config';

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
  try {
    const user = await getCurrentUser(AuthApiRepository);

    // If onboarding is already completed, redirect to dashboard
    if (user.onboardingCompletedAt) {
      redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    // On error, allow to proceed to onboarding
  }

  return <>{children}</>;
}

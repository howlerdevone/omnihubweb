import 'server-only';
import { handleApiCall } from '@/lib/http/api-handler';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { OnboardingApiRepository } from '@/modules/organization';
import { NextResponse } from 'next/server';

interface CompleteOnboardingRequest {
  name: string;
  appIds: string[];
}

export const POST = handleApiCall(async (req: Request) => {
  const data: CompleteOnboardingRequest = await req.json();
  const organization = await OnboardingApiRepository.complete(data.name, data.appIds);
  return NextResponse.json(
    createBaseResponse('Onboarding completed successfully', true, organization),
    { status: 201 }
  );
});

import 'server-only';
import { SystemApiConnector } from '@/lib/http/http-client';
import { Organization } from '../../domains/organization.entity';
import { OnboardingProvider } from '../../ports/onboarding.port';

export const OnboardingApiRepository: OnboardingProvider = {
  complete: async (name: string, appIds: string[]): Promise<Organization> => {
    const response = await SystemApiConnector.post<Organization>('/v1/organizations/onboarding', {
      name,
      appIds,
    });
    return response.data;
  },
};

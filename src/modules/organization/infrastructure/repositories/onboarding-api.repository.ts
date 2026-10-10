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

/**
 * Retrieves the current user's workspace (organization).
 *
 * @returns {Promise<Organization>} Current workspace data
 * @throws {AxiosError} If the request fails or workspace is not found
 */
export const getCurrentWorkspace = async (): Promise<Organization> => {
  const response = await SystemApiConnector.get<Organization>('/v1/organizations/me');
  return response.data;
};

/**
 * Retrieves all workspaces accessible by the current user.
 *
 * @returns {Promise<Organization[]>} Array of workspace data
 * @throws {AxiosError} If the request fails
 */
export const getAllWorkspaces = async (): Promise<Organization[]> => {
  const response = await SystemApiConnector.get<Organization[]>('/v1/organizations');
  return response.data;
};

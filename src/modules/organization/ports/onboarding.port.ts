import { Organization } from '../domains/organization.entity';

export interface OnboardingProvider {
  complete: (name: string, appIds: string[]) => Promise<Organization>;
}

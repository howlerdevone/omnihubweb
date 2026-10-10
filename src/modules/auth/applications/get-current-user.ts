import { AuthEntity } from '../domains/auth.entity';
import { AuthProviderPort } from '../ports/auth-provider.port';

/**
 * Retrieves the current authenticated user's profile information.
 *
 * @param {AuthProviderPort} adapter - The authentication provider to use
 * @returns {Promise<AuthEntity['user']>} Current user data including id, email, displayName
 */
export const getCurrentUser = async (adapter: AuthProviderPort): Promise<AuthEntity['user']> => {
  return await adapter.getCurrentUser();
};

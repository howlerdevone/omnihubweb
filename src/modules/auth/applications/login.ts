import { AuthEntity, AuthLogin } from '../domains/auth.entity';
import { AuthProviderPort } from '../ports/auth-provider.port';

/**
 * Executes the login use case by delegating to the provided authentication provider.
 *
 * @param {AuthProviderPort} adapter - The authentication provider (e.g., API adapter) to use
 * @param {AuthLogin} data - Login credentials containing email and password
 * @returns {Promise<AuthEntity>} Authenticated user entity with tokens and profile information
 */
export const login = async (adapter: AuthProviderPort, data: AuthLogin): Promise<AuthEntity> => {
  return await adapter.login(data);
};

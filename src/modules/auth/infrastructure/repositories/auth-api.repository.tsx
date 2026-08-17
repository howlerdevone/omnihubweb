import 'server-only';
import { CustomHttpHeaders, SystemApiConnector } from '@/lib';
import { AuthEntity, AuthLogin, AuthRegister } from '../../domains/auth.entity';
import { AuthProviderPort } from '../../ports/auth-provider.port';

/**
 * Authentication API adapter implementing the AuthProviderPort interface.
 * Handles communication with the backend authentication service via HTTP.
 */
export const AuthApiRepository: AuthProviderPort = {
  /**
   * Authenticates a user by sending credentials to the login endpoint.
   *
   * @param {AuthLogin} data - User credentials (email and password)
   * @returns {Promise<AuthEntity>} Authentication tokens and user profile on success
   * @throws {AxiosError} If the request fails (handled by centralized error handler)
   */
  login: async function (data: AuthLogin): Promise<AuthEntity> {
    const response = await SystemApiConnector.post<AuthEntity>('/auth/login', data, {
      headers: CustomHttpHeaders(),
    });
    return response.data;
  },

  /**
   * Registers a new user account with the authentication service.
   *
   * @param {AuthRegister} data - New user registration data (id, username, email, password)
   * @returns {Promise<AuthEntity>} Authentication tokens and user profile on success
   * @throws {AxiosError} If the request fails (handled by centralized error handler)
   */
  register: async function (data: AuthRegister): Promise<AuthEntity> {
    const response = await SystemApiConnector.post<AuthEntity>('/auth/register', data, {
      headers: CustomHttpHeaders(),
    });
    return response.data;
  },
};

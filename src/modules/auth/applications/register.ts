import { AuthEntity, AuthRegister } from '../domains/auth.entity';
import { AuthProviderPort } from '../ports/auth-provider.port';

export const register = async (
  adapter: AuthProviderPort,
  data: AuthRegister
): Promise<AuthEntity> => {
  return await adapter.register(data);
};

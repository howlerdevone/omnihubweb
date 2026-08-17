import { AuthEntity, AuthLogin, AuthRegister } from '../domains/auth.entity';

export interface AuthProviderPort {
  login: (data: AuthLogin) => Promise<AuthEntity>;
  register: (auth: AuthRegister) => Promise<AuthEntity>;
}

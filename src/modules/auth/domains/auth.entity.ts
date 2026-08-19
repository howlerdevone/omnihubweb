export type AuthRegister = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type AuthLogin = {
  email: string;
  password: string;
};

export type AuthEntity = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    preferredLanguage: string;
    timezone: string;
  };
};

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
  access_token: string;
  refresh_token: string;
  expires_at: string;
  user: {
    id: string;
    email: string;
    display_name: string;
    preferred_language: string;
    timezone: string;
  };
};

import 'server-only';
import { cookies } from 'next/headers';

const JWT_COOKIE_NAME = 'auth_token';

interface SetAuthCookieOptions {
  maxAge?: number;
}

export const setAuthCookie = async (token: string, options?: SetAuthCookieOptions) => {
  const cookieStore = await cookies();

  cookieStore.set(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: options?.maxAge || 7 * 24 * 60 * 60,
    path: '/',
  });
};

export const getAuthCookie = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(JWT_COOKIE_NAME);

  return cookie?.value || null;
};

export const deleteAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_COOKIE_NAME);
};

import 'server-only';
import { handleApiCall } from '@/lib/http/api-handler';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { AuthApiRepository, register } from '@/modules/auth';
import { setAuthCookie } from '@/lib/auth/auth-cookies';
import { NextResponse } from 'next/server';

export const POST = handleApiCall(async (req: Request) => {
  const registerData = await req.json();
  const response = await register(AuthApiRepository, registerData);

  if (response && response.accessToken) {
    await setAuthCookie(response.accessToken);
  }

  return NextResponse.json(createBaseResponse('Registration successful', true, response));
});

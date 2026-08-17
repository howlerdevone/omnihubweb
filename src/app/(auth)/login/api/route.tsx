import 'server-only';
import { handleApiCall } from '@/lib/http/api-handler';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { AuthApiRepository, login } from '@/modules/auth';
import { NextResponse } from 'next/server';

export const POST = handleApiCall(async (req: Request) => {
  const authLoginData = await req.json();
  const response = await login(AuthApiRepository, authLoginData);
  return NextResponse.json(createBaseResponse('Login successful', true, response));
});

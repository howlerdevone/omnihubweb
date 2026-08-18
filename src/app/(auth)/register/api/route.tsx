import 'server-only';
import { handleApiCall } from '@/lib/http/api-handler';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { AuthApiRepository, register } from '@/modules/auth';
import { NextResponse } from 'next/server';

/**
 * POST /register/api
 * Handles user registration by delegating to the auth module
 */
export const POST = handleApiCall(async (req: Request) => {
  const registerData = await req.json();
  const response = await register(AuthApiRepository, registerData);
  return NextResponse.json(createBaseResponse('Registration successful', true, response));
});

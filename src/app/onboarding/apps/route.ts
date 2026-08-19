import 'server-only';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { fetchAllApps } from '@/modules/catalog';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const apps = await fetchAllApps();
  return NextResponse.json(createBaseResponse('Apps fetched successfully', true, apps));
};

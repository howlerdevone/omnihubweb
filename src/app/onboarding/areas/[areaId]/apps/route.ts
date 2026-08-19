import 'server-only';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { AppsApiRepository } from '@/modules/catalog';
import { NextResponse } from 'next/server';

export const GET = async (_: Request, { params }: { params: Promise<{ areaId: string }> }) => {
  const { areaId } = await params;
  const apps = await AppsApiRepository.fetchAppsByArea(areaId);
  return NextResponse.json(createBaseResponse('Apps fetched successfully', true, apps));
};

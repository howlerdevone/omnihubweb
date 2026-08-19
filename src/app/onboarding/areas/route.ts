import 'server-only';
import { handleApiCall } from '@/lib/http/api-handler';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { AreasApiRepository } from '@/modules/catalog';
import { NextResponse } from 'next/server';

export const GET = handleApiCall(async () => {
  const areas = await AreasApiRepository.fetchAreas();
  return NextResponse.json(createBaseResponse('Areas fetched successfully', true, areas));
});

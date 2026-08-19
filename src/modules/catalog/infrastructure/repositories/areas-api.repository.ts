import 'server-only';
import { SystemApiConnector } from '@/lib/http/http-client';
import { Area } from '../../domains/area.entity';
import { AreasProvider } from '../../ports/areas.port';

export const AreasApiRepository: AreasProvider = {
  fetchAreas: async (): Promise<Area[]> => {
    const response = await SystemApiConnector.get<Area[]>('/v1/catalog/areas');
    return response.data;
  },
};

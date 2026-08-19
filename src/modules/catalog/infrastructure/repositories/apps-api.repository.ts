import 'server-only';
import { SystemApiConnector } from '@/lib/http/http-client';
import { App } from '../../domains/app.entity';
import { AppsProvider } from '../../ports/apps.port';

export const AppsApiRepository: AppsProvider = {
  fetchAppsByArea: async (areaId: string): Promise<App[]> => {
    const response = await SystemApiConnector.get<App[]>(`/v1/catalog/areas/${areaId}/apps`);
    return response.data;
  },
};

export const fetchAllApps = async (): Promise<App[]> => {
  const response = await SystemApiConnector.get<App[]>('/v1/catalog/apps');
  return response.data;
};

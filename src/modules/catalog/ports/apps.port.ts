import { App } from '../domains/app.entity';

export interface AppsProvider {
  fetchAppsByArea: (areaId: string) => Promise<App[]>;
}

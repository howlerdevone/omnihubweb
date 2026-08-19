import { Area } from '../domains/area.entity';

export interface AreasProvider {
  fetchAreas: () => Promise<Area[]>;
}

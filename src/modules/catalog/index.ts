export * from './domains/area.entity';
export * from './domains/app.entity';
export * from './ports/areas.port';
export * from './ports/apps.port';
export { AreasApiRepository } from './infrastructure/repositories/areas-api.repository';
export { AppsApiRepository, fetchAllApps } from './infrastructure/repositories/apps-api.repository';

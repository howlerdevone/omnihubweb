import axios from 'axios';
import 'server-only';
import { EnvironmentConfig } from '../config/env.config';
import { getAuthCookie } from '@/lib/auth/auth-cookies';

export const SystemApiConnector = axios.create({
  baseURL: EnvironmentConfig.apiUrl,
  timeout: 30000,
});

SystemApiConnector.interceptors.request.use(async (config) => {
  const token = await getAuthCookie();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

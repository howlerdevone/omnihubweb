import axios from 'axios';
import 'server-only';
import { EnvironmentConfig } from '../config/env.config';

/**
 * Axios instance configured for server-side API communication.
 * This instance is used exclusively on the backend and should never be exposed to the client.
 *
 * Configuration:
 * - baseURL: Backend API URL from environment config
 * - timeout: 10 seconds per request
 */
export const SystemApiConnector = axios.create({
  baseURL: EnvironmentConfig.apiUrl,
  timeout: 30000,
});

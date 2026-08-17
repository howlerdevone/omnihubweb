/**
 * Central environment configuration object.
 * Next.js automatically pulls these from your root .env or .env.local file.
 */
export const EnvironmentConfig = {
  // Currently uses NEXT_PUBLIC_API_URL for server API calls.
  // If client and server APIs differ in the future, introduce a separate server-only env var.
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
} as const;

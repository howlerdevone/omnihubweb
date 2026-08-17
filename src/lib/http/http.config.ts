/**
 * Generates HTTP headers with default JSON content type and custom headers.
 *
 * @param {Record<string, string>} record - Custom headers to merge (optional)
 * @returns {Record<string, string>} Complete headers object
 *
 * Default headers:
 * - Content-Type: application/json
 * - Accept: application/json
 */
export const CustomHttpHeaders = (record: Record<string, string> = {}): Record<string, string> => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...record,
});

/**
 * Standard response envelope for all API responses.
 * Provides consistent structure across all endpoints.
 *
 * @template T - Type of data payload (defaults to unknown)
 * @property {T} data - Response payload (optional)
 * @property {string} message - Human-readable status message
 * @property {string} error - Error code or description (only present if success is false)
 * @property {boolean} success - Indicates if the request succeeded
 * @property {number} status - HTTP status code for the response
 */
export type BaseResponseModel<T = unknown> = {
  data?: T;
  message: string;
  error?: string;
  success: boolean;
  status: number;
};

/**
 * Factory function to create a standardized API response object.
 *
 * @template T - Type of data payload
 * @param {string} message - Status message to include in response
 * @param {boolean} success - Whether the operation succeeded
 * @param {T} data - Response payload data (optional)
 * @param {string} error - Error code/description if operation failed (optional)
 * @param {number} status - HTTP status code (defaults to 200)
 * @returns {BaseResponseModel<T>} Formatted response object
 */
export const createBaseResponse = <T = unknown>(
  message: string,
  success: boolean,
  data?: T,
  error?: string,
  status = 200
): BaseResponseModel<T> => {
  return {
    data,
    message,
    error,
    success,
    status,
  };
};

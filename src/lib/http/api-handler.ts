import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { HTTP_STATUS } from './http-status';
import { BaseResponseModel } from '../models/base-response.model';

type RouteHandler = (request: Request, ...args: unknown[]) => Promise<Response>;

/**
 * Centralized error handling wrapper for Route Handlers.
 * Catches all errors, logs them safely (without exposing sensitive data),
 * and returns standardized error responses with appropriate HTTP status codes.
 *
 * @param {RouteHandler} handler - The Route Handler function to wrap
 * @returns {RouteHandler} Wrapped handler with error handling
 *
 * Error handling logic:
 * - AxiosError with response: Uses backend's HTTP status code
 * - AxiosError without response (network/timeout): Returns 502 (Bad Gateway)
 * - Other errors: Returns 500 (Internal Server Error)
 */
export const handleApiCall = (handler: RouteHandler): RouteHandler => {
  return async (request: Request, ...args: unknown[]) => {
    try {
      return await handler(request, ...args);
    } catch (error: unknown) {
      let statusCode: number = HTTP_STATUS.INTERNAL_ERROR;
      let errorCode = 'INTERNAL_ERROR';
      let message = 'An unexpected error occurred';

      if (error instanceof AxiosError) {
        // Log sanitized info only (no request body/credentials)
        console.error(`[AXIOS ERROR IN ${request.url}]:`, {
          code: error.code,
          message: error.message,
          status: error.response?.status,
        });

        statusCode = error.response?.status || HTTP_STATUS.BAD_GATEWAY;
        errorCode = error.code || 'AXIOS_ERROR';
        message = error.message || 'An unexpected error occurred';
      } else {
        // Handle non-Axios errors (parsing, application errors, etc.)
        const errorObj = error as Record<string, unknown>;
        console.error(`[ROUTE ERROR IN ${request.url}]:`, {
          name: errorObj?.name,
          message: errorObj?.message,
        });
        errorCode = (errorObj?.name as string) || 'ERROR';
        message = (errorObj?.message as string) || 'An unexpected error occurred';
      }

      // Build standardized error response
      const baseResponse: BaseResponseModel = {
        success: false,
        message,
        error: errorCode,
        status: statusCode,
      };

      return NextResponse.json(baseResponse, { status: statusCode });
    }
  };
};

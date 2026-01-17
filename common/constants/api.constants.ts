/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

/**
 * Query cache durations (ms)
 */
export const CACHE_DURATION = {
  VERY_SHORT: 30_000,      // 30 seconds
  SHORT: 60_000,           // 1 minute
  MEDIUM: 300_000,         // 5 minutes
  LONG: 900_000,           // 15 minutes
  VERY_LONG: 1_000 * 60 * 60,  // 1 hour
} as const;

/**
 * Stale time durations (ms)
 */
export const STALE_TIME = {
  ZERO: 0,
  SHORT: 60_000,           // 1 minute
  MEDIUM: 300_000,         // 5 minutes
  LONG: 900_000,           // 15 minutes
} as const;

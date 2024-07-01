/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs';

import { z } from 'zod';

/**
 *
 * @param {string | undefined} value
 * @returns {boolean | undefined}
 */
const toBoolean = value => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
};

const schema = {
  BACKEND_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  DEBUG_MODE: z.boolean().default(false),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number().int().positive(),
  MOCK_CACHE_MANAGER: z.boolean().default(false),
  APP_ENV: z.enum(['development', 'production', 'test']),
};

// all should be optional
const CISchema = {
  BACKEND_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  DEBUG_MODE: z.boolean().optional(),
  REDIS_HOST: z.any().optional(),
  REDIS_PORT: z.any().optional(),
  MOCK_CACHE_MANAGER: z.boolean().optional(),
  APP_ENV: z.enum(['development', 'production', 'test']).optional(),
};

const isCI = process.env.CI === 'true';

export const env = createEnv({
  // @ts-ignore
  server: isCI ? CISchema : schema,
  client: {
    NEXT_PUBLIC_FRONTEND_URL: z.string()
      .url(`NEXT_PUBLIC_FRONTEND_URL must be a valid URL.
    ${process.env.NEXT_PUBLIC_FRONTEND_URL} is not a valid URL.`),
    NEXT_PUBLIC_RATE_LIMITER_IN_MS: z.number().int().positive().default(60000),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: isCI ? z.string().optional() : z.string(),
    NEXT_PUBLIC_MOCK_MODE: z.boolean().default(false),
    NEXT_PUBLIC_VAT_PERCENTAGE: z.number().positive().default(20),
  },

  runtimeEnv: {
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DEBUG_MODE: toBoolean(process.env.DEBUG_MODE),
    NEXT_PUBLIC_RATE_LIMITER_IN_MS: Number(
      process.env.NEXT_PUBLIC_RATE_LIMITER_IN_MS,
    ),
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    MOCK_CACHE_MANAGER: toBoolean(process.env.MOCK_CACHE_MANAGER),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_MOCK_MODE: toBoolean(process.env.NEXT_PUBLIC_MOCK_MODE),
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_VAT_PERCENTAGE: Number(process.env.NEXT_PUBLIC_VAT_PERCENTAGE),
  },
});

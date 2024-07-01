import {
  ioRedisStore,
  type RedisCache,
} from '@tirke/node-cache-manager-ioredis';
import { caching } from 'cache-manager';

import { env } from '@/libs/Env.mjs';

const config = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};

export class CacheManager {
  private cache: Promise<RedisCache>;

  constructor() {
    const redisCache = caching(ioRedisStore, config);
    this.cache = redisCache;
  }

  private static safeParse<T>(value: string | null): T | undefined {
    if (!value) return undefined;
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return undefined;
    }
  }

  public async get<T>(key: string): Promise<T | undefined> {
    const redisCache = await this.cache;
    const value = (await redisCache.get(key)) as string | null;
    return CacheManager.safeParse<T>(value);
  }
}

import { env } from '@/libs/Env.mjs';

const isDebugMode = () => env.DEBUG_MODE;

export { isDebugMode };

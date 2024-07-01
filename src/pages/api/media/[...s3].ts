import type { NextApiRequest, NextApiResponse } from 'next';

import { isDebugMode } from '@/utils/is-debug-mode';

export default async function mockS3(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isDebugMode()) {
    res.status(404).end();
    return;
  }
  res.status(204).end();
}

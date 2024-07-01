import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'POST': {
        // Handle post request
        const { data } = await axios.post(
          `http://localhost:9011/signup`,
          req.body,
        );
        res.status(200).json(data);
        break;
      }

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    res.json(error.response.data);
  }
}

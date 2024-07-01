import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  // const session = await getServerSession(req, res, nextAuthOptions);

  // const userType = session?.user?.type;

  switch (method) {
    case 'POST': {
      res.status(200).json({ success: true, data: {} });
      // let endpoint = '/auth/logout';
      // if (userType === 'admin') {
      //   endpoint = '/console/auth/logout';
      // }
      // await axiosExternal({ req, res }).post(endpoint);
      // // Handle POST request
      // res.status(200).json({ success: true, data: {} });
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method method Not Allowed`);
  }
}

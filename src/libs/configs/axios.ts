import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


const axiosExternal = (config: {
  req: NextApiRequest;
  res: NextApiResponse;
  accessToken?: string; // Add this parameter
}) => {
  const baseURL = `http://localhost:9011/`;
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config?.req.cookies?.access_token,
    },
  });

  return instance;
};

const axiosInternal = axios.create({
  baseURL: `http://localhost:4000/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosExternal, axiosInternal };


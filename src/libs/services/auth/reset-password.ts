import { axiosInternal } from '@/libs/configs/axios';

interface Payload {
  mobile: string;
  newPassword: string;
  otp: string;
  confirmPassword: string;
  email?: string;
}

export async function resetPassword(values: Payload) {
  const res = await axiosInternal.post('/auth/reset-password', values);
  return res.status;
}

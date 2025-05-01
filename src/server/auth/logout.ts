'use server';
import { cookies } from 'next/headers';
import { api } from '../api';
import { AUTH } from '../services/auth';

export const logout = async () => {
  const cookieStore = await cookies();
  const res = await api.post(AUTH.POST.LOGOUT, '_');

  if (res.success) {
    cookieStore.delete('user');
    cookieStore.delete('access_token');
  }
  return res;
};

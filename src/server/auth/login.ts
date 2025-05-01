'use server';
import { storeMultipleCookies } from '@/utils/store-multiple-cookies';
import { api } from '../api';
import { UserResponse } from '@/types/UserType';
import { AUTH } from '../services/auth';
import { LoginSchemaDef } from '@/schemas/auth';

export const login = async (payload: LoginSchemaDef) => {
  const res = await api.post<LoginSchemaDef, ApiResponse<UserResponse, null>>(
    AUTH.POST.LOGIN,
    payload,
  );

  const userData = {
    ...res.data.user,
    store_domain: res.data.settings.store_domain_name,
  };

  if (res.success) {
    storeMultipleCookies([
      {
        key: 'access_token',
        value: res.data.access_token,
        duration: res.data.expires_at,
      },
      {
        key: 'user',
        value: JSON.stringify(userData),
        duration: res.data.expires_at,
      },
    ]);
  }
  return res;
};

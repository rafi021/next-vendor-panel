'use server';
import { storeMultipleCookies } from '@/utils/store-multiple-cookies';
import { api } from '../api';
import { UserResponse } from '@/types/UserType';
import { RegisterSchemaDef } from '@/schemas/auth';
import { AUTH } from '../services/auth';

export const onboard = async (payload: RegisterSchemaDef) => {
  const res = await api.post<
    RegisterSchemaDef,
    ApiResponse<UserResponse, null>
  >(AUTH.POST.ONBOARDS, payload);

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

'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { ApiResponse, BASE_URL } from './type';
import { cookies } from 'next/headers';

export const mutation = async <K, T extends ApiResponse>(
  method: 'POST' | 'PUT',
  url: string,
  payload?: K,
  tags?: string[],
  paths?: string[],
): Promise<T> => {
  const isFormData = payload instanceof FormData;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        ...(!isFormData && {
          'Content-Type': 'application/json',
        }),
        Accept: 'application/json',
        Authorization: `Bearer ${token && token.value}`,
      },
      body: isFormData ? payload : JSON.stringify({ ...payload }),
      credentials: 'include',
    });

    //revalidate tags
    tags &&
      tags.map((tag) => {
        revalidateTag(tag);
      });

    //revalidate path
    paths &&
      paths.map((tag) => {
        revalidatePath(tag);
      });

    const data = await res.json();
    return data as T;
  } catch (err: any) {
    // console.log(err);
    return {
      success: false,
      message: err.message,
    } as T;
  }
};

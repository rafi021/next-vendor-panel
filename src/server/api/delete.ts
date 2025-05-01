'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { ApiResponse, BASE_URL } from './type';
import { cookies } from 'next/headers';

export const deleteRequest = async <T extends ApiResponse>(
  url: string,
  tags?: string[],
  paths?: string[],
): Promise<T> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token && token.value}`,
      },
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
    return {
      success: false,
      message: err.message,
    } as T;
  }
};

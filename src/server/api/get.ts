'use server';
import { cookies } from 'next/headers';
import { BASE_URL } from './type';
// import { BASE_URL } from './type';

/**
 * Uses next/headers
 * NOTE: only accessible in server
 **/
export const getRequest = async <T>(
  url: string,
  tags?: string[],
  revalidate = 60,
): Promise<T> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    const res = await fetch(`${BASE_URL}${url}`, {
      next: { revalidate: revalidate, tags: tags },
      headers: {
        Authorization: `Bearer ${token && token.value}`,
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    return data as T;
  } catch (err) {
    // console.log(err);
    return {
      success: false,
      message: 'Failed fetching',
      data: {},
    } as T;
  }
};

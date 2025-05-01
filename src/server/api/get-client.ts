// 'use client';

// import { BASE_URL } from './type';

// /**
//  * Get the access token from client cookies
//  */
// const getToken = (): string | undefined => {
//   // Use a safer way to access cookies in client components
//   const accessToken = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('access_token='))
//     ?.split('=')[1];

//   return accessToken;
// };

// /**
//  * Client-side API fetching utility for JSON responses
//  * @param url API endpoint path (without base URL)
//  * @returns Promise with typed API response
//  */
// export const getClient = async <T>(url: string): Promise<T> => {
//   try {
//     const token = getToken();

//     const res = await fetch(`${BASE_URL}${url}`, {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : '',
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error(`API request failed with status ${res.status}`);
//     }

//     const data = await res.json();
//     return data as T;
//   } catch (err) {
//     console.error('API fetch error:', err);
//     return {
//       success: false,
//       message: err instanceof Error ? err.message : 'Failed fetching',
//       data: {},
//     } as T;
//   }
// };

// /**
//  * Client-side API fetching utility for blob responses (files, PDFs, etc.)
//  * @param url API endpoint path (without base URL)
//  * @returns Promise with blob
//  */
// export const getBlobClient = async (url: string): Promise<Blob> => {
//   try {
//     const token = getToken();

//     const res = await fetch(`${BASE_URL}${url}`, {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : '',
//         Accept: 'application/pdf',
//       },
//       credentials: 'include',
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error(`API request failed with status ${res.status}`);
//     }

//     return await res.blob();
//   } catch (err) {
//     console.error('Blob fetch error:', err);
//     throw err;
//   }
// };

import { deleteRequest } from './delete';
import { getRequest } from './get';
import { mutation } from './mutation';
import { ApiResponse } from './type';

export const api = {
  get: <T>(url: string, tags?: string[], revalidate?: number) =>
    getRequest<T>(url, tags, revalidate),

  post: <K, T extends ApiResponse>(
    url: string,
    payload: K,
    tags?: string[],
    paths?: string[],
  ) => mutation<K, T>('POST', url, payload, tags, paths),

  put: <K, T extends ApiResponse>(
    url: string,
    payload: K,
    tags?: string[],
    paths?: string[],
  ) => mutation<K, T>('PUT', url, payload, tags, paths),

  delete: <T extends ApiResponse>(
    url: string,
    tags?: string[],
    paths?: string[],
  ) => deleteRequest<T>(url, tags, paths),
};

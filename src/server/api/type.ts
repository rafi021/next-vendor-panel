export const BASE_URL = process.env.BASE_URL as string;

export type ApiResponse = {
  success: boolean;
  status_code: number;
  message: string;
  data?: any;
  metadata?: any;
  errors?: string;
};

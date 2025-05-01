'use server';

import { FrudResponse } from '@/types/UserType';

export const getSuccessRateByPhone = async (
  phone: number | string,
): Promise<FrudResponse | null> => {
  try {
    const response = await fetch(
      `${process.env.SUCCESS_RATE_URL}/customer/success/${phone}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );
    // console.log('response', response);

    if (response.status !== 200) {
      console.error(
        `Error ${response.status}: Failed to fetch success rate for phone ${phone}`,
      );
      return {
        frud: {
          success: true,
          data: {
            stead_fast: {
              total: 0,
              delivered: 0,
              cancelled: 0,
              success_rate: 0,
            },
            redx: {
              total: 0,
              delivered: 0,
              cancelled: 0,
              success_rate: 0,
            },
            pathao: {
              total: 0,
              delivered: 0,
              cancelled: 0,
              success_rate: 0,
            },
            paper_fly: {
              total: 0,
              delivered: 0,
              cancelled: 0,
              success_rate: 0,
            },
          },
        },
        customer: {
          message: 'user success rate',
          type: 'false',
          code: 404,
          data: {
            success_rate: 100,
            fraud_level: 0,
            fraud_count: 0,
            fraud_reason: '',
            is_new: true,
            address_book: {},
          },
        },
      };
    }

    const data: FrudResponse = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Network error fetching success rate for phone ${phone}:`,
      error,
    );
    return null;
  }
};
export const addressParser = async (address: string) => {
  try {
    const res = await fetch(
      `${process.env.SUCCESS_RATE_URL}/addrees-parse?address=${address}`,
    );
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    return null;
  }
};

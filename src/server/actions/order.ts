import useSWR from 'swr';
import { api } from '../api';

const pdfFetcher = (url: string) => api.get<string>(url);
export function useOrderPdf(order_id: number | null) {
  console.log({ order_id });
  const { data, error, isLoading } = useSWR(
    // '/smscategories',
    order_id ? `/order-invoice-download/${order_id}` : null,
    pdfFetcher,
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

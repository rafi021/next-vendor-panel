import { ORDERS } from './order';

export const PATHAO = {
  TFANSFER_TO_PATHAO: {
    POST: '/transfer-to-pathao',
    TAGS: ORDERS.GET.ORDERS.TAGS,
  },
  GET_DELIVERY_STATUS_FROM_PATHAO: {
    POST: '/admin-get-delivery-status-pathao',
    TAGS: ORDERS.GET.ORDERS.TAGS,
  },
};

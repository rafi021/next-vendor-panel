export const ORDERS = {
  GET: {
    ORDERS: {
      URL: '/admin-orders',
      TAGS: ['ORDERS', 'DASHBOARD'],
    },
    ORDERS_DETAILS: {
      URL: '/admin-orders',
      TAGS: ['order', 'DASHBOARD'],
    },
  },
  POST: {
    ORDERS_CREATE: '/admin-orders',
    GET_ORDER_CARING_COST: '/admin-get-pricing-plan',
    PARTIAL_PAYMENT: '/partial-payment',
  },
  PUT: {
    ORDER_UPDATE: {
      URL: '/admin-orders',
      TAG: ['order-update', 'DASHBOARD'],
    },
    ORDER_STATUS_UPDATE: '/update-order-status',
    ORDER_NOTE_UPDATE: '/update-order-note',
  },
  DELETE: {
    ORDER_DELETE: '/admin-orders',
  },
};

export const INCOMPLETE_ORDERS = {
  GET: {
    URL: '/get-incomplete-order',
    TAGS: ['INCOMPLETE_ORDERS'],
  },
};

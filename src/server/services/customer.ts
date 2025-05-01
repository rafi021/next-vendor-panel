export const CUSTOMERS = {
  GET: {
    CUSTOMERS: {
      URL: '/customers',
      TAGS: ['CUSTOMERS'],
    },
    CUSTOMERS_DETAILS: {
      URL: '/customers', //id
      TAGS: ['customer'],
    },
  },
  POST: {
    CUSTOMERS_CREATE: '/customers',
    CUSTOMERS_ORDER_SUCCESS_RATE_STATUS:
      'https://neurodigitalbd.com/wp-admin/admin-ajax.php',
  },
  PUT: {
    CUSTOMERS_UPDATE: '/customers', //id
    CUSTOMERS_STATUS_UPDATE: '/customers-status',
  },
  DELETE: {
    CUSTOMERS_DELETE: '/customers', //id
  },
};

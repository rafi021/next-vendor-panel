export const PURCHASES = {
  GET: {
    URL: '/purchases', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['PURCHASES', 'PURCHASE_PAYMENT'],
  },
  POST: '/purchases',

  PUT: '/purchases', // :id

  DELETE: '/purchases', // :id,
};

export const PURCHASE_PAYMENT = {
  GET: {
    URL: '/purchases-payment',
    TAGS: ['PURCHASE_PAYMENT', 'PURCHASES'],
  },

  POST: '/purchase-payment',
};

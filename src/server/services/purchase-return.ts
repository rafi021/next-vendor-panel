export const PURCHASES_RETURN = {
  GET: {
    INDEX: {
      URL: '/purchase-returns', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['PURCHASES_RETURN'],
    },
    DETAILS: {
      URL: '/purchase-return-view', // :id
      TAGS: ['PURCHASES_RETURN'],
    },
  },
  POST: '/purchase-returns',

  PUT: '/purchase-returns', // :id

  DELETE: '/purchase-returns', // :id,
};

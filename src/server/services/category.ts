export const CATEGORIES = {
  GET: {
    CATEGORIES: {
      URL: '/categories',
      TAGS: ['CATEGORIES', 'PRODUCTS', 'CATEGORY'],
    },
    CATEGORY_DETAILS: {
      URL: '/categories', //id
      TAGS: ['CATEGORY', 'CATEGORIES', 'PRODUCTS'],
    },
  },
  POST: {
    CATEGORY_CREATE: '/categories',
  },
  PUT: {
    CATEGORY_UPDATE: '/categories', //id
    CATEGORY_STATUS_UPDATE: '/categories/status', //id
  },
  DELETE: {
    CATEGORY_DELETE: '/categories', //id
  },
};

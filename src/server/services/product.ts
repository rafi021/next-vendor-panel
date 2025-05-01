export const PRODUCT = {
  GET: {
    PRODUCTS: {
      URL: '/products',
      TAGS: ['PRODUCTS', 'PRODUCT_CATEGORIES', 'PRODUCT_BRANDS'],
    },
    PRODUCT_DETAILS: {
      URL: '/products',
      TAGS: ['PRODUCTS','PRODUCT', 'PRODUCT_CATEGORIES', 'PRODUCT_BRANDS'],
    },
  },
  POST: {
    PRODUCT_CREATE: '/products',
  },
  PUT: {
    PRODUCT_UPDATE: '/products',
    PRODUCT_STATUS_UPDATE: '/update-product-status', //:id
  },
  DELETE: {
    PRODUCT_BULK_DELETE: '/delete/bulk/products', //?ids=[10, 20]
    PRODUCT_DELETE: '/products', //:id
  },
};

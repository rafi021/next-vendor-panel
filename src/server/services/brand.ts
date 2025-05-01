export const BRANDS = {
  GET: {
    BRANDS: {
      URL: '/brands', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['BRANDS'],
    },
    BRAND_DETAILS: {
      URL: '/brands',
      TAGS: ['BRAND'],
    },
  },
  POST: {
    BRAND_CREATE: '/brands',
  },
  PUT: {
    BRAND_UPDATE: '/brands', // :id
    BRAND_STATUS_UPDATE: '/brands/status', // :id
  },
  DELETE: {
    BRAND_DELETE: '/brands', // :id
  },
};

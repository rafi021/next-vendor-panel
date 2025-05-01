export const FLASH_SALES = {
  GET: {
    URL: '/flashsales', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['FLASH_SALES'],
  },
  POST: '/flashsales',

  PUT: {
    FLASH_SALE_UPDATE: '/flashsales', // :id
    FLASH_SALE_STATUS_UPDATE: '/flashsales/status', // :id
  },
  DELETE:  '/flashsales', // :id,
};

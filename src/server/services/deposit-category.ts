export const DEPOSIT_CATEGORY = {
  GET: {
    URL: '/depositcategories', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['DEPOSIT_CATEGORIES'],
  },
  POST: '/depositcategories',

  PUT: {
    CATEGORY_UPDATE: '/depositcategories', // :id
    STATUS_UPDATE: '/depositcategories-status', // :id
  },
  DELETE: '/depositcategories', // :id,
};

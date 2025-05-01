export const EXPENSE_CATEGORY = {
    GET: {
      URL: '/expensecategories', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['EXPENSE_CATEGORIES'],
    },
    POST: '/expensecategories',
  
    PUT: {
      CATEGORY_UPDATE: '/expensecategories', // :id
      STATUS_UPDATE: '/expensecategories-status', // :id
    },
    DELETE: '/expensecategories', // :id,
  };
  
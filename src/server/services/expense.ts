export const EXPENSES = {
  GET: {
    URL: '/expenses', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['EXPENSES', 'EXPENSE_CATEGORIES', 'ACCOUNTS'],
  },
  POST: '/expenses',

  PUT: {
    EXPENSE_UPDATE: '/expenses', // :id
    STATUS_UPDATE: '/expenses-status', // :id
  },
  DELETE: '/expenses', // :id,
};

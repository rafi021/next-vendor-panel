export const ACCOUNTS = {
  GET: {
    URL: '/accounts', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['ACCOUNTS'],
  },
  POST: '/accounts',

  PUT: {
    ACCOUNT_UPDATE: '/accounts', // :id
    STATUS_UPDATE: '/accounts-status', // :id
  },
  DELETE: '/accounts', // :id,
};

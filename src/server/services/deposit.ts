export const DEPOSITS = {
  GET: {
    URL: '/deposits', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['DEPOSITS', 'DEPOSIT_CATEGORIES', 'ACCOUNTS'],
  },
  POST: '/deposits',

  PUT: {
    DEPOSIT_UPDATE: '/deposits', // :id
    STATUS_UPDATE: '/deposits-status', // :id
  },
  DELETE: '/deposits', // :id,
};

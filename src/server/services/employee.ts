export const EMPLOYEES = {
  GET: {
    LIST: {
      URL: '/employees', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['EMPLOYEES'],
    },
    DETAILS: {
      URL: '/employees',
    },
  },
  POST: '/employees',
  PUT: '/employees', // :id
  DELETE: '/employees', // :id,
  STATUS_UPDATE: '/employees-status',
};

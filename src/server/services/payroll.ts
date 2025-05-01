export const PAYROLL = {
    GET: {
      URL: '/payrolls', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['PAYROLL'],
    },
    POST: '/payrolls',
  
    PUT: {
      UPDATE_PAYROLL: '/payrolls', // :id
      STATUS_UPDATE: '/payrolls', // :id
    },
    DELETE: '/payrolls', // :id,
  };
  
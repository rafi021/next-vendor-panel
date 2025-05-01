export const DEPARTMENT = {
    GET: {
      URL: '/departments', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['DEPARTMENT'],
    },
    POST: '/departments',
  
    PUT: {
        DEPARTMENT_UPDATE: '/departments', // :id
      STATUS_UPDATE: '/departments-status', // :id
    },
    DELETE: '/departments', // :id,
  };
  
export const LEAVE_TYPES = {
  GET: {
    URL: '/leavetypes', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['LEAVE_TYPES'],
  },
  POST: '/leavetypes',

  PUT: {
    LEAVE_TYPE_UPDATE: '/leavetypes', // :id
    STATUS_UPDATE: '/leavetypes-status', // :id
  },
  DELETE: '/leavetypes', // :id,
};

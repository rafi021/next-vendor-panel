export const LEAVE_REQUESTS = {
  GET: {
    URL: '/leaverequests', //per_page=10&sort_column=id&sort_direction=desc&search=
    TAGS: ['LEAVE_REQUESTS'],
  },
  POST: '/leaverequests',

  PUT: {
    LEAVE_REQUEST_UPDATE: '/leaverequests', // :id
    STATUS_UPDATE: '/leaverequests', // :id
  },
  DELETE: '/leaverequests', // :id,
};

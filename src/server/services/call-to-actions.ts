export const CALL_TO_ACTIONS = {
  GET: {
    CALL_TO_ACTIONS: {
      URL: '/calltoactions', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['CALL_TO_ACTIONS'],
    },
    CALL_TO_ACTION_DETAILS: {
      URL: '/calltoactions', // :id
      TAGS: ['CALL_TO_ACTION'],
    },
  },
  POST: '/calltoactions',

  PUT: {
    CALL_TO_ACTION_UPDATE: '/calltoactions', // :id
    CALL_TO_ACTION_STATUS_UPDATE: '/calltoactions/status', // :id
  },
  DELETE: '/calltoactions', // :id
};

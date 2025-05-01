export const PRIMARYBANNERS = {
  GET: {
    PRIMARYBANNERS: {
      URL: '/primarybanners', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['PRIMARYBANNERS'],
    },
    PRIMARYBANNER_DETAILS: {
      URL: '/primarybanners', // :id
      TAGS: ['PRIMARYBANNER'],
    },
  },
  POST: '/primarybanners',

  PUT: {
    PRIMARYBANNER_UPDATE: '/primarybanners', // :id
    PRIMARYBANNER_STATUS_UPDATE: '/primarybanners/status', // :id
  },
  DELETE: {
    PRIMARYBANNER_DELETE: '/primarybanners', // :id
  },
};

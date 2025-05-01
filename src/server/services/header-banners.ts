export const HEADER_BANNERS = {
  GET: {
    HEADER_BANNERS: {
      URL: '/headerbanners', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['HEADER_BANNERS'],
    },
    HEADER_BANNER_DETAILS: {
      URL: '/headerbanners', // :id
      TAGS: ['HEADER_BANNER'],
    },
  },
  POST: '/headerbanners',

  PUT: {
    HEADER_BANNER_UPDATE: '/headerbanners', // :id
    HEADER_BANNER_STATUS_UPDATE: '/headerbanners/status', // :id
  },
  DELETE: '/headerbanners', // :id
};
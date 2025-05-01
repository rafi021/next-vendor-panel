export const LANDING_PAGES = {
    GET: {
      URL: '/landing-pages', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['LANDING_PAGES'],
    },
    POST: '/landing-pages',
  
    PUT: {
      UPDATE_LANDING_PAGE: '/landing-pages', // :id
      STATUS_UPDATE: '/landing-pages-status', // :id
    },
    DELETE: '/landing-pages', // :id,
  };
  
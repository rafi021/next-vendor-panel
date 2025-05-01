export const WEEK_DEAL = {
  GET: {
    WEEK_DEALS: {
      URL: '/weekdeals', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['WEEK_DEALS'],
    },
  },
  POST: {
    WEEK_DEAL_CREATE: '/newslettersubscribers',
  },
  PUT: {
    WEEK_DEAL_UPDATE: '/newslettersubscribers', // :id
  },
  DELETE: {
    WEEK_DEAL_DELETE: '/newslettersubscribers', // :id
  },
};

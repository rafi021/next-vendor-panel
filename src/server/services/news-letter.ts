export const NEWS_LETTER = {
  GET: {
    NEWS_LETTERS: {
      URL: '/newslettersubscribers', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['NEWS_LETTERS'],
    },
  },
  POST: {
    NEWS_LETTER_CREATE: '/newslettersubscribers',
  },
  PUT: {
    NEWS_LETTER_UPDATE: '/newslettersubscribers', // :id
  },
  DELETE: {
    NEWS_LETTER_DELETE: '/newslettersubscribers', // :id
  },
};

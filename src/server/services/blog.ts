export const BLOG = {
  GET: {
    BLOGS: {
      URL: '/blogs', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['BRANDS'],
    },
    BLOG_DETAILS: {
      URL: '/blogs', // /:id
      TAGS: ['BRAND'],
    },
  },
  POST: {
    BLOG_CREATE: '/blogs',
  },
  PUT: {
    BLOG_UPDATE: '/blogs', // :id
  },
  DELETE: {
    BLOG_DELETE: '/blogs', // :id
  },
};

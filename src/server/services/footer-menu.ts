export const FOOTER_MENUS = {
  GET: {
    FOOTER_MENUS: {
      URL: '/footermenus', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['FOOTER_MENUS'],
    },
    FOOTER_MENU: {
      URL: '/footermenus', // :id
      TAGS: ['FOOTER_MENU'],
    },
    FOOTER_MENU_SLUG_LIST: {
      URL: '/only-url', // :id
      TAGS: ['FOOTER_MENU_SLUG_LIST'],
    },
  },
  POST: {
    FOOTER_MENU_CREATE: '/footermenus',
  },
  PUT: {
    FOOTER_MENU_UPDATE: '/footermenus', // /:id
  },
  DELETE: {
    FOOTER_MENU_DELETE: '/footermenus', // /:id
  },
};

export const AUTH = {
  GET: {
    PROFILE: {
      URL: '/profile',
      TAGS: ['PROFILE'],
    },
    CHECK_PERMISSIONS: {
      URL: '/check-permission',
      TAGS: ['PROFILE'],
    },
  },
  POST: {
    LOGIN: '/login',
    ONBOARDS: '/onboardings',
    CHANGE_PASSWORD: '/change-password',
    PROFILE_UPDATE: '/profile-update',
    LOGOUT: '/logout',
  },
};

export const SMS_CATEGORIES = {
  GET: {
    SMS_CATEGORIES: {
      URL: '/smscategories',
      TAGS: ['SMS_CATEGORIES'],
    },
    SMS_CATEGORIES_DETAILS: {
      URL: '/smscategories',
      TAGS: ['SMS_CATEGORIES_DETAILS'],
    },
  },
  POST: {
    SMS_CATEGORIES_CREATE: '/smscategories',
  },
  PUT: {
    SMS_CATEGORIES_UPDATE: '/smscategories',
    SMS_CATEGORIES_STATUS_UPDATE: '/smscategories-status',
  },
  DELETE: {
    SMS_CATEGORIES_DELETE: '/smscategories',
  },
};

export const SMS_TEMPLATES = {
  GET: {
    SMS_TEMPLATES: {
      URL: '/smstemplates',
      TAGS: ['SMS_TEMPLATES'],
    },
    SMS_TEMPLATES_DETAILS: {
      URL: '/smstemplates',
      TAGS: ['SMS_TEMPLATES_DETAILS'],
    },
  },
  POST: {
    SMS_TEMPLATES_CREATE: '/smstemplates',
  },
  PUT: {
    SMS_TEMPLATES_UPDATE: '/smstemplates',
    SMS_TEMPLATES_STATUS_UPDATE: '/smstemplates-status',
  },
  DELETE: {
    SMS_TEMPLATES_DELETE: '/smstemplates',
  },
};

export const TEST_SMS = {
  POST: {
    URL: '/test-sms',
  },
};
export const CUSTOMER_PROMOTIONAL_SMS = {
  POST: {
    URL: '/customer-promotional-sms',
  },
};

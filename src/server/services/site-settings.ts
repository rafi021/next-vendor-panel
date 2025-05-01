export const SITE_SETTINGS = {
  GET: {
    URL: '/sitesettings',
    TAGS: ['SITE_SETTINGS'],
  },
  POST: '/sitesettings',
  PUT: '/sitesettings',
};

// export const GET_SETTING = '/get-setting'; // "/get-setting?key=delivery_fee"
export const GET_SETTING = {
  GET: {
    URL: '/get-admin-setting',
    TAGS: ['STYLE'],
  },
}; // "/get-setting?key=delivery_fee"
export const GET_SETTINGS = {
  GET: {
    URL: '/get-admin-settings',
    TAGS: ['STYLE'],
  },
}; // "/get-settings?key=["product_card_type","style"]"

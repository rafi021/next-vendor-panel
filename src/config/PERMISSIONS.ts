export const PERMISSIONS_LIST = [
  {
    id: 432,
    name: 'employee_status',
    module: 'employee',
  },
  {
    id: 431,
    name: 'employee_delete',
    module: 'employee',
  },
  {
    id: 430,
    name: 'employee_update',
    module: 'employee',
  },
  {
    id: 429,
    name: 'employee_create',
    module: 'employee',
  },
  {
    id: 428,
    name: 'employee_list',
    module: 'employee',
  },
  {
    id: 427,
    name: 'supplier_status',
    module: 'supplier',
  },
  {
    id: 426,
    name: 'supplier_delete',
    module: 'supplier',
  },
  {
    id: 425,
    name: 'supplier_update',
    module: 'supplier',
  },
  {
    id: 424,
    name: 'supplier_create',
    module: 'supplier',
  },
  {
    id: 423,
    name: 'supplier_list',
    module: 'supplier',
  },
  {
    id: 422,
    name: 'comment_status',
    module: 'comment',
  },
  {
    id: 421,
    name: 'comment_delete',
    module: 'comment',
  },
  {
    id: 420,
    name: 'comment_update',
    module: 'comment',
  },
  {
    id: 419,
    name: 'comment_create',
    module: 'comment',
  },
  {
    id: 418,
    name: 'comment_list',
    module: 'comment',
  },
  {
    id: 417,
    name: 'wishlist_status',
    module: 'wishlist',
  },
  {
    id: 416,
    name: 'wishlist_delete',
    module: 'wishlist',
  },
  {
    id: 415,
    name: 'wishlist_update',
    module: 'wishlist',
  },
  {
    id: 414,
    name: 'wishlist_create',
    module: 'wishlist',
  },
  {
    id: 413,
    name: 'wishlist_list',
    module: 'wishlist',
  },
  {
    id: 412,
    name: 'review_status',
    module: 'review',
  },
  {
    id: 411,
    name: 'review_delete',
    module: 'review',
  },
  {
    id: 410,
    name: 'review_update',
    module: 'review',
  },
  {
    id: 409,
    name: 'review_create',
    module: 'review',
  },
  {
    id: 408,
    name: 'review_list',
    module: 'review',
  },
  {
    id: 407,
    name: 'customer_status',
    module: 'customer',
  },
  {
    id: 406,
    name: 'customer_delete',
    module: 'customer',
  },
  {
    id: 405,
    name: 'customer_update',
    module: 'customer',
  },
  {
    id: 404,
    name: 'customer_create',
    module: 'customer',
  },
  {
    id: 403,
    name: 'customer_list',
    module: 'customer',
  },
  {
    id: 402,
    name: 'orders_status',
    module: 'orders',
  },
  {
    id: 401,
    name: 'orders_delete',
    module: 'orders',
  },
  {
    id: 400,
    name: 'orders_update',
    module: 'orders',
  },
  {
    id: 399,
    name: 'orders_create',
    module: 'orders',
  },
  {
    id: 398,
    name: 'orders_list',
    module: 'orders',
  },
  {
    id: 397,
    name: 'leave_payroll_status',
    module: 'leave_payroll',
  },
  {
    id: 396,
    name: 'leave_payroll_delete',
    module: 'leave_payroll',
  },
  {
    id: 395,
    name: 'leave_payroll_update',
    module: 'leave_payroll',
  },
  {
    id: 394,
    name: 'leave_payroll_create',
    module: 'leave_payroll',
  },
  {
    id: 393,
    name: 'leave_payroll_list',
    module: 'leave_payroll',
  },
  {
    id: 392,
    name: 'leave_request_status',
    module: 'leave_request',
  },
  {
    id: 391,
    name: 'leave_request_delete',
    module: 'leave_request',
  },
  {
    id: 390,
    name: 'leave_request_update',
    module: 'leave_request',
  },
  {
    id: 389,
    name: 'leave_request_create',
    module: 'leave_request',
  },
  {
    id: 388,
    name: 'leave_request_list',
    module: 'leave_request',
  },
  {
    id: 387,
    name: 'leave_type_status',
    module: 'leave_type',
  },
  {
    id: 386,
    name: 'leave_type_delete',
    module: 'leave_type',
  },
  {
    id: 385,
    name: 'leave_type_update',
    module: 'leave_type',
  },
  {
    id: 384,
    name: 'leave_type_create',
    module: 'leave_type',
  },
  {
    id: 383,
    name: 'leave_type_list',
    module: 'leave_type',
  },
];

export const PERMISSIONS_GROUP = {
  general_settings: [
    {
      name: 'site_settings',
      permissions: [
        {
          name: 'site_setting_list',
        },
        // {
        //   id: 224,
        //   name: 'site_setting_create',
        //   module: 'site_setting',
        // },
        {
          id: 225,
          name: 'site_setting_update',
          module: 'site_setting',
        },
        // {
        //   id: 226,
        //   name: 'site_setting_delete',
        //   module: 'site_setting',
        // },
        // {
        //   id: 227,
        //   name: 'site_setting_status',
        //   module: 'site_setting',
        // },
      ],
    },
    // {
    //   name: 'department',
    //   permissions: [
    //     {
    //       id: 218,
    //       name: 'primary_banner_list',
    //       module: 'primary_banner',
    //     },
    //     {
    //       id: 219,
    //       name: 'primary_banner_create',
    //       module: 'primary_banner',
    //     },
    //     {
    //       id: 220,
    //       name: 'primary_banner_update',
    //       module: 'primary_banner',
    //     },
    //     {
    //       id: 221,
    //       name: 'primary_banner_delete',
    //       module: 'primary_banner',
    //     },
    //     {
    //       id: 222,
    //       name: 'primary_banner_status',
    //       module: 'primary_banner',
    //     },
    //   ],
    // },
  ],
  ui_and_layout_management: [
    {
      name: 'primary_banner',
      permissions: [
        {
          id: 218,
          name: 'primary_banner_list',
          module: 'primary_banner',
        },
        {
          id: 219,
          name: 'primary_banner_create',
          module: 'primary_banner',
        },
        {
          id: 220,
          name: 'primary_banner_update',
          module: 'primary_banner',
        },
        {
          id: 221,
          name: 'primary_banner_delete',
          module: 'primary_banner',
        },
        {
          id: 222,
          name: 'primary_banner_status',
          module: 'primary_banner',
        },
      ],
    },
    {
      name: 'header_banner',
      permissions: [
        {
          id: 228,
          name: 'header_banner_list',
          module: 'header_banner',
        },
        {
          id: 229,
          name: 'header_banner_create',
          module: 'header_banner',
        },
        {
          id: 230,
          name: 'header_banner_update',
          module: 'header_banner',
        },
        {
          id: 231,
          name: 'header_banner_delete',
          module: 'header_banner',
        },
        {
          id: 232,
          name: 'header_banner_status',
          module: 'header_banner',
        },
      ],
    },
    {
      name: 'call_to_action',
      permissions: [
        {
          id: 233,
          name: 'call_to_action_list',
          module: 'call_to_action',
        },
        {
          id: 234,
          name: 'call_to_action_create',
          module: 'call_to_action',
        },
        {
          id: 235,
          name: 'call_to_action_update',
          module: 'call_to_action',
        },
        {
          id: 236,
          name: 'call_to_action_delete',
          module: 'call_to_action',
        },
        {
          id: 237,
          name: 'call_to_action_status',
          module: 'call_to_action',
        },
      ],
    },
    {
      name: 'footer_menu',
      permissions: [
        {
          id: 238,
          name: 'footer_menu_list',
          module: 'footer_menu',
        },
        {
          id: 239,
          name: 'footer_menu_create',
          module: 'footer_menu',
        },
        {
          id: 240,
          name: 'footer_menu_update',
          module: 'footer_menu',
        },
        {
          id: 241,
          name: 'footer_menu_delete',
          module: 'footer_menu',
        },
        {
          id: 242,
          name: 'footer_menu_status',
          module: 'footer_menu',
        },
      ],
    },
    {
      name: 'hero_section',
      permissions: [
        {
          id: 278,
          name: 'hero_section_list',
          module: 'hero_section',
        },
        {
          id: 279,
          name: 'hero_section_create',
          module: 'hero_section',
        },
        {
          id: 280,
          name: 'hero_section_update',
          module: 'hero_section',
        },
        {
          id: 281,
          name: 'hero_section_delete',
          module: 'hero_section',
        },
        {
          id: 282,
          name: 'hero_section_status',
          module: 'hero_section',
        },
      ],
    },
    {
      name: 'section',
      permissions: [
        {
          id: 283,
          name: 'section_list',
          module: 'section',
        },
        {
          id: 284,
          name: 'section_create',
          module: 'section',
        },
        {
          id: 285,
          name: 'section_update',
          module: 'section',
        },
        {
          id: 286,
          name: 'section_delete',
          module: 'section',
        },
        {
          id: 287,
          name: 'section_status',
          module: 'section',
        },
      ],
    },
    {
      name: 'landing_page',
      permissions: [
        {
          id: 288,
          name: 'landing_page_list',
          module: 'landing_page',
        },
        {
          id: 289,
          name: 'landing_page_create',
          module: 'landing_page',
        },
        {
          id: 290,
          name: 'landing_page_update',
          module: 'landing_page',
        },
        {
          id: 291,
          name: 'landing_page_delete',
          module: 'landing_page',
        },
        {
          id: 292,
          name: 'landing_page_status',
          module: 'landing_page',
        },
      ],
    },
  ],
  content_management: [
    {
      name: 'page',
      permissions: [
        {
          id: 258,
          name: 'page_list',
          module: 'page',
        },
        {
          id: 259,
          name: 'page_create',
          module: 'page',
        },
        {
          id: 260,
          name: 'page_update',
          module: 'page',
        },
        {
          id: 261,
          name: 'page_delete',
          module: 'page',
        },
        {
          id: 262,
          name: 'page_status',
          module: 'page',
        },
      ],
    },
    {
      name: 'blog',
      permissions: [
        {
          id: 263,
          name: 'blog_list',
          module: 'blog',
        },
        {
          id: 264,
          name: 'blog_create',
          module: 'blog',
        },
        {
          id: 265,
          name: 'blog_update',
          module: 'blog',
        },
        {
          id: 266,
          name: 'blog_delete',
          module: 'blog',
        },
        {
          id: 267,
          name: 'blog_status',
          module: 'blog',
        },
      ],
    },
    {
      name: 'ticker',
      permissions: [
        {
          id: 268,
          name: 'ticker_list',
          module: 'ticker',
        },
        {
          id: 269,
          name: 'ticker_create',
          module: 'ticker',
        },
        {
          id: 270,
          name: 'ticker_update',
          module: 'ticker',
        },
        {
          id: 271,
          name: 'ticker_delete',
          module: 'ticker',
        },
        {
          id: 272,
          name: 'ticker_status',
          module: 'ticker',
        },
      ],
    },
    {
      name: 'newsletter',
      permissions: [
        {
          id: 243,
          name: 'newsletter_list',
          module: 'newsletter',
        },
        {
          id: 244,
          name: 'newsletter_create',
          module: 'newsletter',
        },
        {
          id: 245,
          name: 'newsletter_update',
          module: 'newsletter',
        },
        {
          id: 246,
          name: 'newsletter_delete',
          module: 'newsletter',
        },
        {
          id: 247,
          name: 'newsletter_status',
          module: 'newsletter',
        },
      ],
    },
  ],

  eCommerce_Catalog: [
    {
      name: 'brand',
      permissions: [
        {
          id: 303,
          name: 'brand_list',
          module: 'brand',
        },
        {
          id: 304,
          name: 'brand_create',
          module: 'brand',
        },
        {
          id: 305,
          name: 'brand_update',
          module: 'brand',
        },
        {
          id: 306,
          name: 'brand_delete',
          module: 'brand',
        },
        {
          id: 307,
          name: 'brand_status',
          module: 'brand',
        },
      ],
    },
    {
      name: 'category',
      permissions: [
        {
          id: 308,
          name: 'category_list',
          module: 'category',
        },
        {
          id: 309,
          name: 'category_create',
          module: 'category',
        },
        {
          id: 310,
          name: 'category_update',
          module: 'category',
        },
        {
          id: 311,
          name: 'category_delete',
          module: 'category',
        },
        {
          id: 312,
          name: 'category_status',
          module: 'category',
        },
      ],
    },
    {
      name: 'product_attribute',
      permissions: [
        {
          id: 313,
          name: 'product_attribute_list',
          module: 'product_attribute',
        },
        {
          id: 314,
          name: 'product_attribute_create',
          module: 'product_attribute',
        },
        {
          id: 315,
          name: 'product_attribute_update',
          module: 'product_attribute',
        },
        {
          id: 316,
          name: 'product_attribute_delete',
          module: 'product_attribute',
        },
        {
          id: 317,
          name: 'product_attribute_status',
          module: 'product_attribute',
        },
      ],
    },
    {
      name: 'tag',
      permissions: [
        {
          id: 323,
          name: 'tag_list',
          module: 'tag',
        },
        {
          id: 324,
          name: 'tag_create',
          module: 'tag',
        },
        {
          id: 325,
          name: 'tag_update',
          module: 'tag',
        },
        {
          id: 326,
          name: 'tag_delete',
          module: 'tag',
        },
        {
          id: 327,
          name: 'tag_status',
          module: 'tag',
        },
      ],
    },

    {
      name: 'product',
      permissions: [
        {
          id: 318,
          name: 'product_list',
          module: 'product',
        },
        {
          id: 319,
          name: 'product_create',
          module: 'product',
        },
        {
          id: 320,
          name: 'product_update',
          module: 'product',
        },
        {
          id: 321,
          name: 'product_delete',
          module: 'product',
        },
        {
          id: 322,
          name: 'product_status',
          module: 'product',
        },
      ],
    },
  ],

  'order_&_customer_management': [
    {
      name: 'orders',
      permissions: [
        {
          id: 398,
          name: 'orders_list',
          module: 'orders',
        },
        {
          id: 399,
          name: 'orders_create',
          module: 'orders',
        },
        {
          id: 400,
          name: 'orders_update',
          module: 'orders',
        },
        {
          id: 401,
          name: 'orders_delete',
          module: 'orders',
        },
        {
          id: 402,
          name: 'orders_status',
          module: 'orders',
        },
      ],
    },
    {
      name: 'customer',
      permissions: [
        {
          id: 403,
          name: 'customer_list',
          module: 'customer',
        },
        {
          id: 404,
          name: 'customer_create',
          module: 'customer',
        },
        {
          id: 405,
          name: 'customer_update',
          module: 'customer',
        },
        {
          id: 406,
          name: 'customer_delete',
          module: 'customer',
        },
        {
          id: 407,
          name: 'customer_status',
          module: 'customer',
        },
      ],
    },
    {
      name: 'wishlist',
      permissions: [
        {
          id: 413,
          name: 'wishlist_list',
          module: 'wishlist',
        },
        {
          id: 414,
          name: 'wishlist_create',
          module: 'wishlist',
        },
        {
          id: 415,
          name: 'wishlist_update',
          module: 'wishlist',
        },
        {
          id: 416,
          name: 'wishlist_delete',
          module: 'wishlist',
        },
        {
          id: 417,
          name: 'wishlist_status',
          module: 'wishlist',
        },
      ],
    },
    {
      name: 'review',
      permissions: [
        {
          id: 408,
          name: 'review_list',
          module: 'review',
        },
        {
          id: 409,
          name: 'review_create',
          module: 'review',
        },
        {
          id: 410,
          name: 'review_update',
          module: 'review',
        },
        {
          id: 411,
          name: 'review_delete',
          module: 'review',
        },
        {
          id: 412,
          name: 'review_status',
          module: 'review',
        },
      ],
    },
    {
      name: 'comment',
      permissions: [
        {
          id: 418,
          name: 'comment_list',
          module: 'comment',
        },
        {
          id: 419,
          name: 'comment_create',
          module: 'comment',
        },
        {
          id: 420,
          name: 'comment_update',
          module: 'comment',
        },
        {
          id: 421,
          name: 'comment_delete',
          module: 'comment',
        },
        {
          id: 422,
          name: 'comment_status',
          module: 'comment',
        },
      ],
    },
  ],
  'promotion_&_marketing': [
    {
      name: 'coupon',
      permissions: [
        {
          id: 328,
          name: 'coupon_list',
          module: 'coupon',
        },
        {
          id: 329,
          name: 'coupon_create',
          module: 'coupon',
        },
        {
          id: 330,
          name: 'coupon_update',
          module: 'coupon',
        },
        {
          id: 331,
          name: 'coupon_delete',
          module: 'coupon',
        },
        {
          id: 332,
          name: 'coupon_status',
          module: 'coupon',
        },
      ],
    },
  ],
  'inventory_&_procurement': [
    {
      name: 'purchase_orders',
      permissions: [
        {
          id: 338,
          name: 'purchase_list',
          module: 'purchase_orders',
        },
        {
          id: 339,
          name: 'purchase_create',
          module: 'purchase_orders',
        },
        {
          id: 340,
          name: 'purchase_update',
          module: 'purchase_orders',
        },
        {
          id: 341,
          name: 'purchase_delete',
          module: 'purchase_orders',
        },
        {
          id: 342,
          name: 'purchase_status',
          module: 'purchase_orders',
        },
      ],
    },
    {
      name: 'purchase_return',
      permissions: [
        {
          id: 343,
          name: 'purchase_return_list',
          module: 'purchase_return',
        },
        {
          id: 344,
          name: 'purchase_return_create',
          module: 'purchase_return',
        },
        {
          id: 345,
          name: 'purchase_return_update',
          module: 'purchase_return',
        },
        {
          id: 346,
          name: 'purchase_return_delete',
          module: 'purchase_return',
        },
        {
          id: 347,
          name: 'purchase_return_status',
          module: 'purchase_return',
        },
      ],
    },
    {
      name: 'damage_report',
      permissions: [
        {
          id: 333,
          name: 'damage_list',
          module: 'damage',
        },
        {
          id: 334,
          name: 'damage_create',
          module: 'damage',
        },
        {
          id: 335,
          name: 'damage_update',
          module: 'damage',
        },
        {
          id: 336,
          name: 'damage_delete',
          module: 'damage',
        },
        {
          id: 337,
          name: 'damage_status',
          module: 'damage',
        },
      ],
    },
    {
      name: 'supplier',
      permissions: [
        {
          id: 423,
          name: 'supplier_list',
          module: 'supplier',
        },
        {
          id: 424,
          name: 'supplier_create',
          module: 'supplier',
        },
        {
          id: 425,
          name: 'supplier_update',
          module: 'supplier',
        },
        {
          id: 426,
          name: 'supplier_delete',
          module: 'supplier',
        },
        {
          id: 427,
          name: 'supplier_status',
          module: 'supplier',
        },
      ],
    },
  ],

  SMS_management: [
    {
      name: 'SMS_category',
      permissions: [
        {
          id: 293,
          name: 'sms_category_list',
          module: 'sms_category',
        },
        {
          id: 294,
          name: 'sms_category_create',
          module: 'sms_category',
        },
        {
          id: 295,
          name: 'sms_category_update',
          module: 'sms_category',
        },
        {
          id: 296,
          name: 'sms_category_delete',
          module: 'sms_category',
        },
        {
          id: 297,
          name: 'sms_category_status',
          module: 'sms_category',
        },
      ],
    },
    {
      name: 'SMS_template',
      permissions: [
        {
          id: 298,
          name: 'sms_template_list',
          module: 'sms_template',
        },
        {
          id: 299,
          name: 'sms_template_create',
          module: 'sms_template',
        },
        {
          id: 300,
          name: 'sms_template_update',
          module: 'sms_template',
        },
        {
          id: 301,
          name: 'sms_template_delete',
          module: 'sms_template',
        },
        {
          id: 302,
          name: 'sms_template_status',
          module: 'sms_template',
        },
      ],
    },
  ],

  'accounting_&_finance': [
    {
      name: 'account_orders',
      permissions: [
        {
          id: 348,
          name: 'account_list',
          module: 'account_orders',
        },
        {
          id: 349,
          name: 'account_create',
          module: 'account_orders',
        },
        {
          id: 350,
          name: 'account_update',
          module: 'account_orders',
        },
        {
          id: 351,
          name: 'account_delete',
          module: 'account_orders',
        },
        {
          id: 352,
          name: 'account_status',
          module: 'account_orders',
        },
      ],
    },
    {
      name: 'deposit_category',
      permissions: [
        {
          id: 353,
          name: 'deposit_category_list',
          module: 'deposit_category',
        },
        {
          id: 354,
          name: 'deposit_category_create',
          module: 'deposit_category',
        },
        {
          id: 355,
          name: 'deposit_category_update',
          module: 'deposit_category',
        },
        {
          id: 356,
          name: 'deposit_category_delete',
          module: 'deposit_category',
        },
        {
          id: 357,
          name: 'deposit_category_status',
          module: 'deposit_category',
        },
      ],
    },
    {
      name: 'deposit',
      permissions: [],
    },
    {
      name: 'expense_category',
      permissions: [
        {
          id: 363,
          name: 'expense_category_list',
          module: 'expense_category',
        },
        {
          id: 364,
          name: 'expense_category_create',
          module: 'expense_category',
        },
        {
          id: 365,
          name: 'expense_category_update',
          module: 'expense_category',
        },
        {
          id: 366,
          name: 'expense_category_delete',
          module: 'expense_category',
        },
        {
          id: 367,
          name: 'expense_category_status',
          module: 'expense_category',
        },
      ],
    },
    {
      name: 'expense',
      permissions: [
        {
          id: 368,
          name: 'expense_list',
          module: 'expense',
        },
        {
          id: 369,
          name: 'expense_create',
          module: 'expense',
        },
        {
          id: 370,
          name: 'expense_update',
          module: 'expense',
        },
        {
          id: 371,
          name: 'expense_delete',
          module: 'expense',
        },
        {
          id: 372,
          name: 'expense_status',
          module: 'expense',
        },
      ],
    },
    {
      name: 'fund_transfer',
      permissions: [
        {
          id: 373,
          name: 'fund_transfer_list',
          module: 'fund_transfer',
        },
        {
          id: 374,
          name: 'fund_transfer_create',
          module: 'fund_transfer',
        },
        {
          id: 375,
          name: 'fund_transfer_update',
          module: 'fund_transfer',
        },
        {
          id: 376,
          name: 'fund_transfer_delete',
          module: 'fund_transfer',
        },
        {
          id: 377,
          name: 'fund_transfer_status',
          module: 'fund_transfer',
        },
      ],
    },
  ],
  'HR_&_Payroll': [
    {
      name: 'employee',
      permissions: [
        {
          id: 428,
          name: 'employee_list',
          module: 'employee',
        },
        {
          id: 429,
          name: 'employee_create',
          module: 'employee',
        },
        {
          id: 430,
          name: 'employee_update',
          module: 'employee',
        },
        {
          id: 431,
          name: 'employee_delete',
          module: 'employee',
        },
        {
          id: 432,
          name: 'employee_status',
          module: 'employee',
        },
      ],
    },
    {
      name: 'leave_type',
      permissions: [
        {
          id: 383,
          name: 'leave_type_list',
          module: 'leave_type',
        },
        {
          id: 384,
          name: 'leave_type_create',
          module: 'leave_type',
        },
        {
          id: 385,
          name: 'leave_type_update',
          module: 'leave_type',
        },
        {
          id: 386,
          name: 'leave_type_delete',
          module: 'leave_type',
        },
        {
          id: 387,
          name: 'leave_type_status',
          module: 'leave_type',
        },
      ],
    },
    {
      name: 'leave_request',
      permissions: [
        {
          id: 388,
          name: 'leave_request_list',
          module: 'leave_request',
        },
        {
          id: 389,
          name: 'leave_request_create',
          module: 'leave_request',
        },
        {
          id: 390,
          name: 'leave_request_update',
          module: 'leave_request',
        },
        {
          id: 391,
          name: 'leave_request_delete',
          module: 'leave_request',
        },
        {
          id: 392,
          name: 'leave_request_status',
          module: 'leave_request',
        },
      ],
    },
    {
      name: 'leave_payroll',
      permissions: [
        {
          id: 393,
          name: 'leave_payroll_list',
          module: 'leave_payroll',
        },
        {
          id: 394,
          name: 'leave_payroll_create',
          module: 'leave_payroll',
        },
        {
          id: 395,
          name: 'leave_payroll_update',
          module: 'leave_payroll',
        },
        {
          id: 396,
          name: 'leave_payroll_delete',
          module: 'leave_payroll',
        },
        {
          id: 397,
          name: 'leave_payroll_status',
          module: 'leave_payroll',
        },
      ],
    },
  ],

  /**
   * list
   */

  // call_to_action: [
  //   {
  //     id: 233,
  //     name: 'call_to_action_list',
  //     module: 'call_to_action',
  //   },
  //   {
  //     id: 234,
  //     name: 'call_to_action_create',
  //     module: 'call_to_action',
  //   },
  //   {
  //     id: 235,
  //     name: 'call_to_action_update',
  //     module: 'call_to_action',
  //   },
  //   {
  //     id: 236,
  //     name: 'call_to_action_delete',
  //     module: 'call_to_action',
  //   },
  //   {
  //     id: 237,
  //     name: 'call_to_action_status',
  //     module: 'call_to_action',
  //   },
  // ],
  // footer_menu: [
  //   {
  //     id: 238,
  //     name: 'footer_menu_list',
  //     module: 'footer_menu',
  //   },
  //   {
  //     id: 239,
  //     name: 'footer_menu_create',
  //     module: 'footer_menu',
  //   },
  //   {
  //     id: 240,
  //     name: 'footer_menu_update',
  //     module: 'footer_menu',
  //   },
  //   {
  //     id: 241,
  //     name: 'footer_menu_delete',
  //     module: 'footer_menu',
  //   },
  //   {
  //     id: 242,
  //     name: 'footer_menu_status',
  //     module: 'footer_menu',
  //   },
  // ],

  // week_deal: [
  //   {
  //     id: 248,
  //     name: 'week_deal_list',
  //     module: 'week_deal',
  //   },
  //   {
  //     id: 249,
  //     name: 'week_deal_create',
  //     module: 'week_deal',
  //   },
  //   {
  //     id: 250,
  //     name: 'week_deal_update',
  //     module: 'week_deal',
  //   },
  //   {
  //     id: 251,
  //     name: 'week_deal_delete',
  //     module: 'week_deal',
  //   },
  //   {
  //     id: 252,
  //     name: 'week_deal_status',
  //     module: 'week_deal',
  //   },
  // ],
  // flash_sale: [
  //   {
  //     id: 253,
  //     name: 'flash_sale_list',
  //     module: 'flash_sale',
  //   },
  //   {
  //     id: 254,
  //     name: 'flash_sale_create',
  //     module: 'flash_sale',
  //   },
  //   {
  //     id: 255,
  //     name: 'flash_sale_update',
  //     module: 'flash_sale',
  //   },
  //   {
  //     id: 256,
  //     name: 'flash_sale_delete',
  //     module: 'flash_sale',
  //   },
  //   {
  //     id: 257,
  //     name: 'flash_sale_status',
  //     module: 'flash_sale',
  //   },
  // ],
  //

  //
  // sub_ticker: [
  //   {
  //     id: 273,
  //     name: 'sub_ticker_list',
  //     module: 'sub_ticker',
  //   },
  //   {
  //     id: 274,
  //     name: 'sub_ticker_create',
  //     module: 'sub_ticker',
  //   },
  //   {
  //     id: 275,
  //     name: 'sub_ticker_update',
  //     module: 'sub_ticker',
  //   },
  //   {
  //     id: 276,
  //     name: 'sub_ticker_delete',
  //     module: 'sub_ticker',
  //   },
  //   {
  //     id: 277,
  //     name: 'sub_ticker_status',
  //     module: 'sub_ticker',
  //   },
  // ],
  //
  //
  //

  // department_orders: [
  //   {
  //     id: 378,
  //     name: 'department_list',
  //     module: 'department_orders',
  //   },
  //   {
  //     id: 379,
  //     name: 'department_create',
  //     module: 'department_orders',
  //   },
  //   {
  //     id: 380,
  //     name: 'department_update',
  //     module: 'department_orders',
  //   },
  //   {
  //     id: 381,
  //     name: 'department_delete',
  //     module: 'department_orders',
  //   },
  //   {
  //     id: 382,
  //     name: 'department_status',
  //     module: 'department_orders',
  //   },
  // ],
};

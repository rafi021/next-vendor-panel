export enum PERMISSIONS_ENUMS {
  ALL = 'all',

  // PRIMARY_BANNER Permissions
  PRIMARY_BANNER_LIST = 'primary_banner_list',
  PRIMARY_BANNER_CREATE = 'primary_banner_create',
  PRIMARY_BANNER_UPDATE = 'primary_banner_update',
  PRIMARY_BANNER_DELETE = 'primary_banner_delete',
  PRIMARY_BANNER_STATUS = 'primary_banner_status',
  // Site Setting Permissions
  SITE_SETTING_LIST = 'site_setting_list',
  SITE_SETTING_CREATE = 'site_setting_create',
  SITE_SETTING_UPDATE = 'site_setting_update',
  SITE_SETTING_DELETE = 'site_setting_delete',
  SITE_SETTING_STATUS = 'site_setting_status',

  // Header Banner Permissions
  HEADER_BANNER_LIST = 'header_banner_list',
  HEADER_BANNER_CREATE = 'header_banner_create',
  HEADER_BANNER_UPDATE = 'header_banner_update',
  HEADER_BANNER_DELETE = 'header_banner_delete',
  HEADER_BANNER_STATUS = 'header_banner_status',

  // Call to Action Permissions
  CALL_TO_ACTION_LIST = 'call_to_action_list',
  CALL_TO_ACTION_CREATE = 'call_to_action_create',
  CALL_TO_ACTION_UPDATE = 'call_to_action_update',
  CALL_TO_ACTION_DELETE = 'call_to_action_delete',
  CALL_TO_ACTION_STATUS = 'call_to_action_status',

  // Footer Menu Permissions
  FOOTER_MENU_LIST = 'footer_menu_list',
  FOOTER_MENU_CREATE = 'footer_menu_create',
  FOOTER_MENU_UPDATE = 'footer_menu_update',
  FOOTER_MENU_DELETE = 'footer_menu_delete',
  FOOTER_MENU_STATUS = 'footer_menu_status',

  // Newsletter Permissions
  NEWSLETTER_LIST = 'newsletter_list',
  NEWSLETTER_CREATE = 'newsletter_create',
  NEWSLETTER_UPDATE = 'newsletter_update',
  NEWSLETTER_DELETE = 'newsletter_delete',
  NEWSLETTER_STATUS = 'newsletter_status',

  // Week Deal Permissions
  WEEK_DEAL_LIST = 'week_deal_list',
  WEEK_DEAL_CREATE = 'week_deal_create',
  WEEK_DEAL_UPDATE = 'week_deal_update',
  WEEK_DEAL_DELETE = 'week_deal_delete',
  WEEK_DEAL_STATUS = 'week_deal_status',

  // Flash Sale Permissions
  FLASH_SALE_LIST = 'flash_sale_list',
  FLASH_SALE_CREATE = 'flash_sale_create',
  FLASH_SALE_UPDATE = 'flash_sale_update',
  FLASH_SALE_DELETE = 'flash_sale_delete',
  FLASH_SALE_STATUS = 'flash_sale_status',

  // Page Permissions
  PAGE_LIST = 'page_list',
  PAGE_CREATE = 'page_create',
  PAGE_UPDATE = 'page_update',
  PAGE_DELETE = 'page_delete',
  PAGE_STATUS = 'page_status',

  // Blog Permissions
  BLOG_LIST = 'blog_list',
  BLOG_CREATE = 'blog_create',
  BLOG_UPDATE = 'blog_update',
  BLOG_DELETE = 'blog_delete',
  BLOG_STATUS = 'blog_status',

  // Ticker Permissions
  TICKER_LIST = 'ticker_list',
  TICKER_CREATE = 'ticker_create',
  TICKER_UPDATE = 'ticker_update',
  TICKER_DELETE = 'ticker_delete',
  TICKER_STATUS = 'ticker_status',

  // Sub Ticker Permissions
  SUB_TICKER_LIST = 'sub_ticker_list',
  SUB_TICKER_CREATE = 'sub_ticker_create',
  SUB_TICKER_UPDATE = 'sub_ticker_update',
  SUB_TICKER_DELETE = 'sub_ticker_delete',
  SUB_TICKER_STATUS = 'sub_ticker_status',

  // Hero Section Permissions
  HERO_SECTION_LIST = 'hero_section_list',
  HERO_SECTION_CREATE = 'hero_section_create',
  HERO_SECTION_UPDATE = 'hero_section_update',
  HERO_SECTION_DELETE = 'hero_section_delete',
  HERO_SECTION_STATUS = 'hero_section_status',

  // Section Permissions
  SECTION_LIST = 'section_list',
  SECTION_CREATE = 'section_create',
  SECTION_UPDATE = 'section_update',
  SECTION_DELETE = 'section_delete',
  SECTION_STATUS = 'section_status',

  // Landing Page Permissions
  LANDING_PAGE_LIST = 'landing_page_list',
  LANDING_PAGE_CREATE = 'landing_page_create',
  LANDING_PAGE_UPDATE = 'landing_page_update',
  LANDING_PAGE_DELETE = 'landing_page_delete',
  LANDING_PAGE_STATUS = 'landing_page_status',

  // SMS Category Permissions
  SMS_CATEGORY_LIST = 'sms_category_list',
  SMS_CATEGORY_CREATE = 'sms_category_create',
  SMS_CATEGORY_UPDATE = 'sms_category_update',
  SMS_CATEGORY_DELETE = 'sms_category_delete',
  SMS_CATEGORY_STATUS = 'sms_category_status',

  // SMS Template Permissions
  SMS_TEMPLATE_LIST = 'sms_template_list',
  SMS_TEMPLATE_CREATE = 'sms_template_create',
  SMS_TEMPLATE_UPDATE = 'sms_template_update',
  SMS_TEMPLATE_DELETE = 'sms_template_delete',
  SMS_TEMPLATE_STATUS = 'sms_template_status',

  // Brand Permissions
  BRAND_LIST = 'brand_list',
  BRAND_CREATE = 'brand_create',
  BRAND_UPDATE = 'brand_update',
  BRAND_DELETE = 'brand_delete',
  BRAND_STATUS = 'brand_status',

  // Category Permissions
  CATEGORY_LIST = 'category_list',
  CATEGORY_CREATE = 'category_create',
  CATEGORY_UPDATE = 'category_update',
  CATEGORY_DELETE = 'category_delete',
  CATEGORY_STATUS = 'category_status',

  // Product Attribute Permissions
  PRODUCT_ATTRIBUTE_LIST = 'product_attribute_list',
  PRODUCT_ATTRIBUTE_CREATE = 'product_attribute_create',
  PRODUCT_ATTRIBUTE_UPDATE = 'product_attribute_update',
  PRODUCT_ATTRIBUTE_DELETE = 'product_attribute_delete',
  PRODUCT_ATTRIBUTE_STATUS = 'product_attribute_status',

  // Product Permissions
  PRODUCT_LIST = 'product_list',
  PRODUCT_CREATE = 'product_create',
  PRODUCT_UPDATE = 'product_update',
  PRODUCT_DELETE = 'product_delete',
  PRODUCT_STATUS = 'product_status',

  // Tag Permissions
  TAG_LIST = 'tag_list',
  TAG_CREATE = 'tag_create',
  TAG_UPDATE = 'tag_update',
  TAG_DELETE = 'tag_delete',
  TAG_STATUS = 'tag_status',

  // Coupon Permissions
  COUPON_LIST = 'coupon_list',
  COUPON_CREATE = 'coupon_create',
  COUPON_UPDATE = 'coupon_update',
  COUPON_DELETE = 'coupon_delete',
  COUPON_STATUS = 'coupon_status',

  // Damage Permissions
  DAMAGE_LIST = 'damage_list',
  DAMAGE_CREATE = 'damage_create',
  DAMAGE_UPDATE = 'damage_update',
  DAMAGE_DELETE = 'damage_delete',
  DAMAGE_STATUS = 'damage_status',

  // Purchase Permissions
  PURCHASE_LIST = 'purchase_list',
  PURCHASE_CREATE = 'purchase_create',
  PURCHASE_UPDATE = 'purchase_update',
  PURCHASE_DELETE = 'purchase_delete',
  PURCHASE_STATUS = 'purchase_status',

  // Purchase Return Permissions
  PURCHASE_RETURN_LIST = 'purchase_return_list',
  PURCHASE_RETURN_CREATE = 'purchase_return_create',
  PURCHASE_RETURN_UPDATE = 'purchase_return_update',
  PURCHASE_RETURN_DELETE = 'purchase_return_delete',
  PURCHASE_RETURN_STATUS = 'purchase_return_status',

  // Account Permissions
  ACCOUNT_LIST = 'account_list',
  ACCOUNT_CREATE = 'account_create',
  ACCOUNT_UPDATE = 'account_update',
  ACCOUNT_DELETE = 'account_delete',
  ACCOUNT_STATUS = 'account_status',

  // Deposit Category Permissions
  DEPOSIT_CATEGORY_LIST = 'deposit_category_list',
  DEPOSIT_CATEGORY_CREATE = 'deposit_category_create',
  DEPOSIT_CATEGORY_UPDATE = 'deposit_category_update',
  DEPOSIT_CATEGORY_DELETE = 'deposit_category_delete',
  DEPOSIT_CATEGORY_STATUS = 'deposit_category_status',

  // Deposit Permissions
  DEPOSIT_LIST = 'deposit_list',
  DEPOSIT_CREATE = 'deposit_create',
  DEPOSIT_UPDATE = 'deposit_update',
  DEPOSIT_DELETE = 'deposit_delete',
  DEPOSIT_STATUS = 'deposit_status',

  // Expense Category Permissions
  EXPENSE_CATEGORY_LIST = 'expense_category_list',
  EXPENSE_CATEGORY_CREATE = 'expense_category_create',
  EXPENSE_CATEGORY_UPDATE = 'expense_category_update',
  EXPENSE_CATEGORY_DELETE = 'expense_category_delete',
  EXPENSE_CATEGORY_STATUS = 'expense_category_status',

  // Expense Permissions
  EXPENSE_LIST = 'expense_list',
  EXPENSE_CREATE = 'expense_create',
  EXPENSE_UPDATE = 'expense_update',
  EXPENSE_DELETE = 'expense_delete',
  EXPENSE_STATUS = 'expense_status',

  // Fund Transfer Permissions
  FUND_TRANSFER_LIST = 'fund_transfer_list',
  FUND_TRANSFER_CREATE = 'fund_transfer_create',
  FUND_TRANSFER_UPDATE = 'fund_transfer_update',
  FUND_TRANSFER_DELETE = 'fund_transfer_delete',
  FUND_TRANSFER_STATUS = 'fund_transfer_status',

  // Department Permissions
  DEPARTMENT_LIST = 'department_list',
  DEPARTMENT_CREATE = 'department_create',
  DEPARTMENT_UPDATE = 'department_update',
  DEPARTMENT_DELETE = 'department_delete',
  DEPARTMENT_STATUS = 'department_status',

  // Leave Type Permissions
  LEAVE_TYPE_LIST = 'leave_type_list',
  LEAVE_TYPE_CREATE = 'leave_type_create',
  LEAVE_TYPE_UPDATE = 'leave_type_update',
  LEAVE_TYPE_DELETE = 'leave_type_delete',
  LEAVE_TYPE_STATUS = 'leave_type_status',

  // Leave Request Permissions
  LEAVE_REQUEST_LIST = 'leave_request_list',
  LEAVE_REQUEST_CREATE = 'leave_request_create',
  LEAVE_REQUEST_UPDATE = 'leave_request_update',
  LEAVE_REQUEST_DELETE = 'leave_request_delete',
  LEAVE_REQUEST_STATUS = 'leave_request_status',

  // Leave Payroll Permissions
  LEAVE_PAYROLL_LIST = 'leave_payroll_list',
  LEAVE_PAYROLL_CREATE = 'leave_payroll_create',
  LEAVE_PAYROLL_UPDATE = 'leave_payroll_update',
  LEAVE_PAYROLL_DELETE = 'leave_payroll_delete',
  LEAVE_PAYROLL_STATUS = 'leave_payroll_status',

  // Orders Permissions
  ORDERS_LIST = 'orders_list',
  ORDERS_CREATE = 'orders_create',
  ORDERS_UPDATE = 'orders_update',
  ORDERS_DELETE = 'orders_delete',
  ORDERS_STATUS = 'orders_status',

  // Customer Permissions
  CUSTOMER_LIST = 'customer_list',
  CUSTOMER_CREATE = 'customer_create',
  CUSTOMER_UPDATE = 'customer_update',
  CUSTOMER_DELETE = 'customer_delete',
  CUSTOMER_STATUS = 'customer_status',

  // Review Permissions
  REVIEW_LIST = 'review_list',
  REVIEW_CREATE = 'review_create',
  REVIEW_UPDATE = 'review_update',
  REVIEW_DELETE = 'review_delete',
  REVIEW_STATUS = 'review_status',

  // Wishlist Permissions
  WISHLIST_LIST = 'wishlist_list',
  WISHLIST_CREATE = 'wishlist_create',
  WISHLIST_UPDATE = 'wishlist_update',
  WISHLIST_DELETE = 'wishlist_delete',
  WISHLIST_STATUS = 'wishlist_status',

  // Comment Permissions
  COMMENT_LIST = 'comment_list',
  COMMENT_CREATE = 'comment_create',
  COMMENT_UPDATE = 'comment_update',
  COMMENT_DELETE = 'comment_delete',
  COMMENT_STATUS = 'comment_status',

  // Supplier Permissions
  SUPPLIER_LIST = 'supplier_list',
  SUPPLIER_CREATE = 'supplier_create',
  SUPPLIER_UPDATE = 'supplier_update',
  SUPPLIER_DELETE = 'supplier_delete',
  SUPPLIER_STATUS = 'supplier_status',

  // Employee Permissions
  EMPLOYEE_LIST = 'employee_list',
  EMPLOYEE_CREATE = 'employee_create',
  EMPLOYEE_UPDATE = 'employee_update',
  EMPLOYEE_DELETE = 'employee_delete',
  EMPLOYEE_STATUS = 'employee_status',

  // Others Permissions
  //  MANAGE_CONFIGURATIONS = 'manage-configurations',
}

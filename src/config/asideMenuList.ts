export const asideBarMenuList = [
  {
    title: 'Dashboard',
    link: '/',
    icon: 'si:dashboard-vert-line',
    child: [],
  },
  {
    title: 'Order',
    link: '',
    icon: 'iconoir:shop-four-tiles',
    child: [
      {
        title: 'Manage Order',
        link: '/manage-order',
        icon: 'lucide:package',
      },
      {
        title: 'Incomplete Order',
        link: '/incomplete-orders',
        icon: 'lucide:package',
      },
    ],
  },
  {
    title: 'Inventory',
    link: '',
    icon: 'lucide:package', //'mynaui:brand-codepen',
    child: [
      {
        title: 'Product',
        link: '/product',
        icon: 'lucide:package',
      },
      {
        title: 'Category',
        link: '/category',
        icon: 'material-symbols:category-outline-rounded',
      },
      {
        title: 'Brands',
        link: '/brands',
        icon: 'tabler:brand-xbox',
      },
      {
        title: 'Attributes',
        link: '/attributes',
        icon: 'flowbite:cell-attributes-outline',
      },
      {
        title: 'Coupons',
        link: '/coupons',
        icon: 'lsicon:coupon-outline',
      },
      {
        title: 'Tags',
        link: '/tags',
        icon: 'flowbite:cell-attributes-outline',
      },
      {
        title: 'Damage',
        link: '/damage',
        icon: 'hugeicons:return-request',
      },
    ],
  },

  {
    title: 'Purchase',
    link: '',
    icon: 'lucide:shopping-bag',
    child: [
      {
        title: 'Purchase',
        link: '/purchase',
        icon: 'lucide:shopping-bag',
      },
      {
        title: 'Purchase Return',
        link: '/purchase-return',
        icon: 'lucide:shopping-bag',
      },
    ],
  },
  {
    title: 'User',
    link: '',
    icon: 'lucide:user',
    child: [
      {
        title: 'Customer',
        link: '/customers',
        icon: 'lucide:users',
      },
      {
        title: 'Supplier',
        link: '/suppliers',
        icon: 'lucide:users',
      },
    ],
  },
  {
    title: 'Accounts',
    link: '',
    icon: 'lucide:wallet',
    child: [
      {
        title: 'Account',
        link: '/accounts',
        icon: '',
      },
      {
        title: 'Deposit Category',
        link: '/deposit-category',
        icon: '',
      },
      {
        title: 'Expense Category',
        link: '/expense-category',
        icon: '',
      },
      {
        title: 'Deposit',
        link: '/deposit',
        icon: '',
      },
      {
        title: 'Expense',
        link: '/expense',
        icon: '',
      },
      {
        title: 'Fund Transfer',
        link: '/fund-transfer',
        icon: '',
      },
    ],
  },
  {
    title: 'HRM',
    link: '',
    icon: 'lucide:user-round-cog',
    child: [
      {
        title: 'Employee',
        link: '/employee',
        icon: '',
      },
      {
        title: 'Department',
        link: '/department',
        icon: '',
      },
      {
        title: 'Leave Type',
        link: '/leave-type',
        icon: '',
      },
      {
        title: 'Leave Request',
        link: '/leave-request',
        icon: '',
      },
      {
        title: 'Payroll',
        link: '/payroll',
        icon: '',
      },
      {
        title: 'Roles',
        link: '/roles',
        icon: '',
      },
      {
        title: 'Sales Performance',
        link: '/staff-sales-performance',
        icon: '',
      },
    ],
  },
  {
    title: 'Reports',
    link: '',
    icon: 'iconoir:reports',
    child: [
      {
        title: 'Stock Report',
        link: '/stock-report',
        icon: 'lsicon:management-stockout-outline',
      },
      {
        title: 'Sales Report',
        link: '/sales-report',
        icon: 'lucide:badge-dollar-sign',
      },
    ],
  },
  {
    title: 'Landing Page',
    link: '/landing-ui',
    icon: 'lucide:pen-tool',
    child: [],
  },
  {
    title: 'Store UI',
    link: '',
    icon: 'lucide:tv-minimal',
    child: [
      {
        title: 'Ticker',
        link: '/ticker',
        icon: 'mdi-light:tag',
      },
      {
        title: 'Hero',
        link: '/hero',
        icon: 'ph:layout-light',
      },
      {
        title: 'Section',
        link: '/section',
        icon: 'mynaui:box',
      },
      {
        title: 'Style',
        link: '/style',
        icon: 'ic:outline-palette',
      },
      {
        title: 'Footer',
        link: '/footer',
        icon: 'lucide:panel-bottom',
      },
      {
        title: 'Page builder',
        link: '/page-builder',
        icon: 'flowbite:cell-attributes-outline',
      },
    ],
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: 'uil:setting',
    child: [
      {
        title: 'Reviews',
        link: '/settings/reviews',
        icon: '',
      },
      {
        title: 'News Letter',
        link: '/settings/news-letter',
        icon: '',
      },
      {
        title: 'Blog',
        link: '/settings/blog',
        icon: '',
      },
      {
        title: 'SMS',
        link: '/settings/sms',
        icon: '',
      },
      {
        title: 'Site Settings',
        link: '/settings/site-settings',
        icon: '',
      },
    ],
  },
  // {
  //   title: 'Support',
  //   link: '/support',
  //   icon: 'ic:baseline-support-agent',
  //   child: [],
  // },
];

export const FUND_TRANSFER = {
    GET: {
      URL: '/fundtransfers', //per_page=10&sort_column=id&sort_direction=desc&search=
      TAGS: ['FUND_TRANSFER', 'ACCOUNTS'],
    },
    POST: '/fundtransfers',
  
    PUT: {
      FUND_TRANSFER_UPDATE: '/fundtransfers', // :id
    },
    DELETE: '/fundtransfers', // :id,
  };
  
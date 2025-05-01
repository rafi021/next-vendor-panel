import EmptyTableData from '@/components/common/EmptyTableData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Box, Calendar } from 'lucide-react';
import Link from 'next/link';
import SmsSummaryTable from './SmsSummaryTable';

const SmsSummaryPageWrapper = () => {
  return (
    <div>
      <div className="py-space16 space-x-space12">
        <Button className="rounded-full text-sm font-medium" type="button">
          SMS Settings
        </Button>
        <Link href={'/settings/sms/sms-templates'}>
          <Button
            className="border-none bg-transparent text-sm font-medium"
            variant={'white'}
            type="button"
          >
            SMS Templates
          </Button>
        </Link>
      </div>
      <div className="space-y-space16 pb-space16">
        <Card className="py-space8 px-space16 bg-gradient-primary">
          <div className="border-b border-gray-200 xl:px-space6 xl:py-space12  grid grid-cols-1 gap-space16 lg:grid-cols-3">
            <div className="space-y-space8 lg:border-r border-gray-300 px-space12">
              <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25 7.75H5.25833M9 7.75H9.00833M12.75 7.75H12.7583M7.25 15L8.46667 16.6222C8.6476 16.8635 8.73807 16.9841 8.84897 17.0272C8.94611 17.065 9.05389 17.065 9.15103 17.0272C9.26193 16.9841 9.3524 16.8635 9.53333 16.6222L10.75 15C10.9943 14.6743 11.1164 14.5114 11.2654 14.3871C11.4641 14.2213 11.6986 14.104 11.9504 14.0446C12.1393 14 12.3429 14 12.75 14C13.9149 14 14.4973 14 14.9567 13.8097C15.5693 13.556 16.056 13.0693 16.3097 12.4567C16.5 11.9973 16.5 11.4149 16.5 10.25V5.5C16.5 4.09987 16.5 3.3998 16.2275 2.86502C15.9878 2.39462 15.6054 2.01217 15.135 1.77248C14.6002 1.5 13.9001 1.5 12.5 1.5H5.5C4.09987 1.5 3.3998 1.5 2.86502 1.77248C2.39462 2.01217 2.01217 2.39462 1.77248 2.86502C1.5 3.3998 1.5 4.09987 1.5 5.5V10.25C1.5 11.4149 1.5 11.9973 1.6903 12.4567C1.94404 13.0693 2.43072 13.556 3.04329 13.8097C3.50272 14 4.08515 14 5.25 14C5.65715 14 5.86072 14 6.04959 14.0446C6.30141 14.104 6.53593 14.2213 6.73458 14.3871C6.88357 14.5114 7.00571 14.6743 7.25 15ZM5.66667 7.75C5.66667 7.98012 5.48012 8.16667 5.25 8.16667C5.01988 8.16667 4.83333 7.98012 4.83333 7.75C4.83333 7.51988 5.01988 7.33333 5.25 7.33333C5.48012 7.33333 5.66667 7.51988 5.66667 7.75ZM9.41667 7.75C9.41667 7.98012 9.23012 8.16667 9 8.16667C8.76988 8.16667 8.58333 7.98012 8.58333 7.75C8.58333 7.51988 8.76988 7.33333 9 7.33333C9.23012 7.33333 9.41667 7.51988 9.41667 7.75ZM13.1667 7.75C13.1667 7.98012 12.9801 8.16667 12.75 8.16667C12.5199 8.16667 12.3333 7.98012 12.3333 7.75C12.3333 7.51988 12.5199 7.33333 12.75 7.33333C12.9801 7.33333 13.1667 7.51988 13.1667 7.75Z"
                      stroke="#00875A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                AVAILABLE SMS
              </div>

              <article className="flex items-center gap-space6">
                <p className=" text-black text-md xl:text-xl font-semibold">
                  100
                </p>
              </article>
            </div>

            <div className="space-y-space8 lg:border-r border-gray-300 px-space12">
              <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
                <span>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.58301 7.75H4.59134M8.33301 7.75H8.34134M12.083 7.75H12.0913M6.58301 15L7.79967 16.6222C7.98061 16.8635 8.07107 16.9841 8.18198 17.0272C8.27912 17.065 8.38689 17.065 8.48404 17.0272C8.59494 16.9841 8.68541 16.8635 8.86634 16.6222L10.083 15C10.3273 14.6743 10.4494 14.5114 10.5984 14.3871C10.7971 14.2213 11.0316 14.104 11.2834 14.0446C11.4723 14 11.6759 14 12.083 14C13.2479 14 13.8303 14 14.2897 13.8097C14.9023 13.556 15.389 13.0693 15.6427 12.4567C15.833 11.9973 15.833 11.4149 15.833 10.25V5.5C15.833 4.09987 15.833 3.3998 15.5605 2.86502C15.3208 2.39462 14.9384 2.01217 14.468 1.77248C13.9332 1.5 13.2331 1.5 11.833 1.5H4.83301C3.43288 1.5 2.73281 1.5 2.19803 1.77248C1.72763 2.01217 1.34517 2.39462 1.10549 2.86502C0.833008 3.3998 0.833008 4.09987 0.833008 5.5V10.25C0.833008 11.4149 0.833008 11.9973 1.02331 12.4567C1.27704 13.0693 1.76373 13.556 2.3763 13.8097C2.83573 14 3.41815 14 4.58301 14C4.99016 14 5.19373 14 5.3826 14.0446C5.63442 14.104 5.86894 14.2213 6.06759 14.3871C6.21657 14.5114 6.33872 14.6743 6.58301 15ZM4.99967 7.75C4.99967 7.98012 4.81313 8.16667 4.58301 8.16667C4.35289 8.16667 4.16634 7.98012 4.16634 7.75C4.16634 7.51988 4.35289 7.33333 4.58301 7.33333C4.81313 7.33333 4.99967 7.51988 4.99967 7.75ZM8.74967 7.75C8.74967 7.98012 8.56313 8.16667 8.33301 8.16667C8.10289 8.16667 7.91634 7.98012 7.91634 7.75C7.91634 7.51988 8.10289 7.33333 8.33301 7.33333C8.56313 7.33333 8.74967 7.51988 8.74967 7.75ZM12.4997 7.75C12.4997 7.98012 12.3131 8.16667 12.083 8.16667C11.8529 8.16667 11.6663 7.98012 11.6663 7.75C11.6663 7.51988 11.8529 7.33333 12.083 7.33333C12.3131 7.33333 12.4997 7.51988 12.4997 7.75Z"
                      stroke="#FF920F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                TOTAL SMS SENT
              </div>

              <article className="flex items-center gap-space6">
                <p className=" text-black text-md xl:text-xl font-semibold">
                  50{' '}
                </p>
              </article>
            </div>

            <div className="space-y-space8 px-space12 pt-space16 lg:pt-0">
              <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
                <span>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.58301 7.75H4.59134M8.33301 7.75H8.34134M12.083 7.75H12.0913M6.58301 15L7.79967 16.6222C7.98061 16.8635 8.07107 16.9841 8.18198 17.0272C8.27912 17.065 8.38689 17.065 8.48404 17.0272C8.59494 16.9841 8.68541 16.8635 8.86634 16.6222L10.083 15C10.3273 14.6743 10.4494 14.5114 10.5984 14.3871C10.7971 14.2213 11.0316 14.104 11.2834 14.0446C11.4723 14 11.6759 14 12.083 14C13.2479 14 13.8303 14 14.2897 13.8097C14.9023 13.556 15.389 13.0693 15.6427 12.4567C15.833 11.9973 15.833 11.4149 15.833 10.25V5.5C15.833 4.09987 15.833 3.3998 15.5605 2.86502C15.3208 2.39462 14.9384 2.01217 14.468 1.77248C13.9332 1.5 13.2331 1.5 11.833 1.5H4.83301C3.43288 1.5 2.73281 1.5 2.19803 1.77248C1.72763 2.01217 1.34517 2.39462 1.10549 2.86502C0.833008 3.3998 0.833008 4.09987 0.833008 5.5V10.25C0.833008 11.4149 0.833008 11.9973 1.02331 12.4567C1.27704 13.0693 1.76373 13.556 2.3763 13.8097C2.83573 14 3.41815 14 4.58301 14C4.99016 14 5.19373 14 5.3826 14.0446C5.63442 14.104 5.86894 14.2213 6.06759 14.3871C6.21657 14.5114 6.33872 14.6743 6.58301 15ZM4.99967 7.75C4.99967 7.98012 4.81313 8.16667 4.58301 8.16667C4.35289 8.16667 4.16634 7.98012 4.16634 7.75C4.16634 7.51988 4.35289 7.33333 4.58301 7.33333C4.81313 7.33333 4.99967 7.51988 4.99967 7.75ZM8.74967 7.75C8.74967 7.98012 8.56313 8.16667 8.33301 8.16667C8.10289 8.16667 7.91634 7.98012 7.91634 7.75C7.91634 7.51988 8.10289 7.33333 8.33301 7.33333C8.56313 7.33333 8.74967 7.51988 8.74967 7.75ZM12.4997 7.75C12.4997 7.98012 12.3131 8.16667 12.083 8.16667C11.8529 8.16667 11.6663 7.98012 11.6663 7.75C11.6663 7.51988 11.8529 7.33333 12.083 7.33333C12.3131 7.33333 12.4997 7.51988 12.4997 7.75Z"
                      stroke="#FF920F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                TOTAL COST
              </div>

              <article className="flex items-center gap-space6">
                <p className=" text-black text-md xl:text-xl font-semibold">
                  ৳500
                </p>
                <span className="flex items-center text-gray-500 text-xs xl:text-sm">
                  {'৳0.30/SMS'}
                </span>
              </article>
            </div>
          </div>
          <div className="py-space16 flex items-center">
            <div className="space-y-space8 px-space12">
              <div className="flex items-center gap-space8 text-gray-500 text-xs xl:text-sm font-medium">
                <span>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.58301 7.75H4.59134M8.33301 7.75H8.34134M12.083 7.75H12.0913M6.58301 15L7.79967 16.6222C7.98061 16.8635 8.07107 16.9841 8.18198 17.0272C8.27912 17.065 8.38689 17.065 8.48404 17.0272C8.59494 16.9841 8.68541 16.8635 8.86634 16.6222L10.083 15C10.3273 14.6743 10.4494 14.5114 10.5984 14.3871C10.7971 14.2213 11.0316 14.104 11.2834 14.0446C11.4723 14 11.6759 14 12.083 14C13.2479 14 13.8303 14 14.2897 13.8097C14.9023 13.556 15.389 13.0693 15.6427 12.4567C15.833 11.9973 15.833 11.4149 15.833 10.25V5.5C15.833 4.09987 15.833 3.3998 15.5605 2.86502C15.3208 2.39462 14.9384 2.01217 14.468 1.77248C13.9332 1.5 13.2331 1.5 11.833 1.5H4.83301C3.43288 1.5 2.73281 1.5 2.19803 1.77248C1.72763 2.01217 1.34517 2.39462 1.10549 2.86502C0.833008 3.3998 0.833008 4.09987 0.833008 5.5V10.25C0.833008 11.4149 0.833008 11.9973 1.02331 12.4567C1.27704 13.0693 1.76373 13.556 2.3763 13.8097C2.83573 14 3.41815 14 4.58301 14C4.99016 14 5.19373 14 5.3826 14.0446C5.63442 14.104 5.86894 14.2213 6.06759 14.3871C6.21657 14.5114 6.33872 14.6743 6.58301 15ZM4.99967 7.75C4.99967 7.98012 4.81313 8.16667 4.58301 8.16667C4.35289 8.16667 4.16634 7.98012 4.16634 7.75C4.16634 7.51988 4.35289 7.33333 4.58301 7.33333C4.81313 7.33333 4.99967 7.51988 4.99967 7.75ZM8.74967 7.75C8.74967 7.98012 8.56313 8.16667 8.33301 8.16667C8.10289 8.16667 7.91634 7.98012 7.91634 7.75C7.91634 7.51988 8.10289 7.33333 8.33301 7.33333C8.56313 7.33333 8.74967 7.51988 8.74967 7.75ZM12.4997 7.75C12.4997 7.98012 12.3131 8.16667 12.083 8.16667C11.8529 8.16667 11.6663 7.98012 11.6663 7.75C11.6663 7.51988 11.8529 7.33333 12.083 7.33333C12.3131 7.33333 12.4997 7.51988 12.4997 7.75Z"
                      stroke="#FF920F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-gray-500 text-nowrap">AVAILABLE BALANCE</p>
              </div>
              <article className="flex items-center gap-space8">
                <p className=" text-black text-md xl:text-xl font-semibold">
                  ৳90.00
                </p>
              </article>
            </div>
            <div className="w-full space-y-space8">
              <div className="flex items-center gap-space16">
                <Input placeholder="e.g. ৳100" /> <Button>Purchase SMS</Button>
              </div>
              <p className="text-xs font-medium text-gray-500">
                Minimum recharge amount ৳100.00
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-space16 p-space16">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-black">Sms Summary</h2>
            <Button variant={'white'} type="button" className="text-black">
              <Calendar className="w-[16px] h-[16px] text-gray-500" />
              Dec 2024
            </Button>
          </div>

          <div className="py-space12">
            {/* <SmsSummaryTable /> */}

            <EmptyTableData
              title="There is no SMS summery here yet!"
              placeholder={<Box className="w-[90px] h-[90px] text-gray-500" />}
              description="SMS summery will be available here once you start sending SMS to the customer"
              action={null}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SmsSummaryPageWrapper;

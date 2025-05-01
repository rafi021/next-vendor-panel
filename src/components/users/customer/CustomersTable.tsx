'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Image } from '@/components/common/Image';
import {
  Banknote,
  Mail,
  Pencil,
  Phone,
  Power,
  ShoppingBag,
  User,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ICustomerData } from '@/types/customer-interface';
import { CUSTOMERS } from '@/server/services/customer';
import StatusUpdate from '@/components/common/StatusUpdate';
import AddCustomer from './AddCustomer';
import CopyComponent from '@/components/common/CopyComponent';
import PhoneComponent from '@/components/common/PhoneComponent';

const CustomersTable = ({
  customers,
  activePage,
  perPage,
}: {
  customers: ICustomerData;
  activePage: number;
  perPage: number;
}) => {
  const customerSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };

  return (
    <Table className="min-w-[1100px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex items-center gap-space24">
              <span>#</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <User className="h-space16 w-space16" />
              Customer Name
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Phone className="h-space16 w-space16" />
              Phone Number
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Mail className="h-space16 w-space16" />
              Email
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Banknote className="h-space16 w-space16" />
              Paid Amount
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Banknote className="h-space16 w-space16" />
              Due Amount
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <ShoppingBag className="h-space16 w-space16" />
              Orders
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-space4">
              <Power className="h-space16 w-space16" />
              Status
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center justify-end gap-space4">
              <Zap className="h-space16 w-space16" />
              Action
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers?.data?.map(
          (
            {
              id,
              name,
              phone,
              email,
              image,
              orders_count,
              orders_sum_due_amount,
              orders_sum_paid_amount,
              is_active,
            },
            index: number,
          ) => (
            <TableRow key={id}>
              <TableCell>
                <div className="flex flex-wrap gap-space8 items-center line-clamp-1">
                  {customerSerial(index)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-space12">
                  <Image
                    src={image || '/avatar.webp'}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-contain rounded-full"
                    wrapperClasses="h-[36px] max-w-max"
                  />
                  <div className="line-clamp-1">{name}</div>
                </div>
              </TableCell>
              <TableCell>
                {phone ? (
                  <PhoneComponent phoneNumber={phone} />
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>
                {email ? (
                  <CopyComponent value={email}>
                    <span>{email}</span>
                  </CopyComponent>
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell>{orders_sum_paid_amount}</TableCell>
              <TableCell>{orders_sum_due_amount}</TableCell>
              <TableCell>{orders_count}</TableCell>
              <TableCell>
                <StatusUpdate
                  isActive={is_active == 1 ? true : false}
                  url={`${CUSTOMERS.PUT.CUSTOMERS_STATUS_UPDATE}/${id}`}
                  tags={CUSTOMERS.GET.CUSTOMERS.TAGS}
                />
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <AddCustomer
                  title="Edit Deposits Category"
                  data={{
                    id,
                    name,
                    image,
                    phone,
                    email,
                  }}
                >
                  <Button variant="white" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </AddCustomer>
                {/* <DeleteButton
                  url={`${CUSTOMERS.DELETE.CUSTOMERS_DELETE}/${id}`}
                  tags={CUSTOMERS.GET.CUSTOMERS.TAGS}
                /> */}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default CustomersTable;

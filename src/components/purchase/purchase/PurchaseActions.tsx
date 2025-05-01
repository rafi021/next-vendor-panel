import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EllipsisVertical, Pen, Undo2 } from 'lucide-react';
import Link from 'next/link';
import PurchasePaymentDialog from './PurchasePaymentDialog';
import { IPurchase } from '@/types/purchase-interface';
import { IAccount } from '@/types/accounts-interface';

const PurchaseActions = ({
  purchase,
  accounts,
}: {
  purchase: IPurchase;
  accounts?: IAccount[];
}) => {
  // Check if a purchase return exists for this purchase
  const hasReturn = purchase?.purchase_return && purchase?.purchase_return?.id;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <EllipsisVertical size={20} className="hover:cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="p-0 max-w-[162px] text-xs font-normal"
      >
        {purchase?.payment_status === 'due' && (
          <Link href={`/purchase/update/${purchase.id}`}>
            <Button
              size={'sm'}
              variant={'transparent'}
              className="hover:underline hover:bg-green-50 hover:text-green-600 w-full justify-start"
            >
              <Pen size={16} />
              Edit Purchase
            </Button>
          </Link>
        )}

        {(purchase?.payment_status === 'due' ||
          purchase?.payment_status === 'partially_paid') && (
          <PurchasePaymentDialog
            purchase={{
              purchase_id: purchase?.id,
              reference: purchase?.reference,
              grand_total: purchase?.grand_total,
              paid_amount: purchase?.paid_amount,
              notes: purchase?.notes,
            }}
            accounts={accounts || []}
          />
        )}

        {purchase?.payment_status === 'paid' && !hasReturn && (
          <Link href={`/purchase-return/add/${purchase.id}`}>
            <Button
              size={'icon'}
              variant={'transparent'}
              className="hover:underline hover:bg-blue-50 hover:text-blue-600 w-full"
            >
              <Undo2 size={16} />
              Return Purchase
            </Button>
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default PurchaseActions;

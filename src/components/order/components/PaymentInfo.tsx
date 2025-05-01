import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/status-color';

export const PaymentInfoList = ({
  due_amount,
  paid_amount,
  payment_status,
}: {
  due_amount: number;
  paid_amount: number;
  payment_status: string;
}) => {
  return (
    <article className="flex flex-col items-start justify-start gap-space6">
      <section>
        <span className="flex">
          <p>Paid: ৳</p>
          <span>{paid_amount}</span>
        </span>
        <span className="flex">
          <p>Due: ৳</p>
          <span>{due_amount}</span>
        </span>
      </section>
      <section>
        {payment_status && (
          <Badge className={`${getStatusColor(payment_status)} capitalize`}>
            {payment_status.split('_').join(' ')}
          </Badge>
        )}
      </section>
    </article>
  );
};

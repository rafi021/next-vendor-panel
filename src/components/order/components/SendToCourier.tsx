import { Button } from '@/components/ui/button';
import { api } from '@/server/api';
import { ORDERS } from '@/server/services/order';
import { PATHAO } from '@/server/services/pathao';
import { useTransition } from 'react';
import { toast } from 'sonner';

const SendToCourier = ({ orderId }: { orderId: number }) => {
  const [isLoading, startTransition] = useTransition();
  const handleSendToCourier = () =>
    startTransition(async () => {
      const res = await api.post(
        PATHAO.TFANSFER_TO_PATHAO.POST,
        {
          order_id: orderId,
        },
        ORDERS.GET.ORDERS.TAGS,
      );
      // // console.log(res);
      if (res?.success) {
        toast.success(res.message ?? 'Order sent to courier successfully');
        // console.log('success');
      } else {
        toast.error('Failed to send order to courier');
        // console.log('error');
      }
    });

  return (
    <Button
      size={'sm'}
      disabled={isLoading}
      loader={isLoading}
      onClick={handleSendToCourier}
    >
      Send to Courier
    </Button>
  );
};

export default SendToCourier;

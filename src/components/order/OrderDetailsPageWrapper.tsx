import OrderDetailsSection from './components/OrderDetailsSection';
import { Order } from '@/types/order-interface';

const OrderDetailsPageWrapper = async ({ order }: { order: Order }) => {
  return (
    <div className="grid grid-cols-3 mt-space16 bg-white overflow-hidden rounded-lg">
      <OrderDetailsSection order={order} />
    </div>
  );
};

export default OrderDetailsPageWrapper;

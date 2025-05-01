import { useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { UseFormReturn } from 'react-hook-form';
import { OrderSchemaDef } from '@/schemas/order/order-schema';

export const CaringCostWatcher = ({
  form,
}: {
  form: UseFormReturn<OrderSchemaDef>;
}) => {
  const { cartProducts } = useProductStore();

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.show_price,
    0,
  );

  const city = useProductStore((s) => s.customerAddress.city?.id);
  const zone = useProductStore((s) => s.customerAddress.zone?.id);
  const area = useProductStore((s) => s.customerAddress.area?.id);
  const cart = useProductStore((s) => s.cartProducts);
  const setRecheck = useProductStore((s) => s.setCaringCostReCheck);

  const locationTypeShippingCost = form.watch('location_type');
  const discountAmount =
    form.watch('discount_type') === 'fixed'
      ? Number(form.watch('discount'))
      : (Number(totalPrice) * Number(form.watch('discount'))) / 100;

  useEffect(() => {
    setRecheck(locationTypeShippingCost ?? '', discountAmount); // safely call it when any of these changes
  }, [
    city,
    zone,
    area,
    cart,
    locationTypeShippingCost,
    totalPrice,
    discountAmount,
  ]);

  return null; // this is a logic-only component
};

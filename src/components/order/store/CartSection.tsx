'use client';
import { Diameter, Trash2, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { formatVariationTitle } from '@/utils/string';
import InputAdjust from '@/components/common/forms/InputAdjust';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartProductDef, useProductStore } from '@/stores/useProductStore';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { OrderSchemaDef } from '@/schemas/order/order-schema';
import { api } from '@/server/api';
import { ORDERS } from '@/server/services/order';
import { toast } from 'sonner';
import { useEffect, useTransition } from 'react';
import { DeliveryFeeType } from '@/types/order-interface';

type caringCostData = {
  price: number;
  discount: number;
  promo_discount: number;
  plan_id: number;
  cod_enabled: number;
  cod_percentage: number;
  additional_charge: number;
  final_price: number;
};
type payload = {
  item_weight?: number;
  recipient_city?: string | number | null;
  recipient_zone?: string | number | null;
};

interface IProps {
  form: UseFormReturn<OrderSchemaDef>;
  deliveryFee: DeliveryFeeType;
}

const CartSection = ({ form, deliveryFee }: IProps) => {
  const {
    cartProducts,
    updateCartProducts,
    removeCartProduct,
    customerAddress,
    clearCartProducts,
    productsFromApi,
    isCaringCostReCheck,
    clearCaringCostReCheck,
  } = useProductStore();

  const [isPending, startTransition] = useTransition();

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.show_price,
    0,
  );

  const totalWeight = cartProducts.reduce(
    (sum, item) => sum + Number((item.quantity * item.weight).toFixed(1)),
    0,
  );

  const handleQuantity = (value: number, product: CartProductDef) => {
    const payload = {
      ...product,
      product_id: product.product_id,
      quantity: value,
      show_price: product.price * value,
      weight: product.weight,
    };
    updateCartProducts(payload);
  };

  const handleCaringCostCal = async () => {
    if (customerAddress.city?.id === '') {
      toast.error('City is required');
      return;
    }
    if (customerAddress.zone?.id === '') {
      toast.error('Zone is required');
      return;
    }
    if (totalWeight <= 0) {
      toast.error('An item is required');
      return;
    }
    const payload = {
      item_weight: totalWeight,
      recipient_city: customerAddress.city?.id ?? '',
      recipient_zone: customerAddress.zone?.id ?? '',
    };
    // // console.log('payload', payload);
    const res = startTransition(async () => {
      const res = await api.post<payload, ApiResponse<caringCostData, null>>(
        ORDERS.POST.GET_ORDER_CARING_COST,
        payload,
      );
      // // console.log('res ', res);
      if (res.success) {
        form.setValue(
          'courier_cost',
          String(Number(res.data.final_price) + grandTotal * 0.01),
        );
        clearCaringCostReCheck();
        toast.success('Success');
      } else {
        toast.warning('Error calculating caring cost!' + res.message);
      }
    });
    // // console.log(res);
  };

  const discountRaw = form.watch('discount');
  const discountType = form.watch('discount_type') ?? 'fixed';
  const discountValue = Number(discountRaw);
  const total = Number(totalPrice);

  // // console.log('discount type => ', discountType);

  const discountAmount =
    discountType === 'fixed'
      ? isNaN(discountValue)
        ? 0
        : discountValue
      : isNaN(discountValue) || isNaN(total)
        ? 0
        : (total * discountValue) / 100;

  const finalPrice = Number(totalPrice) - discountAmount;

  const type = form.watch('location_type');
  const fee = form.watch('delivery_fee');

  const grandTotal =
    Number(finalPrice) +
    Number(fee ?? 0) +
    (Number(form.watch('sales_tax') ?? 0) / 100) * Number(totalPrice);

  useEffect(() => {
    return () => {
      clearCartProducts();
    };
  }, []);

  // // console.log('productsFromApi', productsFromApi);

  // // console.log('location ', type);
  // // console.log('location ', fee);

  const getSellType = (id: number | undefined) => {
    const product = productsFromApi.find((p) => p.id === id);
    return product?.sales_type ?? 'up_sell';
  };

  useEffect(() => {
    const [name, cost] = type?.split('/') ?? [];

    if (!fee || fee === '' || isNaN(Number(fee))) {
      form.setValue('delivery_fee', cost);
    }
  }, [type, form, deliveryFee]);

  // // console.log({ type, fee, deliveryFee });

  return (
    <div className="h-full flex flex-col justify-between gap-space16">
      <div>
        <CardHeader className="p-space12">
          <CardTitle className="border-b pb-space12 border-gray-200 flex justify-between items-center">
            <p className="text-md font-semibold">
              Cart ({cartProducts.length})
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="!px-space12 pt-0 max-h-[calc(100vh-480px)] overflow-y-auto">
          <div className="space-y-space12">
            {cartProducts.map((product, index) => (
              <div
                key={
                  product.variation?.id ||
                  product?.product_id ||
                  product?.id ||
                  '' + index + product.name
                }
                className="border border-gray-200 rounded-lg p-space12"
              >
                <div className="flex gap-space16 items-start justify-between pb-space6">
                  <div className="flex items-start gap-space8">
                    <Image
                      src={product.image}
                      unoptimized
                      alt="image"
                      height={40}
                      width={40}
                      sizes="100vw"
                      className="h-full w-full object-contain"
                      wrapperClasses="border border-gray-100 rounded-md h-[40px] w-[40px] max-h-[40px] max-w-[40px]"
                    />
                    <article className="">
                      <span className="font-semibold">{product.name}</span>
                      {product.variation && (
                        <article className="flex gap-space8 text-xs my-[2px]">
                          {formatVariationTitle(
                            product?.variation?.title ?? '',
                          )?.map((val) => <Badge key={val}>{val}</Badge>)}
                        </article>
                      )}
                      <p>
                        <span className="text-gray-500">Weight: </span>
                        {(product.weight * product.quantity).toFixed(1)}
                        KG
                      </p>

                      {!product.variation && (
                        <p>
                          <span className="text-gray-500">Stock: </span>
                          {product.stock}
                        </p>
                      )}
                    </article>
                  </div>
                  <div className="">
                    <div className="flex gap-space6 items-center">
                      <span className="font-medium">৳{product.show_price}</span>
                      {getSellType(product.id) === 'up_sell' && (
                        <Badge variant={'success-outline'}>Upsell</Badge>
                      )}
                    </div>
                    {product.variation && (
                      <p>
                        <span className="text-gray-500">Stock: </span>
                        {product.stock}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space8 text-xs border-t border-gray-200 font-medium">
                  <Button
                    size={'icon'}
                    type="button"
                    variant={'danger-outline'}
                    className="!border-none h-space24 w-space24"
                    onClick={() => removeCartProduct(product)}
                  >
                    <Trash2 size={14} />
                  </Button>

                  <InputAdjust
                    wrapperClasses="max-w-[140px] "
                    value={String(product.quantity)}
                    onChange={(value) => handleQuantity(Number(value), product)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <div className="">
        <div className="p-space16 space-y-space6">
          <div className="flex justify-between gap-space16 items-center text-sm text-black">
            Subtotal
            <div className="flex flex-col items-center space-y-2">
              <div className="relative flex items-center gap-space8">
                <span className="text-md">৳</span>
                <Input
                  readOnly
                  value={totalPrice}
                  className="max-w-[100px] h-[28px]"
                />
              </div>
              {discountAmount > 0 && (
                <span className="text-xs text-amber-600">
                  Discount: {discountAmount}
                </span>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="delivery_fee"
            render={({ field }) => (
              <FormItem className="flex justify-between gap-space16 items-center text-sm text-black">
                Shipping
                <FormControl>
                  <div className="flex items-center gap-space8">
                    <span className="text-md">৳</span>
                    <Input
                      {...field}
                      value={field.value}
                      className="max-w-[100px] h-[28px]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sales_tax"
            render={({ field }) => (
              <FormItem className="flex justify-between gap-space16 items-center text-sm text-black">
                Vat(%)
                <FormControl>
                  <div className="flex items-center gap-space8">
                    <span className="text-md">%</span>
                    <Input
                      {...field}
                      value={field.value ?? '0'}
                      className="max-w-[100px] h-[28px]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-space16 items-center text-sm text-black">
            Caring Cost :({totalWeight} KG)
            <FormField
              control={form.control}
              name="courier_cost"
              render={({ field }) => (
                <FormItem className="flex gap-space16 items-center">
                  <Button
                    onClick={handleCaringCostCal}
                    type="button"
                    variant={isCaringCostReCheck ? 'danger' : 'success'}
                    size={'default'}
                    loader={isPending}
                    disabled={isPending}
                    className="h-[28px]"
                  >
                    <Truck size={14} />
                    <span className="text-xs font-medium">Calculate</span>
                  </Button>
                  <FormControl>
                    <div className="relative flex items-center gap-space8">
                      <span className="text-md">৳</span>
                      <Input
                        {...field}
                        value={field.value ?? '0'}
                        className="max-w-[100px] h-[28px] bg-blue-100"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="border-t border-gray-200 px-space12 py-space8 font-semibold text-black">
          Grand Total: ৳ {grandTotal}
          {/* calc with total with tax with percentage */}
        </div>
      </div>
    </div>
  );
};

export default CartSection;

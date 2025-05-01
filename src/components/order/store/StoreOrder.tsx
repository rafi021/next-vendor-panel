'use client';
import UpSell from './UpSell';
import { ICategories } from '@/types/category-interfaces';
import { OrderSchemaDef, useOrderForm } from '@/schemas/order/order-schema';
import CustomerAndOrderDetailsForm from '../components/CustomerAndOrderDetailsForm';
import { useEffect, useTransition } from 'react';
import { api } from '@/server/api';
import { ORDERS } from '@/server/services/order';
import { toast } from 'sonner';
import { useRouter } from 'next-nprogress-bar';
import { Form } from '@/components/ui/form';
import CartSection from './CartSection';
import { Button } from '@/components/ui/button';
import { Customer } from '@/types/accounts-interface';
import Link from 'next/link';
import { IProductData } from '@/types/product-interface';
import { City } from '@/types/address-types';
import { useProductStore } from '@/stores/useProductStore';
import { DeliveryFeeType, Order } from '@/types/order-interface';
import { CaringCostWatcher } from '../components/CaringCostWatcher';

interface IProps {
  deliveryFee: DeliveryFeeType;
  categories: ICategories;
  customers?: Customer[] | [];
  products: IProductData;
  cityList: City[];
  order?: Order;
}

const StoreOrder = ({
  deliveryFee,
  categories,
  customers,
  cityList,
  products,
  order,
}: IProps) => {
  const router = useRouter();
  const { form } = useOrderForm(order);
  const [isLoading, startTransition] = useTransition();
  const {
    cartProducts,
    setCartProducts,
    clearCartProducts,
    customerAddress,
    setCustomerAddress,
    setProductsFromApi,
  } = useProductStore();

  // // console.log({ order });

  function onSubmit(formData: OrderSchemaDef) {
    const products = cartProducts?.map((product) => ({
      product_id: product?.product_id,
      order_quantity: product?.quantity,
      ...(product?.variation && { variation_option_id: product?.variation.id }),
    }));

    const payload = {
      ...formData,
      shipping_address: formData.address,
      customer_id: formData.customer_id ?? '',
      customer_name: formData.name,
      customer_contact: formData.phone,

      location_type: formData?.location_type?.split('/')[0] ?? '',
      city_id: customerAddress?.city?.id,
      zone_id: customerAddress?.zone?.id,
      area_id: customerAddress?.area?.id,
      // new
      city_name: customerAddress.city?.val ?? '',
      zone_name: customerAddress.zone?.val ?? '',
      area_name: customerAddress.area?.val ?? '',

      // billing_address: formData.address,
      products: [...products],
      weight: cartProducts.reduce(
        (sum, item) => sum + Number((item.quantity * item.weight).toFixed(1)),
        0,
      ),
    };
    startTransition(async () => {
      // // console.log('payload', payload);

      if (order) {
        const res = await api.put(
          `${ORDERS.PUT.ORDER_UPDATE.URL}/${order.id}`,
          payload,
          [...ORDERS.GET.ORDERS_DETAILS.TAGS, ...ORDERS.GET.ORDERS.TAGS],
        );

        // // console.log('res', res);

        if (res.success) {
          form.reset();
          toast.success(res.message);
          clearCartProducts();
          setCustomerAddress({
            city: {
              id: '',
              val: '',
            },
            zone: {
              id: '',
              val: '',
            },
            area: {
              id: '',
              val: '',
            },
          });
          router.push('/manage-order');
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(ORDERS.POST.ORDERS_CREATE, payload, [
          ...ORDERS.GET.ORDERS_DETAILS.TAGS,
          ...ORDERS.GET.ORDERS.TAGS,
        ]);
        // // console.log('res', res);

        if (res.success) {
          form.reset();
          clearCartProducts();
          setCustomerAddress({
            city: {
              id: '',
              val: '',
            },
            zone: {
              id: '',
              val: '',
            },
            area: {
              id: '',
              val: '',
            },
          });

          toast.success(res.message);
          // router.back();
          router.push('/manage-order');
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  const customer = order && {
    ...order?.customer,
    address: order?.shipping_address,
    isNew:
      typeof order?.customer?.isNew === 'number'
        ? !!order?.customer?.isNew
        : order?.customer?.isNew,
  };

  useEffect(() => {
    if (order) {
      const cartItems = order?.order_products?.map((product) => {
        return {
          id: product?.id,
          product_id: product?.product_id,
          name: product?.name,
          weight: Number(product?.dimensions?.weight),
          quantity: Number(product.order_quantity),
          stock: product?.stock_quantity ?? 0,

          price: Number(product?.sell_price),
          show_price: Number(product?.sell_price),

          image: product?.thump_image ?? '',
          ...(product?.variation_option_id && {
            variation: {
              id: Number(product?.variation_option_id),
              title: product?.title,
            },
          }),
        };
      });

      setCustomerAddress({
        city: {
          id: order?.city_id,
          val: order?.city_name,
        },
        zone: {
          id: order?.zone_id,
          val: order?.zone_name,
        },
        area: {
          id: order?.area_id,
          val: order?.area_name,
        },
      });

      setCartProducts([...cartItems]);
      setProductsFromApi(
        order.order_products.map((product) => ({
          id: product.id,
          sales_type: product.sales_type,
          quantity: product.order_quantity,
        })),
      );
    } else {
      setCartProducts([]);
      setCustomerAddress({
        city: {
          id: '',
          val: '',
        },
        zone: {
          id: '',
          val: '',
        },
        area: {
          id: '',
          val: '',
        },
      });
      setProductsFromApi([]);
    }
  }, [order]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-space16">
        <div className="grid grid-cols-3 bg-white rounded-lg relative mt-space32">
          <CustomerAndOrderDetailsForm
            form={form}
            customers={customers}
            cityList={cityList}
            customer={customer}
            customer_info={order?.customer_info}
            city_id={order?.city_id}
            zone_id={order?.zone_id}
            area_id={order?.area_id}
            deliveryFee={deliveryFee}
          />

          <UpSell categories={categories} products={products} />

          <CartSection form={form} deliveryFee={deliveryFee} />

          <div className="absolute right-0 -top-[52px] z-10 flex gap-space12">
            <Link href="/manage-order">
              <Button variant={'white'} type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
        <CaringCostWatcher form={form} />
      </form>
    </Form>
  );
};

export default StoreOrder;

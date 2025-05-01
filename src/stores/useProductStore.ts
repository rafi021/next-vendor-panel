import { Combination } from '@/components/inventory/product/store/generateVariations';
import { CustomerAddress } from '@/types/address-types';
import { IAttributeOption } from '@/types/attributes-interface';
import { create } from 'zustand';

export type AttributeFieldDef = {
  id: string;
  name: string;
  options: IAttributeOption[];
  selected_options: string[];
};

export type CartProductDef = {
  id?: number;
  product_id?: number;
  order_id?: number;
  name: string;
  price: number;
  show_price: number;
  stock: number;
  quantity: number;
  image: string;
  weight: number;
  variation?: {
    id?: number;
    title?: string;
  };
};
type ProductsFromApi = {
  id: number;
  sales_type: 'up_sell' | 'organic_sale';
  quantity?: number;
};
type ProductState = {
  variationTableData: Combination[];
  attributeField: AttributeFieldDef[];
  cartProducts: CartProductDef[];
  customerAddress: CustomerAddress;
  productsFromApi: ProductsFromApi[];

  // new ref for check if city, zone, area, cart product or product quantity is changed
  lastCaringCostCalculatedData: {
    city_id: string | number | null;
    zone_id: string | number | null;
    area_id: string | number | null;
    location_type_shipping_cost: string;
    cartProducts: {
      product_id?: number;
      quantity?: number;
      variation?: {
        id?: number;
        title?: string;
      } | null;
    }[];
    discounted_amount: number;
  };

  // flag for isChanged ref
  isCaringCostReCheck: boolean;
};

type ProductActions = {
  setVariationTableData: (params: ProductState['variationTableData']) => void;
  updateVariationTableData: (params: Combination) => void;
  setAttributeField: (params: ProductState['attributeField']) => void;
  setCartProducts: (params: ProductState['cartProducts']) => void;
  updateCartProducts: (params: CartProductDef) => void;
  removeCartProduct: (params: CartProductDef) => void;
  clearCartProducts: () => void;
  setCustomerAddress: (
    updater: CustomerAddress | ((prev: CustomerAddress) => CustomerAddress),
  ) => void;
  setProductsFromApi: (params: ProductState['productsFromApi']) => void;

  // actions for check if city, zone, area is changed or cart items or products and quantity is changed
  setLastCaringCostCalculatedData: (
    locationTypeShippingCost: string,
    discountedAmount: number,
  ) => void;
  clearLastCaringCostCalculatedData: () => void;

  setCaringCostReCheck: (
    locationTypeShippingCost: string,
    discountedAmount: number,
  ) => void;
  clearCaringCostReCheck: () => void;
};

export const useProductStore = create<ProductState & ProductActions>()(
  (set) => ({
    // Initial state-------------------------------------
    variationTableData: [],
    attributeField: [
      {
        id: '',
        name: '',
        options: [],
        selected_options: [],
      },
    ],
    cartProducts: [],
    productsFromApi: [],
    customerAddress: {
      zone: {
        id: '',
        val: '',
      },
      area: {
        id: '',
        val: '',
      },
      city: {
        id: '',
        val: '',
      },
    },
    lastCaringCostCalculatedData: {
      city_id: '',
      zone_id: '',
      area_id: '',
      cartProducts: [],
      location_type_shipping_cost: '',
      discounted_amount: 0,
    },
    isCaringCostReCheck: false,

    // Update state-------------------------------------
    setAttributeField: (params) =>
      set((state) => {
        return { attributeField: params };
      }),

    setVariationTableData: (params) =>
      set((state) => {
        /**
         * To store data if option length is same, but option value changes
         */
        let final = params.map((current) => {
          let match = state.variationTableData.find(
            (item) => item.title === current.title,
          );
          return match ? match : current;
        });

        return { variationTableData: final };
      }),

    updateVariationTableData: (params) =>
      set((state) => {
        const updatedData = state.variationTableData.map((item) => {
          if (item.title === params.title) {
            return params;
          } else {
            return item;
          }
        });

        return { variationTableData: updatedData };
      }),

    // Cart Product Set sates is here ----------------------------------------
    setCartProducts: (params) =>
      set((state) => {
        const newProducts = params.filter((current) =>
          state.cartProducts.every((item) =>
            current.variation
              ? item.variation?.id !== current.variation.id
              : item.product_id !== current.product_id,
          ),
        );

        return { cartProducts: [...state.cartProducts, ...newProducts] };
      }),

    updateCartProducts: (params) =>
      set((state) => {
        const updatedData = state.cartProducts.map((prev) => {
          // Match by variation if it exists, otherwise match by product_id
          if (
            (params.variation && params.variation.id === prev.variation?.id) ||
            (!params.variation && params.product_id === prev.product_id)
          ) {
            return { ...prev, ...params };
          }
          return prev;
        });

        return { cartProducts: updatedData };
      }),
    removeCartProduct: (params) =>
      set((state) => {
        const updatedData = state.cartProducts.filter((prev) => {
          if (params.variation?.id) {
            return params.variation?.id !== prev.variation?.id;
          } else {
            return params.product_id !== prev.product_id;
          }
        });

        return { cartProducts: updatedData };
      }),
    clearCartProducts: () => set(() => ({ cartProducts: [] })),

    setCustomerAddress: (params) =>
      set((state) => ({
        customerAddress: {
          ...state.customerAddress,
          ...params,
        },
      })),

    setProductsFromApi: (params) => set(() => ({ productsFromApi: params })),

    // Actions to track if city, zone, area, or cart items/quantities changed
    setLastCaringCostCalculatedData: (
      locationTypeShippingCost,
      discountedAmount,
    ) =>
      set((state) => ({
        lastCaringCostCalculatedData: {
          city_id: state.customerAddress.city?.id || '',
          zone_id: state.customerAddress.zone?.id || '',
          area_id: state.customerAddress.area?.id || '',
          location_type_shipping_cost: locationTypeShippingCost || '',
          cartProducts: state.cartProducts.map((p) => ({
            product_id: p.product_id,
            quantity: p.quantity,
            variation: p.variation ? { id: p.variation.id } : null,
          })),
          discounted_amount: discountedAmount,
        },
      })),

    clearLastCaringCostCalculatedData: () =>
      set(() => ({
        lastCaringCostCalculatedData: {
          city_id: '',
          zone_id: '',
          area_id: '',
          cartProducts: [],
          location_type_shipping_cost: '',
          discounted_amount: 0,
        },
      })),

    setCaringCostReCheck: (locationTypeShippingCost, discountedAmount) =>
      set((state) => {
        const {
          customerAddress: { city, zone, area },
          cartProducts,
          lastCaringCostCalculatedData,
        } = state;

        const hasAddressChanged =
          city?.id !== lastCaringCostCalculatedData.city_id ||
          zone?.id !== lastCaringCostCalculatedData.zone_id ||
          area?.id !== lastCaringCostCalculatedData.area_id ||
          locationTypeShippingCost !==
            lastCaringCostCalculatedData.location_type_shipping_cost ||
          discountedAmount !== lastCaringCostCalculatedData.discounted_amount;

        const hasCartChanged =
          cartProducts.length !==
            lastCaringCostCalculatedData.cartProducts.length ||
          cartProducts.some((product, i) => {
            const lastProduct = lastCaringCostCalculatedData.cartProducts[i];
            return (
              product.product_id !== lastProduct.product_id ||
              product.quantity !== lastProduct.quantity ||
              (product.variation?.id || '') !==
                (lastProduct.variation?.id || '')
            );
          });

        return {
          isCaringCostReCheck:
            hasAddressChanged || hasCartChanged ? true : false,
        };
      }),

    clearCaringCostReCheck: () =>
      set(() => ({
        isCaringCostReCheck: false,
      })),
  }),
);

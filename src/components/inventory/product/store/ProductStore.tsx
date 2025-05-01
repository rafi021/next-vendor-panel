'use client';
import { toast } from 'sonner';
import { api } from '@/server/api';
import { Layers } from 'lucide-react';
import { Form } from '@/components/ui/form';
import StoreBasicForm from './StoreBasicForm';
import { useRouter } from 'next-nprogress-bar';
import { Button } from '@/components/ui/button';
import StoreOthersForm from './StoreOthersForm';
import { ITagsData } from '@/types/tag-interface';
import { PRODUCT } from '@/server/services/product';
import { BrandData } from '@/types/brands-interface';
import React, { useTransition } from 'react';
import BackButton from '@/components/common/back-button';
import StoreProductTypeForm from './StoreProductTypeForm';
import { ICategories } from '@/types/category-interfaces';
import { useProductStore } from '@/stores/useProductStore';
import { IProduct, VariationsDef } from '@/types/product-interface';
import { IProductAttributeData } from '@/types/attributes-interface';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProductSchemaDef, useProductForm } from '@/schemas/inventory/product';
import DeleteButton from '@/components/common/DeleteButton';

export interface IStoreProductProps {
  tags: ITagsData;
  brands: BrandData;
  categories: ICategories;
  attributes: IProductAttributeData;
  product?: IProduct;
  variationsData?: VariationsDef[];
}

const ProductStore = ({
  tags,
  brands,
  categories,
  attributes,
  product,
  variationsData,
}: IStoreProductProps) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const { attributeField, variationTableData } = useProductStore();
  const { form, handleReset, isActiveAction } = useProductForm(product);

  const variations = attributeField.flatMap((options) => {
    return {
      name: options.name,
      values: options.selected_options.map((option) => {
        const value = option.split('_')[1];
        return value;
      }),
      ids: options.selected_options.map((option) => {
        const id = option.split('_')[0];
        return Number(id);
      }),
    };
  });

  const processPayload = variationTableData.map((variation) => {
    return {
      title: variation.title,
      id: variation.id,
      image_url: variation.image_url,
      stock_quantity: Number(variation.stock_quantity),
      purchase_price: Number(variation.purchase_price),
      sell_price: Number(variation.sell_price),
      regular_price: Number(variation.regular_price),
      is_active: variation.is_active ? 1 : 0,

      sku: Math.random().toString(36).substr(2, 9),
      code: '123',
      dimensions: {
        weight: variation.weight,
        // unit: 'kg',
      },
    };
  });
  const processVariablePayload = {
    variations,
    variation_options: processPayload,
  };

  function onSubmit(formData: ProductSchemaDef) {
    const {
      name,
      slug,
      brand_id,
      categories,
      video_url,
      tags,
      gallery,
      is_active,
      product_type,
      short_description,
      long_description,
      specification,
      manage_stock,

      delivery_details,
      estimated_delivery,
      return_policy,
      meta_description,
      meta_keywords,
      page_title,
      url_handle,

      purchase_price,
      regular_price,
      sell_price,
      discounted_price,
      discount_type,
      stock_status,
      stock_quantity,
      sku,
      weight,
      unit,
    } = formData;

    const simplePayload = {
      purchase_price,
      regular_price,
      sell_price,
      discount_type,
      discounted_price,
      stock_status,
      stock_quantity,
      sku,

      dimensions: {
        weight,
        unit,
      },
    };

    const payload = {
      // Basic form data is here
      gallery,
      video_url,
      name,
      slug,
      categories,
      brand_id,
      tags,
      long_description,
      short_description,
      specification,
      is_active,
      product_type,
      manage_stock,
      thump_image: gallery[0],
      // Additional Others data here ---
      metas: [
        {
          key: 'return_policy',
          value: return_policy ?? '',
        },
        {
          key: 'estimated_delivery',
          value: estimated_delivery ?? '',
        },
        {
          key: 'delivery_details',
          value: delivery_details ?? '',
        },
        {
          key: 'meta_description',
          value: meta_description ?? '',
        },
        {
          key: 'meta_keywords',
          value: meta_keywords ?? '',
        },
        {
          key: 'page_title',
          value: page_title ?? '',
        },
        {
          key: 'url_handle',
          value: url_handle ?? '',
        },
      ],

      // If Simple or Variable is here ---
      ...(product_type === 'simple'
        ? { ...simplePayload }
        : { ...processVariablePayload }),
    };

    startTransition(async () => {
      if (product) {
        const res = await api.put(
          `${PRODUCT.PUT.PRODUCT_UPDATE}/${product.id}`,
          payload,
          [...PRODUCT.GET.PRODUCTS.TAGS, ...PRODUCT.GET.PRODUCT_DETAILS.TAGS],
        );

        if (res.success) {
          // form.reset();
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(PRODUCT.POST.PRODUCT_CREATE, payload, [
          ...PRODUCT.GET.PRODUCTS.TAGS,
          ...PRODUCT.GET.PRODUCT_DETAILS.TAGS,
        ]);

        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  return (
    <div className="pb-space16">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <Layers className="w-6 h-6 text-gray-500" />
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">
                  {product ? 'Update' : 'Add'} product
                </h1>
                <p className=" text-gray-500">
                  {product ? 'Update' : 'Create'}
                  Create your product in less than 5 minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent className="lg:p-space24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <StoreBasicForm
                form={form}
                tags={tags}
                brands={brands}
                categories={categories}
              />

              <StoreProductTypeForm
                form={form}
                product={product}
                attributes={attributes}
                variationsData={variationsData}
              />

              <StoreOthersForm form={form} />

              <div className="flex items-center gap-space16 justify-between">
                <div className="flex gap-space16 w-full sm:max-w-[400px]">
                  <Button
                    type="button"
                    variant="white"
                    className="w-full"
                    onClick={handleReset}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    loader={isLoading}
                    disabled={!isActiveAction() || isLoading}
                  >
                    {product ? 'Save Changes' : 'Add to Product'}
                  </Button>
                </div>

                <div className="hidden sm:block">
                  {product && (
                    <DeleteButton
                      tags={PRODUCT.GET.PRODUCTS.TAGS}
                      url={`${PRODUCT.DELETE.PRODUCT_DELETE}/${product.id}`}
                      handleReset={() => router.back()}
                    />
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStore;

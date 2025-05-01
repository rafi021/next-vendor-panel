import React from 'react';
import { api } from '@/server/api';
import { TAGS } from '@/server/services/tags';
import { BRANDS } from '@/server/services/brand';
import { ITagsData } from '@/types/tag-interface';
import { PRODUCT } from '@/server/services/product';
import { BrandData } from '@/types/brands-interface';
import { CATEGORIES } from '@/server/services/category';
import { ATTRIBUTES } from '@/server/services/attributes';
import { ICategories } from '@/types/category-interfaces';
import { IProductAttributeData } from '@/types/attributes-interface';
import { IProduct, VariationsDef } from '@/types/product-interface';
import ProductStore from '@/components/inventory/product/store/ProductStore';

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await api.get<
    ApiResponse<{
      product: IProduct;
      relatedProducts: [];
      variations: VariationsDef[];
    }>
  >(
    `${PRODUCT.GET.PRODUCT_DETAILS.URL}/${id}`,
    PRODUCT.GET.PRODUCT_DETAILS.TAGS,
  );

  const tags = await api.get<ApiResponse<ITagsData>>(TAGS.GET.TAGS.URL);
  const brands = await api.get<ApiResponse<BrandData>>(BRANDS.GET.BRANDS.URL);
  const categories = await api.get<ApiResponse<ICategories>>(
    CATEGORIES.GET.CATEGORIES.URL,
  );
  const attributes = await api.get<ApiResponse<IProductAttributeData>>(
    ATTRIBUTES.GET.ATTRIBUTES.URL,
    ATTRIBUTES.GET.ATTRIBUTES.TAGS,
  );

  return (
    <ProductStore
      tags={tags.data}
      brands={brands.data}
      attributes={attributes.data}
      categories={categories.data}
      product={product.data.product}
      variationsData={product.data.variations}
    />
  );
};

export default EditProductPage;

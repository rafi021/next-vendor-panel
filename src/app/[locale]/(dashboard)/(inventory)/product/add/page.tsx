import React from 'react';
import { api } from '@/server/api';
import { TAGS } from '@/server/services/tags';
import { BRANDS } from '@/server/services/brand';
import { ITagsData } from '@/types/tag-interface';
import { BrandData } from '@/types/brands-interface';
import { CATEGORIES } from '@/server/services/category';
import { ATTRIBUTES } from '@/server/services/attributes';
import { ICategories } from '@/types/category-interfaces';
import { IProductAttributeData } from '@/types/attributes-interface';
import ProductStore from '@/components/inventory/product/store/ProductStore';

const AddProductPage = async () => {
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
    />
  );
};

export default AddProductPage;

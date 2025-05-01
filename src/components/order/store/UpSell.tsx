'use client';
import FilteringSection from './FilteringSection';
import UpsellProductCard from './UpsellProductCard';
import { IProductData } from '@/types/product-interface';
import { ICategories } from '@/types/category-interfaces';

const UpSell = ({
  categories,
  products,
}: {
  categories: ICategories;
  products: IProductData;
}) => {
  // // console.log(products.data);
  return (
    <div className="border-r border-gray-200 h-full p-space12 w-full">
      <p className="text-md font-semibold border-b pb-space12 border-gray-200">
        Upsell
      </p>

      {/*----------- Filtering section  -----------*/}
      <FilteringSection categories={categories} />

      {/*----------- Products section  -----------*/}
      <ul className="space-y-space12 mt-space12 h-[calc(100vh-310px)] overflow-y-auto">
        {products.data.map((product) => {
          return <UpsellProductCard key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default UpSell;

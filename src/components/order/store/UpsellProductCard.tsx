import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { IProduct } from '@/types/product-interface';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useState } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { formatVariationTitle } from '@/utils/string';

const UpsellProductCard = ({ product }: { product: IProduct }) => {
  const [selectVariation, setSelectVariation] = useState<number[]>([]);

  const { setCartProducts } = useProductStore();

  const foundVariation = product.variation_options.find((variation) => {
    const variationIds = formatVariationTitle(variation.title, 0);
    const isMatching =
      variationIds.length === selectVariation.length &&
      variationIds.every(
        (val, index) => Number(val) === selectVariation[index],
      );

    return isMatching;
  });

  const handleAddCart = () => {
    setCartProducts([
      {
        product_id: product.id,
        name: product.name,
        weight: foundVariation
          ? Number(foundVariation.dimensions.weight)
          : Number(product.dimensions.weight),
        quantity: 1,
        stock: foundVariation
          ? foundVariation.stock_quantity
          : (product.stock_quantity ?? ''),

        price: foundVariation
          ? Number(foundVariation.sell_price)
          : Number(product.sell_price),
        show_price: foundVariation
          ? Number(foundVariation.sell_price)
          : Number(product.sell_price),

        image: foundVariation?.image_url
          ? foundVariation.image_url
          : (product.thump_image ?? ''),

        ...(foundVariation && {
          variation: {
            id: foundVariation.id,
            title: foundVariation.title,
          },
        }),
      },
    ]);
  };

  const disableAction = product.variations.length > selectVariation.length;

  return (
    <li className="border border-gray-200 rounded-lg p-space8">
      <div className="flex gap-space16 items-start justify-between">
        <div className="flex items-start gap-space8">
          <Image src={product.thump_image} alt="image" height={40} width={40} />
          <article className="">
            <span className="font-semibold text-sm line-clamp-1">
              {product.name}
            </span>
            <article className="flex gap-space8 text-xs">
              {/* <p>
                <span className="text-gray-500">SKU: </span>
                {product.sku}
              </p> */}
              <p>
                <span className="text-gray-500">Stock: </span>
                {product.stock_quantity}
              </p>
            </article>
          </article>
        </div>

        {product.product_type === 'simple' ? (
          <span className="font-medium">৳{product.sell_price}</span>
        ) : (
          <span className="font-medium">
            {foundVariation ? (
              <>৳{foundVariation.sell_price}</>
            ) : (
              <>
                ৳{product.min_price} - ৳{product.max_price}
              </>
            )}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-space8 mt-space6 text-xs border-t border-gray-200 font-medium">
        <div className="flex gap-space8">
          {product.variations.map((variation, index) => {
            return (
              <Select
                key={variation.id}
                onValueChange={(value) => {
                  let arr = [...selectVariation];
                  arr[index] = Number(value);

                  setSelectVariation(arr);
                }}
              >
                <SelectTrigger className="gap-space4 !p-space6 h-[28px]">
                  <SelectValue placeholder={variation.name} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {variation.selected_options.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          })}
        </div>
        <Button
          size={'sm'}
          variant={'outline'}
          disabled={disableAction}
          onClick={handleAddCart}
          type="button"
        >
          Add to Cart
        </Button>
      </div>
    </li>
  );
};

export default UpsellProductCard;

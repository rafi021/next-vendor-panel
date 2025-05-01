import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import SimpleProductForm from './SimpleProductForm';
import VariableProductForm from './VariableProductForm';
import { ProductSchemaDef } from '@/schemas/inventory/product';
import { IProductAttributeData } from '@/types/attributes-interface';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IProduct, VariationsDef } from '@/types/product-interface';

interface IProps {
  form: UseFormReturn<ProductSchemaDef>;
  attributes: IProductAttributeData;
  product?: IProduct;
  variationsData?: VariationsDef[];
}

const productTypes = ['simple', 'variable'];

const StoreProductTypeForm = ({
  form,
  attributes,
  product,
  variationsData,
}: IProps) => {
  return (
    <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
      <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
        Product Type
      </div>

      <FormField
        control={form.control}
        name="product_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex gap-space12">
                  {productTypes.map((type) => (
                    <FormItem key={type}>
                      <FormLabel
                        className={`flex capitalize border items-center gap-space6 text-xs sm:text-sm font-medium py-space12 px-space16 rounded-md
                         ${field.value === type ? 'bg-blue-50 border-blue-500 text-blue-500' : 'border-transparent bg-gray-100 text-black'} `}
                      >
                        <FormControl>
                          <RadioGroupItem value={type} disabled={!!product} />
                        </FormControl>

                        <span>{type} Product</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('product_type') === 'simple' ? (
        <SimpleProductForm form={form} />
      ) : (
        <VariableProductForm
          product={product}
          attributes={attributes}
          variationsData={variationsData}
        />
      )}
    </div>
  );
};

export default StoreProductTypeForm;

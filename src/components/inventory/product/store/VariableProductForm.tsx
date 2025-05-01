'use client';
import React, { useEffect, useState } from 'react';
import {
  IAttributeOption,
  IProductAttributeData,
} from '@/types/attributes-interface';
import { Button } from '@/components/ui/button';
import {
  BrickWall,
  Circle,
  Image as ImageIcon,
  Layers,
  Plus,
  Trash2,
  Weight,
} from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { getVariations } from './generateVariations';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProductStore } from '@/stores/useProductStore';
import VariantImageUpload from './VariantImageUpload';
import { IProduct, VariationsDef } from '@/types/product-interface';

interface IProps {
  attributes: IProductAttributeData;
  product?: IProduct;
  variationsData?: VariationsDef[];
}

const defaultField = {
  id: '' as string,
  name: '' as string,
  options: [] as IAttributeOption[],
  selected_options: [] as string[],
};

const VariableProductForm = ({
  attributes,
  product,
  variationsData,
}: IProps) => {
  const {
    attributeField,
    setAttributeField,
    variationTableData,
    setVariationTableData,
    updateVariationTableData,
  } = useProductStore();

  const variations = getVariations(attributeField);
  const [activeTab, setActiveTab] = useState<string>('');
  const [activeSelect, setActiveSelect] = useState<string>('');

  const tabItems = attributeField.find((att) => att.name === activeSelect);

  useEffect(() => {
    setVariationTableData(variations);
    setActiveSelect(attributeField[0]?.name);
    setActiveTab(attributeField[0]?.selected_options[0]);
  }, [attributeField]);

  useEffect(() => {
    if (tabItems) setActiveTab(tabItems.selected_options[0]);
  }, [activeSelect]);

  // Default value updated at edit time
  useEffect(() => {
    if (variationsData && product) {
      const variationsProcess = variationsData.map((variation) => {
        return {
          ...variation,
          selected_options: variation.selected_options.map((option) => {
            return `${option.id}_${option.value}`;
          }),
        };
      });
      const tableDataProcess = product.variation_options.map(
        ({
          id,
          title,
          image_url,
          stock_quantity,
          purchase_price,
          sell_price,
          regular_price,
          is_active,
          dimensions,
        }) => {
          return {
            id,
            title,
            image_url,
            sell_price,
            regular_price,
            purchase_price,
            weight: dimensions.weight ?? '',
            stock_quantity: String(stock_quantity),
            is_active: is_active === 1 ? true : false,
          };
        },
      );

      setVariationTableData(tableDataProcess);

      setAttributeField(variationsProcess);
    } else {
      setAttributeField([
        {
          id: '',
          name: '',
          options: [],
          selected_options: [],
        },
      ]);
      setVariationTableData([]);
    }
  }, [product, variationsData]);

  return (
    <div className="space-y-space12 border border-gray-200 rounded-md p-space12">
      <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
        <div className="flex justify-between gap-space12 items-center">
          Variants ({variations.length})
          <Link
            href={`/attributes`}
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button type="button">
              <Plus className="w-4 h-4" />
              Add Attribute
            </Button>
          </Link>
        </div>
      </div>
      {attributeField.map((field, idx) => {
        return (
          <div key={idx} className="flex gap-space16 items-end">
            <div className="w-full grid sm:grid-cols-2 gap-space16">
              <div>
                <Label>Option name</Label>
                <Select
                  value={field.name ? `${field.id}_${field.name}` : ''}
                  onValueChange={(value) => {
                    if (!value.length) return;
                    const [id, name] = value.split('_');

                    const options = attributes.data
                      .filter((att) => att.name === name)
                      .flatMap((att) => att.attribute_options || []);

                    const updatedList = attributeField.map((item, index) => {
                      if (index === idx) {
                        return {
                          ...item,
                          id,
                          name,
                          options,
                          selected_options: [],
                        };
                      }
                      return item;
                    });
                    setAttributeField(updatedList);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select name" />
                  </SelectTrigger>
                  <SelectContent>
                    {attributes.data.map((att) => {
                      const isFound = attributeField.find(
                        (item) => item.name == att.name,
                      );

                      return (
                        <SelectItem
                          key={att.id}
                          disabled={!!isFound}
                          value={`${att.id}_${att.name}`}
                        >
                          {att.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {!!field.name?.length && (
                <div>
                  <Label>Option values</Label>
                  <MultiSelect
                    maxCount={5}
                    animation={2}
                    variant="secondary"
                    disableOptionCheck={variationTableData.length > 17}
                    options={field.options.map((option) => ({
                      label: option.value,
                      value: `${option.id}_${option.value}`,
                    }))}
                    placeholder="Select values"
                    selectedValues={field.selected_options}
                    onValueChange={(val) => {
                      const updatedList = attributeField.map((item, index) => {
                        if (index === idx) {
                          return {
                            ...item,
                            selected_options: val,
                          };
                        }
                        return item;
                      });
                      setAttributeField(updatedList);
                    }}
                  />
                </div>
              )}
            </div>

            <Button
              type="button"
              variant={'danger-outline'}
              onClick={() => {
                if (attributeField.length === 1) return;
                const filteredFields = attributeField.filter(
                  (_, index) => idx !== index,
                );
                setAttributeField(filteredFields);
              }}
            >
              <Trash2 className="h-space16 w-space16" />
            </Button>
          </div>
        );
      })}

      {attributes.data.length !== attributeField.length && (
        <div>
          {variationTableData.length > 18 && (
            <div className="text-red-500 text-sm">
              Maximum 18 Variants are allowed
            </div>
          )}
          <Button
            type="button"
            variant={'pagination'}
            disabled={variationTableData.length > 17}
            onClick={() => {
              const addRow =
                attributeField[attributeField.length - 1]?.name === ''
                  ? attributeField
                  : [...attributeField, defaultField];

              setAttributeField(addRow);
            }}
          >
            <Plus className="h-space16 w-space16" />
            Add Another Option
          </Button>
        </div>
      )}

      {/* Table Section  */}
      {!!variations.length && (
        <section className="space-y-space12 border border-gray-200 rounded-md p-space12">
          <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8 flex justify-between gap-space12 items-center">
            Add Value
            <Select
              value={activeSelect}
              defaultValue={activeSelect}
              onValueChange={(value) => {
                if (!value.length) return;
                setActiveSelect(value);
              }}
            >
              <SelectTrigger className="max-w-max gap-space8">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent align="end">
                {attributeField.map((att) => {
                  return (
                    <SelectItem key={att.id} value={`${att.name}`}>
                      {att.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Tabs
            value={activeTab}
            className="w-[400px]"
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              {tabItems?.selected_options.map((option) => {
                const [id, value] = option.split('_');

                return (
                  <TabsTrigger key={option} value={option}>
                    {value}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[60px]"># ID</TableHead>
                <TableHead className="min-w-[80px] max-w-[80px]">
                  <div className="flex items-center gap-space4">
                    <ImageIcon className="h-3 w-3" />
                    Image
                  </div>
                </TableHead>
                <TableHead className="min-w-[200px]">
                  <div className="flex items-center gap-space4">
                    <Layers className="h-3 w-3" />
                    Type
                  </div>
                </TableHead>
                <TableHead className="">
                  <div className="flex items-center gap-space4">
                    <Weight className="h-3 w-3" />
                    Weight <span className="text-error-500">*</span>
                  </div>
                </TableHead>
                <TableHead className="">
                  <div className="flex items-center gap-space4">
                    <BrickWall className="h-3 w-3" />
                    Available Qty <span className="text-error-500">*</span>
                  </div>
                </TableHead>
                <TableHead className="">
                  ৳ Purchase <span className="text-error-500">*</span>
                </TableHead>
                <TableHead className="">
                  ৳ Selling <span className="text-error-500">*</span>
                </TableHead>
                <TableHead className="">
                  ৳ Regular <span className="text-error-500">*</span>
                </TableHead>
                <TableHead className="">
                  <div className="flex items-center gap-space4">
                    <Circle className="h-3 w-3" />
                    Status
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variationTableData.map((row, index) => {
                const combination = row.title
                  .split('/')
                  .map((val) => val.split('_')[1])
                  .join(' / ');

                if (row.title.includes(activeTab)) {
                  return (
                    <TableRow key={row.title}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <VariantImageUpload data={row} />
                      </TableCell>
                      <TableCell className="capitalize">
                        {combination}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.weight}
                          onChange={(e) => {
                            const weight = e.target.value;
                            updateVariationTableData({ ...row, weight });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.stock_quantity}
                          onChange={(e) => {
                            const stock_quantity = e.target.value;
                            updateVariationTableData({
                              ...row,
                              stock_quantity,
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.purchase_price}
                          onChange={(e) => {
                            const purchase_price = e.target.value;
                            updateVariationTableData({
                              ...row,
                              purchase_price,
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.sell_price}
                          onChange={(e) => {
                            const sell_price = e.target.value;
                            updateVariationTableData({
                              ...row,
                              sell_price,
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={row.regular_price}
                          onChange={(e) => {
                            const regular_price = e.target.value;
                            updateVariationTableData({
                              ...row,
                              regular_price,
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="border border-gray-300 rounded-md px-space16 py-space6">
                          <Switch
                            checked={row.is_active}
                            onCheckedChange={(is_active) =>
                              updateVariationTableData({ ...row, is_active })
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
};

export default VariableProductForm;

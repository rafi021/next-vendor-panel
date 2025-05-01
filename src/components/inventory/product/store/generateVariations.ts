import { AttributeFieldDef } from '@/stores/useProductStore';

export type Combination = {
  id: number | null;
  title: string;
  image_url: string;
  weight: string;
  stock_quantity: string;
  purchase_price: string;
  sell_price: string;
  regular_price: string;
  is_active: boolean;
};

function generateCombinations(
  variations: AttributeFieldDef[],
  index: number = 0,
  prefix: string[] = [],
): Combination[] {
  if (index === variations.length) {
    return [
      {
        id: null,
        title: prefix.join('/'),
        image_url: '',
        weight: '',
        stock_quantity: '',
        purchase_price: '',
        sell_price: '',
        regular_price: '',
        is_active: true,
      },
    ];
  }

  return variations[index].selected_options.flatMap((option) =>
    generateCombinations(variations, index + 1, [...prefix, option]),
  );
}

export function getVariations(
  attributeField: AttributeFieldDef[],
): Combination[] {
  if (!attributeField.length) return [];

  if (attributeField.length === 1) {
    const singleVariations = attributeField[0].selected_options.map(
      (option) => ({
        id: null,
        title: option,
        image_url: '',
        weight: '',
        stock_quantity: '',
        purchase_price: '',
        sell_price: '',
        regular_price: '',
        is_active: false,
      }),
    );

    return singleVariations;
  }

  return attributeField[0].selected_options.flatMap((option) =>
    generateCombinations(attributeField.slice(1), 0, [option]),
  );
}

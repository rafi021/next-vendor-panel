'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { api } from '@/server/api';
import { GET_SETTINGS, SITE_SETTINGS } from '@/server/services/site-settings';
import { StyleResponse } from '@/types/store-ui';
import { Palette } from 'lucide-react';
import React, { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface ColorScheme {
  fill_color: string;
  stock_color: string;
  text_color: string;
}

interface Colors {
  buy_now_btn: ColorScheme;
  add_to_card_btn: ColorScheme;
  banner_btn: ColorScheme;
}

interface ProductCardSettings {
  buy_btn: boolean;
  add_to_card: boolean;
  title: boolean;
  sale_price: boolean;
  regular_price: boolean;
  review: boolean;
  sell_count: boolean;
}

const defaultColors: Colors = {
  buy_now_btn: {
    fill_color: '#CEE34C',
    stock_color: '#1A1A1D',
    text_color: '#1A1A1D',
  },
  add_to_card_btn: {
    fill_color: '#F1F4F0',
    stock_color: '#1A1A1D',
    text_color: '#1A1A1D',
  },
  banner_btn: {
    fill_color: '#1A1A1D',
    stock_color: '#1A1A1D',
    text_color: '#F1F4F0',
  },
};

const defaultProductCardSettings: ProductCardSettings = {
  buy_btn: true,
  add_to_card: true,
  title: true,
  sale_price: true,
  regular_price: true,
  review: true,
  sell_count: true,
};

const ColorPicker = ({
  label,
  color,
  onChange,
}: {
  label: string;
  color: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex items-center gap-2">
    <Input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="!p-0 !w-8 !h-8 !rounded-xl cursor-pointer transition-all hover:scale-105 !border-none !shadow-none capitalize"
    />
    {label}
  </div>
);

const ColorSection = ({
  title,
  sectionKey,
  colors,
  setColors,
}: {
  title: string;
  sectionKey: keyof Colors;
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
}) => {
  return (
    <div className="border-r px-8 border-gray-200 w-full">
      <Label className="text-sm font-medium">{title}</Label>
      <div className="text-xs flex flex-col gap-2 text-gray-500 font-medium">
        {(
          ['fill_color', 'stock_color', 'text_color'] as (keyof ColorScheme)[]
        ).map((type) => (
          <ColorPicker
            key={type}
            label={type.replace('_', ' ')}
            color={colors[sectionKey][type]}
            onChange={(value) =>
              setColors((prev) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [type]: value,
                },
              }))
            }
          />
        ))}

        <Button
          type="button"
          style={{
            backgroundColor: colors[sectionKey].fill_color,
            color: colors[sectionKey].text_color,
            borderColor: colors[sectionKey].stock_color,
          }}
        >
          {title}
        </Button>
      </div>
    </div>
  );
};

const StylePageWrapper = ({ styles }: { styles?: StyleResponse }) => {
  const [isLoading, startTransition] = useTransition();

  const [colors, setColors] = useState<Colors>(styles?.style ?? defaultColors);

  const [pageColor, setPageColor] = useState(
    styles?.style.page_color ?? {
      theme: '#CEE34C',
      ticker_bg: '#1A1A1D',
    },
  );

  const [productCardSettings, setProductCardSettings] =
    useState<ProductCardSettings>(
      styles?.product_card_type ?? defaultProductCardSettings,
    );

  const handleSave = async () => {
    const payload = {
      style: {
        ...colors,
        page_color: { ...pageColor },
      },
      product_card_type: { ...productCardSettings },
    };

    // // console.log('payload -> ', payload);

    startTransition(async () => {
      const res = await api.post(
        SITE_SETTINGS.POST,
        payload,
        GET_SETTINGS.GET.TAGS,
      );

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message ?? 'Something went wrong!');
      }
    });
  };

  useEffect(() => {
    if (styles) {
      setColors(styles.style);
      setPageColor(styles.style.page_color);
      setProductCardSettings(styles.product_card_type);
    }
  }, [styles]);

  return (
    <div className="space-y-[0.5px]">
      <Card className="p-4 flex justify-between items-center pb-4 rounded-b-none">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="white" className="border">
            <Palette size="20" />
          </Button>
          <p className="text-md font-semibold">Style</p>
        </div>
      </Card>

      <Card className="p-4 rounded-t-none space-y-6">
        <div className="flex items-start justify-between gap-4">
          <Card className="w-2/3 p-4 space-y-4 !shadow-none">
            <Label className="text-md font-semibold px-2">Color</Label>

            <div className="flex items-start justify-between border-t pt-4 border-gray-200">
              <div className="border-r px-8 border-gray-200 w-full">
                <Label className="text-sm font-medium">Pages Color</Label>
                <div className="text-xs flex flex-col gap-2 text-gray-500 font-medium">
                  <ColorPicker
                    label="Theme"
                    color={pageColor.theme}
                    onChange={(value) =>
                      setPageColor((prev) => ({
                        ...prev,
                        theme: value,
                      }))
                    }
                  />
                  <ColorPicker
                    label="Ticker Background"
                    color={pageColor.ticker_bg}
                    onChange={(value) =>
                      setPageColor((prev) => ({
                        ...prev,
                        ticker_bg: value,
                      }))
                    }
                  />
                </div>
              </div>

              <ColorSection
                title="Buy Now Button"
                sectionKey="buy_now_btn"
                colors={colors}
                setColors={setColors}
              />
              <ColorSection
                title="Add To Cart Button"
                sectionKey="add_to_card_btn"
                colors={colors}
                setColors={setColors}
              />
              <ColorSection
                title="Banner Button"
                sectionKey="banner_btn"
                colors={colors}
                setColors={setColors}
              />
            </div>
          </Card>

          <Card className="w-1/3 p-4 space-y-4 !shadow-none">
            <Label className="text-md font-semibold px-2">
              Product Card Style
            </Label>
            <div className="w-full text-sm font-medium px-2">
              {Object.entries(productCardSettings).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between border-t border-gray-200 py-2"
                >
                  <span>
                    {key
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      setProductCardSettings((prev) => ({
                        ...prev,
                        [key]: checked,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Button
          size="xxl"
          onClick={handleSave}
          disabled={isLoading}
          loader={isLoading}
        >
          Save
        </Button>
      </Card>
    </div>
  );
};

export default StylePageWrapper;

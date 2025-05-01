'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { VariationOption } from '@/types/product-interface';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const VariantsModal = ({ variations }: { variations: VariationOption[] }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'transparent'}
          className="h-auto !p-0 underline underline-offset-2 text-gray-600"
        >
          {variations.length} Variants
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-screen max-w-[440px] p-0">
        <div className="p-space12 pb-space4 flex justify-between items-center gap-space12">
          <h3 className="text-md font-semibold text-black">
            {variations.length} Variants
          </h3>

          <Button
            size={'icon'}
            variant={'transparent'}
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>
        <ScrollArea className="max-h-[320px] overflow-y-scroll">
          <ul className="">
            {variations.map((row, idx) => {
              const title = row.title
                .split('/')
                .map((val) => val.split('_')[1])
                .join(' / ');
              return (
                <li key={idx} className="border-b border-gray-200 p-space12">
                  <div className="flex items-center gap-space12 w-full">
                    <Image
                      src={row.image_url}
                      alt={row.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-contain"
                      wrapperClasses="h-[74px] w-[74px] min-h-[74px] min-w-[74px] border border-gray-200 rounded-md"
                    />
                    <article className="text-sm text-black space-y-space4 w-full">
                      <p className="font-semibold capitalize">
                        Variant {idx + 1}: {title}
                      </p>
                      <p>
                        Purchase: ৳ {row.purchase_price}, Selling: ৳{' '}
                        {row.sell_price}
                      </p>
                    </article>
                  </div>
                  {/* <div className="flex mt-space4 flex-col gap-space6 bg-gray-100 p-space6 rounded-sm">
                    {row?.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-space8 items-center"
                      >
                        <span className="min-w-max text-gray-700 font-medium text-sm">
                          {option.name}:{' '}
                        </span>

                        {option.values.map((value) => (
                          <span
                            key={value}
                            className="text-xs  min-w-max bg-gray-200 px-space6 py-[2px] rounded-md"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div> */}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default VariantsModal;

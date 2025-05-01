import React from 'react';
import { Combination } from './generateVariations';
import { Loader2 } from 'lucide-react';
import { InputFileTypeEnum } from '@/enum/InputFileType';
import useFileUpload from '@/hooks/useFileUpload';
import { useProductStore } from '@/stores/useProductStore';
import { Image } from '@/components/common/Image';

const VariantImageUpload = ({ data }: { data: Combination }) => {
  const updateData = useProductStore((state) => state.updateVariationTableData);

  const { isLoading, onChange } = useFileUpload({
    setImage: (value) => {
      updateData({
        ...data,
        image_url: value,
      });
    },
  });

  return (
    <div>
      <label
        htmlFor={data.title}
        className="cursor-pointer flex items-center justify-center bg-gray-200 rounded-md h-[36px] w-[36px] relative"
      >
        <Image src={data.image_url || null} alt="" width={30} height={30} />

        <input
          type="file"
          id={data.title}
          className="hidden"
          onChange={onChange}
          disabled={isLoading}
          accept={InputFileTypeEnum.IMAGE}
        />

        {isLoading && (
          <div className="absolute top-0 left-0  bg-black/40 w-full h-full flex items-center justify-center rounded-sm text-xl text-white">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </label>
    </div>
  );
};

export default VariantImageUpload;

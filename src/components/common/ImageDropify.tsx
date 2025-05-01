import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlusIcon, Loader2, Upload, X } from 'lucide-react';
import { isValidImage, isValidImageUrl } from '@/utils/image-utils';
import useFileUpload from '@/hooks/useFileUpload';
import { Image } from './Image';

interface ImageDropifyProps {
  image: string;
  setImage: (file: string) => void;
  isSubmitting?: boolean;
  className?: string;
  remove?: boolean;
  id?: string;
  handleRemove?: () => void;
}

const ImageDropify: React.FC<ImageDropifyProps> = ({
  image,
  setImage,
  isSubmitting = false,
  className = '',
  remove = false,
  id = 'upload-image',
  handleRemove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { onChange, isLoading } = useFileUpload({ setImage });

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const syntheticEvent = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  const renderPreview = () => (
    <div className="flex items-center gap-space16 flex-wrap">
      <div className="p-space4 h-[74px] w-[74px] max-h-[74px] max-w-[74px] rounded-sm border border-slate-300/50 bg-white relative">
        <Image
          src={isValidImageUrl(image) ? image : null}
          alt="view"
          width={0}
          height={0}
          sizes="100vw"
          className="object-contain h-full w-full"
        />

        {isLoading && (
          <div className="absolute top-0 left-0  bg-black/40 w-full h-full flex items-center justify-center rounded-sm text-xl text-white">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {remove && (
          <X
            size={16}
            className="absolute top-0 right-0 text-black cursor-pointer border border-black hover:text-white hover:bg-red-500 rounded-full bg-white/50 "
            onClick={() => {
              setImage('');
              handleRemove?.();
            }}
          />
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="white"
          disabled={isSubmitting}
          onClick={() => inputRef.current?.click()}
        >
          <Upload height={16} width={16} /> Change Image
        </Button>
      </div>
    </div>
  );

  const renderDropArea = () => (
    <div className="flex flex-row items-center gap-3 sm:gap-5">
      <label
        htmlFor={id}
        className="relative rounded-full border flex items-center justify-center border-gray-300/50 bg-gray-100 text-gray-500 h-[74px] w-[74px] min-h-[74px] min-w-[74px]"
      >
        <ImagePlusIcon className=" h-1/2 w-1/2" />

        {isLoading && (
          <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex items-center justify-center rounded-full text-xl text-white">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </label>
      <label
        htmlFor={id}
        className={`p-space8 border-dashed border-2 rounded-lg h-24 w-full flex flex-col items-center justify-center text-gray-500 space-y-2 cursor-pointer bg-white ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${className}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <article className="sm:gap-space4 flex flex-wrap items-center justify-center text-xs sm:text-sm text-gray-500">
          <span className="text-blue-500 font-semibold">Click to upload</span>
          <span>or drag and drop</span>
        </article>
        <span className="text-[10px] text-center sm:text-xs text-gray-500">
          SVG, PNG, JPG, AVIF, WEBP or GIF (max. 800x400px)
        </span>
      </label>
    </div>
  );

  return (
    <div>
      {image ? renderPreview() : renderDropArea()}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        id={id}
        className="hidden"
        onChange={onChange}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default ImageDropify;

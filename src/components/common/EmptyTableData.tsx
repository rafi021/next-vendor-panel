import { Layers } from 'lucide-react';
import React from 'react';

interface IEmptyTableProps {
  title: string;
  description: string;
  action: React.ReactNode;
  placeholder?: React.ReactNode;
}

const EmptyTableData = ({
  action,
  description,
  title,
  placeholder = '',
}: IEmptyTableProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center justify-center text-center gap-space16">
        {placeholder ? (
          placeholder
        ) : (
          <Layers className="w-[90px] h-[90px] text-gray-500" />
        )}
        <article>
          <h6 className="text-md font-medium text-black">
            {title}
            {/* There is no Brand created here yet! */}
          </h6>
          <p className="text-sm text-gray-500 mt-space6">
            {description}
            {/* Add Brands to your shop and adjust them as you wish. You will be
            able to add, update and delete whenever you want, whenever you wish */}
          </p>
        </article>
        {action}
        {/* <Button>
          <Plus className="w-4 h-4" />
          Add Brand
        </Button> */}
      </div>
    </div>
  );
};

export default EmptyTableData;

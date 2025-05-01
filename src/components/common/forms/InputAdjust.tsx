'use client';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface InputAdjustProps {
  value: string;
  maxValue?: number;
  wrapperClasses?: string;
  onChange: (value: string) => void;
}

const InputAdjust = ({
  onChange,
  value,
  maxValue,
  wrapperClasses,
  ...props
}: InputAdjustProps) => {
  const handleIncrement = () => {
    const newValue = Number(value) + 1;
    if (maxValue && newValue > maxValue) {
      return;
    }
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Number(value) - 1;
    if (newValue >= 1) {
      onChange(newValue.toString());
    }
  };

  return (
    <div
      className={`relative ${wrapperClasses}`}
      title={`${Number(value) < 1 ? 'Minimum Quantity is 1' : ''}`}
    >
      <Input
        {...props}
        type="number"
        value={value}
        placeholder="0"
        className={`w-full max-w-[100px] !rounded-sm !text-xs h-space24 text-center ${Number(value) < 1 ? 'text-red-500' : ''}`}
        onChange={(e) => {
          let val = e.target.value;
          if (maxValue && Number(val) > maxValue) {
            val = maxValue.toString();
          } else if (Number(val) <= 0) {
            val = '1';
          }
          onChange(val);
        }}
      />

      <div className="absolute left-space4 top-1/2 transform -translate-y-1/2 border-r">
        <button
          type="button"
          onClick={handleDecrement}
          className="h-space24 w-space24 flex items-center justify-center"
        >
          <Minus size={12} />
        </button>
      </div>
      <div className="absolute right-space4 top-1/2 transform -translate-y-1/2 border-l">
        <button
          type="button"
          onClick={handleIncrement}
          className="h-space24 w-space24 flex items-center justify-center"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};

export default InputAdjust;

'use client';

import { toast } from 'sonner';
import { Check, Copy } from 'lucide-react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

interface CopyComponentProps {
  children: ReactElement;
  value: string | number | null;
  iconSize?: number;
  tooltip?: string;
}

const CopyComponent = ({
  children,
  value,
  iconSize = 14,
  tooltip = 'Copy to clipboard',
}: CopyComponentProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setIsCopied(true);
      timerID.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong copying the value';
      toast.error(message);
    }
  };

  useEffect(() => {
    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {children}
      {isCopied ? (
        <Check
          size={iconSize}
          className="text-green-500 transition-colors duration-500"
        />
      ) : (
        <span
          role="button"
          tabIndex={0}
          onClick={handleCopy}
          onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
          aria-label={tooltip}
          title={tooltip}
          className="outline-none focus:ring-0 rounded-sm transition-all duration-300"
        >
          <Copy
            size={iconSize}
            className="text-gray-400 hover:text-black cursor-pointer"
          />
        </span>
      )}
    </div>
  );
};

export default CopyComponent;

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type IDrawerProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: (open: boolean) => void;
  side?: 'left' | 'right';
  containerClassName?: string;
};

export function Drawer({
  children,
  onClose,
  open,
  side = 'right',
  containerClassName,
}: IDrawerProps) {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetHeader className="hidden">
          <SheetDescription />
          <SheetTitle />
        </SheetHeader>
        <SheetContent side={side} className={`p-0 ${containerClassName}`}>
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
}

export const DrawerFooter = ({
  children,
  height = '9.6rem',
  className = '',
}: {
  children: React.ReactNode;
  height?: string;
  className?: string;
}) => {
  return (
    <>
      <div style={{ height: height }}></div>
      <SheetFooter
        className={`absolute bottom-0 left-0 w-full px-space16 pb-space16 pt-space10 md:px-space32 md:pt-space16 md:pb-space24 border-t border-primary-20 dark:border-primary-80 background flex justify-end gap-space16 ${className}`}
      >
        {children}
      </SheetFooter>
    </>
  );
};

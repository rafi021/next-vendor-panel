'use client';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState, useTransition } from 'react';
import { api } from '@/server/api';
import { ORDERS } from '@/server/services/order';
import { toast } from 'sonner';

const OrderNoteForm = ({
  orderId,
  note,
}: {
  orderId: number;
  note?: string | null;
}) => {
  const [noteValue, setNoteValue] = useState(note ?? '');
  const [isLoading, startTransition] = useTransition();

  const handleSaveNoteClick = () => {
    startTransition(async () => {
      const res = await api.put(`${ORDERS.PUT.ORDER_NOTE_UPDATE}/${orderId}`, {
        staff_note: noteValue,
      });
      // // console.log('note= >', note);
      // // console.log('res =>', res);
      if (res.success) {
        note
          ? toast.success('Note updated successfully!')
          : toast.success('Note created successfully!');
      } else {
        note
          ? toast.error('Cannot update note')
          : toast.error('Cannot create note');

        // setNoteValue(note ?? '');
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Plus size={16} className="hover:cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="grid gap-4">
          <div className="space-y-2 flex items-center justify-between">
            <h4 className="font-medium leading-none">Notes</h4>
            <PopoverClose>
              <X size={15} className="text-red-500" />
            </PopoverClose>
          </div>
          <div className="grid gap-2">
            <Input
              value={noteValue}
              onChange={(evt) => setNoteValue(evt.target.value)}
              placeholder="Write a few sentences about the order..."
              className="col-span-2 h-8"
            />
            <Button
              onClick={handleSaveNoteClick}
              size={'sm'}
              type="button"
              className="text-xs font-normal"
              disabled={isLoading}
            >
              Save Note
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderNoteForm;

'use client';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Trash2 } from 'lucide-react';
import { api } from '@/server/api';
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface IDeleteButtonProps {
  url: string;
  tags: string[];
  title?: string;
  description?: string;
  children?: React.ReactNode;
  handleReset?: () => void;
}

const DeleteButton = ({
  url,
  tags,
  children,
  handleReset,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone.',
}: IDeleteButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await api.delete<ApiResponse<{}, null>>(url, tags);

      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        handleReset && handleReset();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button type="button" variant="danger-outline" size={'icon'}>
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="h-[48px] w-[48px] rounded-full p-space6 bg-error-50 mb-space16">
            <div className="h-full w-full rounded-full bg-error-100 flex justify-center items-center text-error-500">
              <Trash2 />
            </div>
          </div>

          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pb-space12">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="white" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full"
            variant={'danger'}
            loader={isLoading}
            disabled={isLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;

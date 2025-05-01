'use client';

import { toast } from 'sonner';
import { api } from '@/server/api';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useTransition } from 'react';
import { FOOTER_MENUS } from '@/server/services/footer-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  FooterMenuForm,
  FooterMenuSchemaDef,
  heads,
} from '@/schemas/settings/footer-menus';
import { slugify } from '@/utils/string';
import { PAGE_BUILDER } from '@/server/services/page-builder';

export interface IStoreBrandProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  disableAction?: string[];
  data?: {
    id: number;
    head: string;
    sub_head: string;
    url: string;
    priority: number;
  };
}

const StoreFooterMenu = ({
  data,
  children,
  description = '',
  disableAction = [],
  title = 'Add New Footer Menu',
}: IStoreBrandProps) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { form, handleReset, isActiveAction } = FooterMenuForm(data);

  function onSubmit(formData: FooterMenuSchemaDef) {
    startTransition(async () => {
      const payload = { ...formData, url: slugify(formData.sub_head) };

      // // console.log('payload -> ', payload);
      if (data) {
        const res = await api.put(
          `${FOOTER_MENUS.PUT.FOOTER_MENU_UPDATE}/${data.id}`,
          payload,
          [
            ...FOOTER_MENUS.GET.FOOTER_MENUS.TAGS,
            ...FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.TAGS,
            ...PAGE_BUILDER.GET.PAGE_BUILDER.TAGS,
          ],
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          FOOTER_MENUS.POST.FOOTER_MENU_CREATE,
          payload,
          [
            ...FOOTER_MENUS.GET.FOOTER_MENUS.TAGS,
            ...FOOTER_MENUS.GET.FOOTER_MENU_SLUG_LIST.TAGS,
            ...PAGE_BUILDER.GET.PAGE_BUILDER.TAGS,
          ],
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          setIsOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    });
  }

  const accessibleHeads = heads.filter((head) => !disableAction.includes(head));

  const formUrl = slugify(form.watch('sub_head'));

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4" />
            Add Menus
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-space16"
            >
              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="head"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accessibleHeads.map((head) => (
                            <SelectItem key={head} value={head}>
                              {head}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sub_head"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Enter menu name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-space16">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={formUrl ?? field.value ?? ''}
                          className="placeholder:text-gray-400"
                          placeholder="about-us"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="white"
                    className="w-full"
                    onClick={handleReset}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  loader={isLoading}
                  disabled={!isActiveAction || isLoading}
                >
                  {data ? 'Save Update' : 'Add New'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreFooterMenu;

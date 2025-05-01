'use client';

import React, { useTransition, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { api } from '@/server/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, Layers } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PERMISSIONS_GROUP } from '@/config/PERMISSIONS';
import { ROLES } from '@/server/services/roles';
import Link from 'next/link';

export interface RolesProps {
  title?: string;
  description?: string;
  data?: {
    id: string;
    name?: string;
    permissions: string[];
  };
}

const formSchema = z.object({
  name: z.string().min(2, 'Role name must be at least 2 characters.'),
  permissions: z.array(z.string()).min(1, 'Select at least one permission.'),
});

type RoleFormValues = z.infer<typeof formSchema>;

const RolesForm = ({ title = 'Roles', description = '', data }: RolesProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState<string[]>([]);

  const defaultValues: RoleFormValues = {
    name: data?.name || '',
    permissions: data?.permissions?.map(String) || [],
  };

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const selectedPermissions = useWatch({
    control: form.control,
    name: 'permissions',
  });

  const onSubmit = (formData: RoleFormValues) => {
    startTransition(async () => {
      const payload = {
        ...formData,
        permissions: formData.permissions.map(String),
      };

      const res = data
        ? await api.put(`${ROLES.PUT}/${data.id}`, payload, [
            ...ROLES.GET.LIST.TAGS,
            ...ROLES.GET.SINGLE.TAGS,
          ])
        : await api.post(ROLES.POST, payload, [
            ...ROLES.GET.LIST.TAGS,
            ...ROLES.GET.SINGLE.TAGS,
          ]);

      if (res.success) {
        toast.success(res.message);
        form.reset();
        router.push('/roles');
      } else {
        toast.error(res.message);
      }
    });
  };

  const toggleExpandAll = () => {
    const allModules = Object.keys(PERMISSIONS_GROUP);
    setOpen((prev) => (prev.length === allModules.length ? [] : allModules));
  };

  const handleAllCheckboxChange = (checked: boolean) => {
    const allPermissions = Object.values(PERMISSIONS_GROUP).flatMap((group) =>
      group.flatMap((g) => g.permissions.map((p) => String(p.name))),
    );
    const updatedPermissions = checked
      ? Array.from(new Set([...selectedPermissions, ...allPermissions]))
      : selectedPermissions.filter((per) => !allPermissions.includes(per));

    form.setValue('permissions', updatedPermissions);
  };

  const isAllSelected = Object.values(PERMISSIONS_GROUP).every((groups) =>
    groups.every((group) =>
      group.permissions.every((perm) =>
        selectedPermissions.includes(String(perm.name)),
      ),
    ),
  );

  const handlePermissionToggle = (permission: string) => {
    const current = selectedPermissions || [];
    if (current.includes(permission)) {
      form.setValue(
        'permissions',
        current.filter((perm) => perm !== permission),
      );
    } else {
      form.setValue('permissions', [...current, permission]);
    }
  };

  return (
    <div className="bg-gray-50">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <Layers className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-semibold border-r-2 pr-space8">
                    {title}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <Label
                      className="text-sm font-semibold text-gray-500"
                      htmlFor="select-all"
                    >
                      Select All
                    </Label>
                    <Checkbox
                      id="select-all"
                      checked={isAllSelected}
                      onCheckedChange={handleAllCheckboxChange}
                    />
                  </div>
                </div>
                <p className="text-gray-500">
                  {data ? 'Update' : 'Create'} your Roles in less than 2
                  minutes.
                </p>
              </div>
            </div>
            <Button variant="white" className="ml-4" onClick={toggleExpandAll}>
              <div className="flex items-center space-x-2 gap-space8">
                {open.length === Object.keys(PERMISSIONS_GROUP).length
                  ? 'Collapse All'
                  : 'Expand All'}
                <span
                  className={`${
                    open.length === Object.keys(PERMISSIONS_GROUP).length
                      ? 'rotate-180'
                      : ''
                  } duration-300`}
                >
                  <ChevronDown size={16} />
                </span>
              </div>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="lg:p-space24">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-space16"
            >
              {/* Role Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="e.g. Manager"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label className="text-sm font-semibold text-gray-500">
                  Select Permissions
                </Label>
                <div className="mt-space12 flex flex-col gap-space12">
                  {Object.entries(PERMISSIONS_GROUP).map(([module, groups]) => {
                    const isModuleOpen = open.includes(module);
                    const modulePermissions = groups.flatMap((group) =>
                      group.permissions.map((p) => String(p.name)),
                    );
                    const isAllSelected = modulePermissions.every((name) =>
                      selectedPermissions.includes(name),
                    );

                    return (
                      <div key={module} className="border rounded">
                        <div className="flex items-center justify-between px-space12 py-space12">
                          <div
                            className="flex items-center font-semibold capitalize cursor-pointer space-x-2"
                            onClick={() =>
                              setOpen((prev) =>
                                isModuleOpen
                                  ? prev.filter((m) => m !== module)
                                  : [...prev, module],
                              )
                            }
                          >
                            <p className="font-semibold text-md text-gray-800">
                              {module.replace(/_/g, ' ')}
                            </p>
                            <span
                              className={`${isModuleOpen ? 'rotate-180' : ''} duration-300`}
                            >
                              <ChevronDown size={16} />
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label
                              htmlFor={`select-all-${module}`}
                              className="text-sm font-semibold text-gray-500"
                            >
                              Select All
                            </Label>
                            <Checkbox
                              id={`select-all-${module}`}
                              checked={isAllSelected}
                              onCheckedChange={(checked) => {
                                const updated = checked
                                  ? Array.from(
                                      new Set([
                                        ...selectedPermissions,
                                        ...modulePermissions,
                                      ]),
                                    )
                                  : selectedPermissions.filter(
                                      (name) =>
                                        !modulePermissions.includes(name),
                                    );
                                form.setValue('permissions', updated);
                              }}
                            />
                          </div>
                        </div>

                        <div
                          className={`grid ${isModuleOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} transition-all duration-300 ease-in-out`}
                        >
                          <div className="overflow-hidden">
                            <div className="grid grid-cols-2 border-t">
                              {groups.map((group) => (
                                <ul
                                  key={group.name}
                                  className="w-full border-r"
                                >
                                  {/* heading */}
                                  <li className="grid grid-cols-5 px-space12 py-space6 bg-gray-100 text-xs font-semibold capitalize">
                                    <div className="col-span-4 flex items-center gap-2">
                                      <p className=" border-r pr-2">
                                        {group.name.replace(/_/g, ' ')}
                                      </p>
                                      <div className="flex items-center space-x-2">
                                        <Label
                                          htmlFor={`select-all-group-${group.name}`}
                                          className="text-xs font-semibold text-gray-500"
                                        >
                                          Select All
                                        </Label>
                                        <Checkbox
                                          id={`select-all-group-${group.name}`}
                                          checked={group.permissions.every(
                                            (perm) =>
                                              selectedPermissions.includes(
                                                String(perm.name),
                                              ),
                                          )}
                                          onCheckedChange={(checked) => {
                                            const updated = checked
                                              ? Array.from(
                                                  new Set([
                                                    ...selectedPermissions,
                                                    ...group.permissions.map(
                                                      (p) => String(p.name),
                                                    ),
                                                  ]),
                                                )
                                              : selectedPermissions.filter(
                                                  (name) =>
                                                    group.permissions.every(
                                                      (perm) =>
                                                        name !==
                                                        String(perm.name),
                                                    ),
                                                );
                                            form.setValue(
                                              'permissions',
                                              updated,
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="">Active</div>
                                  </li>

                                  {/* permissions */}
                                  {group.permissions.map((perm) => (
                                    <FormField
                                      key={perm.name}
                                      control={form.control}
                                      name="permissions"
                                      render={() => (
                                        <FormItem className="grid grid-cols-5 px-space12 py-space6 border-t">
                                          <FormLabel className="col-span-4 font-normal capitalize text-xs">
                                            {perm.name.replace(/_/g, ' ')}
                                          </FormLabel>
                                          <FormControl>
                                            <Checkbox
                                              checked={selectedPermissions.includes(
                                                String(perm.name),
                                              )}
                                              onCheckedChange={() =>
                                                handlePermissionToggle(
                                                  String(perm.name),
                                                )
                                              }
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <FormMessage>
                  {form.formState.errors.permissions?.message}
                </FormMessage>
              </div>

              <div className="flex items-center justify-start gap-space8">
                <Link href={'/hrm/roles'}>
                  <Button variant="pagination" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {data ? 'Update Role' : 'Create Role'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolesForm;

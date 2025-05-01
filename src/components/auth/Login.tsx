'use client';
import { useState, useTransition } from 'react';
import { login } from '@/server/auth/login';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next-nprogress-bar';
import { Button } from '@/components/ui/button';
import { LoginForm, LoginSchemaDef } from '@/schemas/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const form = LoginForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, startTransition] = useTransition();

  function onSubmit(data: LoginSchemaDef) {
    startTransition(async () => {
      const res = await login(data);
      if (res?.success) {
        router.push('/');
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-space16 p-space16">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value}
                    placeholder="+880 - XXXXXXXXXX"
                    maxLength={11}
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      if (input.value.length > 11) {
                        input.value = input.value.slice(0, 11);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      value={field.value}
                      placeholder="Enter a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t border-gray-300 p-space16">
          <div className="flex gap-space12 sm:w-1/2">
            <Button type="button" variant={'white'} className="w-full">
              Home
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              loader={isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

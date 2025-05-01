import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const RegisterSchema = z.object({
  shop_name: z
    .string({
      required_error: 'Shop name is required field',
    })
    .regex(/^(?!\s*$).+/, 'Shop name cannot be empty or only spaces!'),
  owner_name: z.string().min(2, {
    message: 'Owner name must me 3 characters',
  }),
  // email: z.string().email('email is not valid'),
  phone: z
    .string()
    .min(11, {
      message: 'Phone number must be at least 11 characters',
    })
    .max(11, {
      message: 'Phone number must be at least 11 characters',
    }),
  password: z
    .string()
    .min(5, {
      message: 'Minimum 5 characters required',
    })
    .max(5, {
      message: 'Maximum 5 characters required',
    }),
  password_confirmation: z
    .string()
    .min(5, {
      message: 'Minimum 5 characters required',
    })
    .max(5, {
      message: 'Maximum 5 characters required',
    }),
  business_type: z.string({
    required_error: 'Business type is required field',
  }),
  address: z.string().optional(),
});

export type RegisterSchemaDef = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const form = useForm<RegisterSchemaDef>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      shop_name: '',
      owner_name: '',
      // email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      business_type: undefined,
      address: '',
    },
  });

  return form;
};

// Login --------------------------------------
const LoginSchema = z.object({
  phone: z
    .string()
    .min(11, {
      message: 'Phone number must be at least 11 characters',
    })
    .max(11, {
      message: 'Phone number must be at least 11 characters',
    }),
  password: z
    .string()
    .min(5, {
      message: 'Minimum 5 characters required',
    })
    .max(5, {
      message: 'Maximum 5 characters required',
    }),
});

export type LoginSchemaDef = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const form = useForm<LoginSchemaDef>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  return form;
};

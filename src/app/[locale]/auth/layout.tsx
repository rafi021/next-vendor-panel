import AuthLayoutWrapper from '@/components/layouts/auth';
import { ReactElement } from 'react';

export default async function AuthLayout({
  children,
}: {
  children: ReactElement;
}) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}

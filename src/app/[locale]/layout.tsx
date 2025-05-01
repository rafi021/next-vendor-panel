import { ReactElement } from 'react';
import { I18nProviderClient } from '@/locales/client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default async function SubLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) {
  const { locale } = await params;
  return (
    <NuqsAdapter>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </NuqsAdapter>
  );
}

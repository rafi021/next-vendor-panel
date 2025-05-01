'use client';

import { useCurrentLocale } from '@/locales/client';
//import Buttons from "./buttons";
import dynamic from 'next/dynamic';

const LangButton = dynamic(() => import('./buttons'), { ssr: false });

export default function Page() {
  const locale = useCurrentLocale();

  return (
    <>
      <p>Current locale: {locale}</p>
      <LangButton />
    </>
  );
}

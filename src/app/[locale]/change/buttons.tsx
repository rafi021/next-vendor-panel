'use client';
import { useChangeLocale } from '@/locales/client';
import { Suspense } from 'react';

export default function Buttons() {
  const changeLocale = useChangeLocale();

  return (
    <Suspense>
      <div className="flex gap-12">
        <button className="px-6 bg-red-700" onClick={() => changeLocale('en')}>
          English
        </button>
        <button
          className="px-6 bg-green-700"
          onClick={() => changeLocale('bn')}
        >
          Bangla
        </button>
      </div>
    </Suspense>
  );
}

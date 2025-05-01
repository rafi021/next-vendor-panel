'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { House } from 'lucide-react';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BreadcrumbWithCurrentPath = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length == 0) return null;

  // Helper function to capitalize the first letter of a string
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const createTitle = (str: string) =>
    str
      .split('-')
      .map((word) => capitalize(word))
      .join(' ');
  return (
    <Breadcrumb className="hidden md:flex bg-gray-100 bg-opacity-50 backdrop-blur items-center justify-between sticky top-[72px] right-0 z-10 px-space16 py-space12">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/" className="hover:text-black" title="Go To Dashborad">
            <House size={16} />
          </Link>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === pathSegments.length - 1 ? (
                  <Link
                    href={href}
                    className="hover:underline text-blue-600 hover:text-blue-800"
                    title={createTitle(segment)}
                  >
                    {createTitle(segment)}
                  </Link>
                ) : (
                  <Link
                    href={href}
                    className="hover:underline hover:text-black"
                    title={createTitle(segment)}
                  >
                    {createTitle(segment)}
                  </Link>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbWithCurrentPath;

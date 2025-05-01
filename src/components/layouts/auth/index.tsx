'use client';
import React from 'react';
import FooterNavigate from './FooterNavigate';
import { usePathname } from 'next/navigation';
import { Image } from '@/components/common/Image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1440px] min-h-full rounded flex bg-gray-50">
        {/* Left Section */}
        <section className="hidden md:flex flex-col justify-between w-full max-w-[320px] lg:max-w-[448px] px-space24 py-space24 bg-white">
          <div className="">
            <Image
              height={32}
              width={162}
              src={'/brand.svg'}
              alt="Molymart Logo"
              className="mb-space32"
            />
            <article className="space-y-4">
              <h1 className="font-semibold text-xl text-black">
                A Universal Tool for Vendor Solution
              </h1>
              <p className="text-gray-500 text-sm">
                The Molymart Vendor Management System simplifies vendor
                management with centralized data, real-time analytics, and
                workflow integration, improving efficiency and collaboration.
              </p>
            </article>
          </div>
          <Image
            width={0}
            height={0}
            alt="image"
            sizes="100vw"
            src={'/illustration.png'}
            className="h-full w-full object-cover"
            wrapperClasses="max-h-[278px] w-full h-full"
          />
        </section>

        {/* Right Section */}
        <section className="flex w-full justify-center items-center bg-gray-50">
          <Card
            className={` ${pathname === '/auth' ? 'max-w-[604px]' : 'max-w-[904px]'} w-full rounded`}
          >
            <CardHeader className="p-space16 border-b border-gray-300">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                {pathname === '/auth' ? (
                  <article className=" md:text-start text-center">
                    <h2 className="text-xl font-semibold">
                      Welcome back to codemoly
                    </h2>
                    <p className="text-gray-500 text-sm">
                      You can signin by your phone number.
                    </p>
                  </article>
                ) : (
                  <article className=" md:text-start text-center">
                    <h2 className="text-xl font-semibold">
                      Please create your Molymart Account
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Create your Molymart Account in less than 5 minutes.
                    </p>
                  </article>
                )}
              </div>
            </CardHeader>

            <CardContent className="!p-0">{children}</CardContent>

            <FooterNavigate />
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;

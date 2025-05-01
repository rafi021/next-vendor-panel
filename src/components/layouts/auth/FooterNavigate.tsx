'use client';
import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FooterNavigate = () => {
  const pathname = usePathname();

  return (
    <div className="p-space16 pt-0">
      {pathname === '/auth' ? (
        <div className="text-sm font-medium">
          Create a new account?
          <Link href={`/auth/onboard`}>
            <Button variant={'link'}>Sign up</Button>
          </Link>
        </div>
      ) : (
        <div className="text-sm font-medium">
          Already have an account?{' '}
          <Link href={`/auth`}>
            <Button variant={'link'}>Log In</Button>
          </Link>{' '}
        </div>
      )}
    </div>
  );
};

export default FooterNavigate;

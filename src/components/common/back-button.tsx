'use client';
import { CircleArrowLeft } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next-nprogress-bar';

type BackButtonProps = {
  href?: string;
  className?: string;
};

/*** A button that navigates back in the browser history when clicked.
 ** @param {string} href - The URL to navigate to when the button is clicked. If not provided, the button will navigate back in the browser history.
 ** @param {string} className - The class name to apply to the button.
 */
const BackButton: React.FC<BackButtonProps> = ({ href, className }) => {
  const router = useRouter();
  return (
    <Button
      variant={'white'}
      size={'sm'}
      onClick={(e) => {
        if (!href) {
          e.preventDefault();
          router.back();
        } else {
          router.push(href);
        }
      }}
      className={` ${className}`}
      aria-label="Go back"
    >
      <CircleArrowLeft size={20} />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;

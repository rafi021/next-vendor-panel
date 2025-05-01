import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import ProgressProvider from '@/providers/ProgressProvider';
import '@/styles/globals.css';
import 'suneditor/dist/css/suneditor.min.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vendor Dashboard',
  icons: ['/favicon.svg'], //, '/favicon.jpeg'
  description: 'Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'}>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} relative`}
      >
        <ProgressProvider />
        {children}
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}

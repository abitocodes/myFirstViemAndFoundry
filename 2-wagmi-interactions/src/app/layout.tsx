import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Web3Modal } from '@/context/Web3Modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2-wagmi-interactions',
  description: 'implementations of interactions with wagmi',
};

export default function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}
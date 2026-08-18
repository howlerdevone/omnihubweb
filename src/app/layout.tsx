import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastDisplay, ToastProvider } from '@/components/custom';
import './globals.css';

const geistSans = Geist({
  variable: '--font-sans', // Dynamic mapping with your globals.css
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Omnihub Nebula',
  description: 'The intelligent command center for your high-productivity ecosystem.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://googleapis.com" rel="stylesheet" precedence="default" />
      </head>
      <body className="bg-background text-foreground">
        <ToastProvider>
          {children}
          <ToastDisplay />
        </ToastProvider>
      </body>
    </html>
  );
}

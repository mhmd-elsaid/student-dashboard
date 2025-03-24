import React from 'react';
import { Inter } from 'next/font/google';
import QueryProvider from '@/components/providers/QueryProvider';
import Navigation from '@/components/layout/Navigation';
import { AuthProvider } from '@/lib/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Student Dashboard',
  description: 'Access your courses and assignments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <Navigation />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
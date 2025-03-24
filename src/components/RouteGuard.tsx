'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';

// Add additional public paths as needed
const publicPaths = ['/login', '/register', '/forgot-password'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Auth check function
    const checkAuth = () => {
      // Get the path from the location
      const path = pathname;
      
      // Extract locale from path if present
      const pathWithoutLocale = path.split('/').slice(2).join('/');
      const isPublicPath = publicPaths.some(publicPath => 
        path.endsWith(publicPath) || path === '/' + publicPath
      );
      
      // If not authenticated and not a public path, redirect to login
      if (!isAuthenticated && !isPublicPath && !loading) {
        router.push('/login');
      }
    };
    
    // Run auth check on initial load and route change
    checkAuth();
  }, [isAuthenticated, pathname, loading, router]);
  
  // Show loading or spinner when checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If authenticated or public path, render children
  return <>{children}</>;
} 
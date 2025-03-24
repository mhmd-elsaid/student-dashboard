'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Call the logout function from AuthContext
    logout();
    
    // If for some reason the logout doesn't redirect (it should),
    // we'll redirect manually after a short delay
    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [logout, router]);

  // While logout is processing, show a simple loading message
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p className="text-gray-600">Please wait while we log you out.</p>
      </div>
    </div>
  );
}

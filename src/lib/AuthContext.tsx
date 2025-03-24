'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { login as authLogin } from './auth';

interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authLogin(email, password);
      
      if (result.success && result.user && result.token) {
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('auth_user', JSON.stringify(result.user));
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.message || 'Login failed');
        return false;
      }
    } catch (e) {
      setError('An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
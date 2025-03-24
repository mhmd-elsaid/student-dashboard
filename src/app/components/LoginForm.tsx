'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Initialize translations
  const t = useTranslations('auth');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulating API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      console.log('Login successful:', result);
      
    } catch (err) {
      setError(t('errors.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white relative">
      <LanguageSwitcher />
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg">

        {/* Form Header */}
        <div className="text-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('title')}
          </h1>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors relative"
          >
            <img 
              src="/google-icon.svg" 
              alt="Google" 
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">{t('socialLogin.google')}</span>
          </button>
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors relative"
          >
            <img 
              src="/facebook-icon.svg" 
              alt="Facebook" 
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">{t('socialLogin.facebook')}</span>
          </button>
        </div>

        {/* OR Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">{t('or')}</span>
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <div className="relative">
              <input
                {...register('email', {
                  required: t('form.email.required'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('form.email.invalid'),
                  },
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t('form.email.placeholder')}
                dir="auto"
              />
              <div className="absolute end-3 top-3 text-gray-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 text-right">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <input
                {...register('password', {
                  required: t('form.password.required'),
                })}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t('form.password.placeholder')}
                dir="auto"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-3 text-gray-400"
                aria-label={showPassword ? t('form.password.hide') : t('form.password.show')}
              >
                {showPassword ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 text-right">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-purple-600 hover:text-purple-800 text-sm">
              {t('form.forgotPassword')}
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              disabled={isLoading}
            >
              {isLoading ? t('form.submit.loading') : t('form.submit.default')}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('register.prompt')}{' '}
            <Link href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
              {t('register.link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

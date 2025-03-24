'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface ForgotPasswordData {
  email: string;
}

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulating API call
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setIsSubmitted(true);
      
    } catch (err) {
      setError('حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg">
        {/* Close button */}
        <div className="text-right">
          <Link href="/login" className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Link>
        </div>

        {/* Form Header */}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            استعادة كلمة المرور
          </h1>
          <p className="text-gray-600 mb-8">
            أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-right">
            <h3 className="text-green-800 font-medium mb-2">تم إرسال رابط إعادة تعيين كلمة المرور</h3>
            <p className="text-green-700">
              تم إرسال بريد إلكتروني يحتوي على رابط لإعادة تعيين كلمة المرور إلى عنوان بريدك الإلكتروني. يرجى التحقق من بريدك الإلكتروني.
            </p>
            <div className="mt-4">
              <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div>
              <div className="relative">
                <input
                  {...register('email', {
                    required: 'البريد الإلكتروني مطلوب',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'البريد الإلكتروني غير صالح',
                    },
                  })}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="البريد الإلكتروني"
                  dir="rtl"
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 text-right">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'جاري المعالجة...' : 'إرسال رابط إعادة التعيين'}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

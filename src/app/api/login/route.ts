import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { login } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Attempt login
    const result = await login(email, password);
    
    if (result.success && result.user && result.token) {
      // Set cookie for server-side auth check
      const cookieStore = cookies();
      cookieStore.set('auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      // Return success response with user data but without sensitive info
      return NextResponse.json({
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          isActive: result.user.isActive,
        },
        token: result.token,
      });
    } else {
      return NextResponse.json(
        { error: result.message || 'Login failed' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 
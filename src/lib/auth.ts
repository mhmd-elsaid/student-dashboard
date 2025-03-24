import { jwtVerify, SignJWT } from 'jose';

interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

// Mock user for demo purposes
const MOCK_USER: User = {
  id: '1',
  email: 'asd@asd.asd',
  name: 'Test User',
  isActive: true,
};

// Secret key for JWT signing (in production, use env variables)
const JWT_SECRET = new TextEncoder().encode('your-secret-key');

export async function login(email: string, password: string) {
  // For demo purposes, only validate specific credentials
  if (email === 'asd@asd.asd' && password === 'Test1234@') {
    // Create a JWT token
    const token = await new SignJWT({ userId: MOCK_USER.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET);
    
    // In a real app, you might also set this in cookies or use refresh tokens
    return { success: true, token, user: MOCK_USER };
  }
  
  return { success: false, message: 'Invalid email or password' };
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { 
      isValid: true, 
      userId: payload.userId as string 
    };
  } catch (error) {
    return { isValid: false, userId: null };
  }
}

export async function getUser(userId: string): Promise<User | null> {
  // In a real app, you would fetch this from a database
  if (userId === MOCK_USER.id) {
    return MOCK_USER;
  }
  return null;
}

export function isAuthenticated() {
  // Check client-side if we have a token
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
  return false;
} 

import { Metadata } from 'next';
import { LoginForm } from '../../components/LoginForm';

export const metadata: Metadata = {
  title: 'Login | Your App Name',
  description: 'Login to access your account',
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
} 
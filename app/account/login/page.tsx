'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const addToast = useToastStore((state) => state.addToast);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        addToast('success', 'Welcome back!');
        router.push('/account');
      }
    } catch (error) {
      addToast('error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Log In</CardTitle>
            <p className="text-center text-gray-600 text-sm">
              Welcome back! Please log in to your account.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/account/register" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Demo:</strong> Use any email and password to log in (fake authentication)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

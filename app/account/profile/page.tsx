'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile } = useUserStore();
  const addToast = useToastStore((state) => state.addToast);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    addToast('success', 'Profile updated successfully!');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Link href="/account" className="text-blue-600 hover:underline">
            Back to Account
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="lg">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Account ID</span>
              <span className="font-medium">{user.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Account Type</span>
              <span className="font-medium">Standard</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

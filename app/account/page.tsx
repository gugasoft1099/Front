'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useOrderStore } from '@/store/orderStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUserStore();
  const orders = useOrderStore((state) => state.orders);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    addToast('info', 'Logged out successfully');
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/account/orders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{orders.length}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/wishlist">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{wishlistCount}</p>
                    <p className="text-sm text-gray-600">Wishlist Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/account/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Profile</p>
                    <p className="text-sm text-gray-600">View & Edit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/account/orders">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  View Order History
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  View Wishlist
                </Button>
              </Link>
              <Link href="/account/profile">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <Link
                      key={order.id}
                      href={`/account/orders`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-600">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link href="/catalog">
                    <Button size="sm">Start Shopping</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useOrderStore } from '@/store/orderStore';
import Badge from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const orders = useOrderStore((state) => state.orders);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const statusVariants = {
    pending: 'warning' as const,
    processing: 'info' as const,
    shipped: 'info' as const,
    delivered: 'success' as const,
    cancelled: 'danger' as const
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Order History</h1>
          <Link href="/account" className="text-blue-600 hover:underline">
            Back to Account
          </Link>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">
                Start shopping to see your orders here!
              </p>
              <Link href="/catalog">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Browse Products
                </button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Order #{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                    </div>
                    <Badge variant={statusVariants[order.status]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-medium hover:text-blue-600"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                            {item.selectedColor && ` • ${item.selectedColor}`}
                            {item.selectedSize && ` • Size ${item.selectedSize}`}
                          </p>
                        </div>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <p className="text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                      <p className="font-bold text-lg mt-1">
                        Total: {formatPrice(order.total)}
                      </p>
                    </div>
                    <Link href={`/checkout/success?order=${order.orderNumber}`}>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { useOrderStore } from '@/store/orderStore';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const getOrderByNumber = useOrderStore((state) => state.getOrderByNumber);
  const [order, setOrder] = useState(getOrderByNumber(orderNumber || ''));

  useEffect(() => {
    if (orderNumber) {
      const foundOrder = getOrderByNumber(orderNumber);
      setOrder(foundOrder);
    }
  }, [orderNumber, getOrderByNumber]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We&apos;ll send you a confirmation email shortly.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Order #{order.orderNumber}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{formatDate(order.date)}</p>
              </div>
              <Badge variant="info">{order.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-3">Items Ordered</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                        {item.selectedColor && ` • Color: ${item.selectedColor}`}
                        {item.selectedSize && ` • Size: ${item.selectedSize}`}
                      </p>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Shipping Address</h3>
              <p className="text-sm">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.addressLine1}<br />
                {order.shippingAddress.addressLine2 && (
                  <>{order.shippingAddress.addressLine2}<br /></>
                )}
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}<br />
                {order.shippingAddress.phone}
              </p>
            </div>

            {/* Shipping Method */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Shipping Method</h3>
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{order.shippingMethod.name}</p>
                  <p className="text-sm text-gray-600">{order.shippingMethod.description}</p>
                </div>
                <span className="font-medium">
                  {order.shippingMethod.price === 0
                    ? 'FREE'
                    : formatPrice(order.shippingMethod.price)}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <p className="text-sm">{order.paymentMethod.name}</p>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Tracking */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium">Order Placed</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-xs text-gray-600">Processing</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-xs text-gray-600">Shipped</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Home className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-xs text-gray-600">Delivered</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Estimated delivery: {order.shippingMethod.estimatedDays}
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/account/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link href="/catalog" className="flex-1">
            <Button className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading order details...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

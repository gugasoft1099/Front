'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const addToast = useToastStore((state) => state.addToast);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = appliedCoupon === 'SAVE10' ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon('SAVE10');
      addToast('success', 'Coupon applied! You saved 10%');
    } else {
      addToast('error', 'Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
    addToast('info', 'Coupon removed');
  };

  const handleUpdateQuantity = (
    productId: string,
    newQuantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity, selectedColor, selectedSize);
  };

  const handleRemoveItem = (productId: string, selectedColor?: string, selectedSize?: string) => {
    removeItem(productId, selectedColor, selectedSize);
    addToast('info', 'Item removed from cart');
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      addToast('info', 'Cart cleared');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link href="/catalog">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="ghost" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemKey = `${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`;
            return (
              <Card key={itemKey}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-semibold hover:text-blue-600"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">{item.product.brand}</p>
                          {item.selectedColor && (
                            <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                          )}
                          {item.selectedSize && (
                            <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveItem(item.product.id, item.selectedColor, item.selectedSize)
                          }
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            disabled={item.quantity >= item.product.stockCount}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="inline w-4 h-4 mr-1" />
                  Have a coupon?
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <span className="text-sm font-medium text-green-700">
                      {appliedCoupon} applied
                    </span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={handleApplyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Try code: SAVE10</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">🎉 Free shipping applied!</p>
                )}
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button variant="outline" className="w-full mt-2">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>✓ Secure checkout</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Customer support 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

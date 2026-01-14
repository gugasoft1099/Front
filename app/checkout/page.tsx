'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, CreditCard, MapPin, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { useUserStore } from '@/store/userStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import { shippingMethods, paymentMethods } from '@/data/mockData';
import { Address, ShippingMethod, PaymentMethod } from '@/types';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const addToast = useToastStore((state) => state.addToast);

  const [step, setStep] = useState(1); // 1: Address, 2: Shipping, 3: Payment
  const [address, setAddress] = useState<Partial<Address>>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(shippingMethods[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const subtotal = getTotal();
  const shippingCost = selectedShipping.price;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/catalog">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to checkout</h1>
        <Link href="/account/login">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.addressLine1 || !address.city || !address.state || !address.zipCode || !address.phone) {
      addToast('error', 'Please fill in all required fields');
      return;
    }
    setStep(2);
  };

  const handleShippingSubmit = () => {
    setStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedPayment.id === '1') {
      // Credit Card validation
      if (!cardNumber || !cardExpiry || !cardCVV) {
        addToast('error', 'Please fill in all card details');
        return;
      }
    }

    // Create order
    const order = {
      id: Math.random().toString(36).substring(7),
      orderNumber: generateOrderNumber(),
      date: Date.now(),
      status: 'processing' as const,
      items,
      subtotal,
      shipping: shippingCost,
      tax,
      discount: 0,
      total,
      shippingAddress: {
        id: '1',
        ...address
      } as Address,
      shippingMethod: selectedShipping,
      paymentMethod: selectedPayment
    };

    addOrder(order);
    clearCart();
    addToast('success', 'Order placed successfully!');
    router.push(`/checkout/success?order=${order.orderNumber}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <StepIndicator number={1} label="Address" active={step >= 1} completed={step > 1} />
          <div className={`h-1 w-20 ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <StepIndicator number={2} label="Shipping" active={step >= 2} completed={step > 2} />
          <div className={`h-1 w-20 ${step > 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <StepIndicator number={3} label="Payment" active={step >= 3} completed={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <Input
                    label="Full Name *"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    required
                  />
                  <Input
                    label="Address Line 1 *"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    required
                  />
                  <Input
                    label="Address Line 2"
                    value={address.addressLine2}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City *"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      required
                    />
                    <Input
                      label="State *"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="ZIP Code *"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      required
                    />
                    <Input
                      label="Country *"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Phone Number *"
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    required
                  />
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Shipping
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedShipping.id === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping.id === method.id}
                        onChange={() => setSelectedShipping(method)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <span className="font-bold">
                      {method.price === 0 ? 'FREE' : formatPrice(method.price)}
                    </span>
                  </label>
                ))}
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleShippingSubmit} className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="space-y-2 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedPayment.id === method.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={selectedPayment.id === method.id}
                            onChange={() => setSelectedPayment(method)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <div>
                            <p className="font-semibold">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Credit Card Form */}
                  {selectedPayment.id === '1' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          required
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                      Place Order
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
          completed
            ? 'bg-blue-600 text-white'
            : active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        {completed ? <Check className="w-5 h-5" /> : number}
      </div>
      <span className={`text-sm mt-2 ${active ? 'font-semibold' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
  );
}

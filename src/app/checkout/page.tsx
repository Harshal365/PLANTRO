'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Truck, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Shield, 
  ArrowRight,
  Check,
  ShoppingBag
} from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    bankName: '',
  });

  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);
  const total = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    console.log('Order placed:', { ...formData, paymentMethod: selectedPayment, items });
    alert('Order placed successfully! (Demo)');
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Checkout</h1>
            <p className="text-muted-foreground">Complete your order and get ready to grow your plant family</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl">Shipping Address</CardTitle>
                      <CardDescription>Where should we deliver your plants?</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="8149082102"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Street Address *
                      </label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Plant Street, Apt 4B"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        City *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-sm font-medium">
                        State *
                      </label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="pincode" className="text-sm font-medium">
                        PIN Code *
                      </label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl">Payment Method</CardTitle>
                      <CardDescription>Choose your preferred payment option</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* UPI */}
                  <div
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === 'upi'
                        ? 'border-forest bg-forest/5'
                        : 'border-border hover:border-forest/50'
                    }`}
                    onClick={() => setSelectedPayment('upi')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-forest" />
                        <div>
                          <p className="font-semibold">UPI Payment</p>
                          <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                      {selectedPayment === 'upi' && (
                        <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    {selectedPayment === 'upi' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <div className="space-y-2">
                          <label htmlFor="upiId" className="text-sm font-medium">
                            UPI ID *
                          </label>
                          <Input
                            id="upiId"
                            name="upiId"
                            placeholder="yourname@upi"
                            value={formData.upiId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Credit/Debit Card */}
                  <div
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === 'card'
                        ? 'border-forest bg-forest/5'
                        : 'border-border hover:border-forest/50'
                    }`}
                    onClick={() => setSelectedPayment('card')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-forest" />
                        <div>
                          <p className="font-semibold">Credit / Debit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                      {selectedPayment === 'card' && (
                        <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    {selectedPayment === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-border space-y-4"
                      >
                        <div className="space-y-2">
                          <label htmlFor="cardNumber" className="text-sm font-medium">
                            Card Number *
                          </label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            maxLength={19}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="cardName" className="text-sm font-medium">
                            Cardholder Name *
                          </label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="cardExpiry" className="text-sm font-medium">
                              Expiry Date *
                            </label>
                            <Input
                              id="cardExpiry"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="cardCvv" className="text-sm font-medium">
                              CVV *
                            </label>
                            <Input
                              id="cardCvv"
                              name="cardCvv"
                              placeholder="123"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === 'netbanking'
                        ? 'border-forest bg-forest/5'
                        : 'border-border hover:border-forest/50'
                    }`}
                    onClick={() => setSelectedPayment('netbanking')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Banknote className="h-5 w-5 text-forest" />
                        <div>
                          <p className="font-semibold">Net Banking</p>
                          <p className="text-sm text-muted-foreground">All major banks supported</p>
                        </div>
                      </div>
                      {selectedPayment === 'netbanking' && (
                        <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    {selectedPayment === 'netbanking' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <div className="space-y-2">
                          <label htmlFor="bankName" className="text-sm font-medium">
                            Select Bank *
                          </label>
                          <select
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            className="w-full h-10 md:h-11 px-3 rounded-md border border-input bg-background"
                          >
                            <option value="">Select your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                            <option value="other">Other Bank</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === 'cod'
                        ? 'border-forest bg-forest/5'
                        : 'border-border hover:border-forest/50'
                    }`}
                    onClick={() => setSelectedPayment('cod')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Banknote className="h-5 w-5 text-forest" />
                        <div>
                          <p className="font-semibold">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your plants</p>
                        </div>
                      </div>
                      {selectedPayment === 'cod' && (
                        <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                      <Truck className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl">Order Summary</CardTitle>
                      <CardDescription>Review your order details</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  {items.length > 0 && (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">₹{item.product.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      <Separator />
                    </div>
                  )}

                  {items.length === 0 && (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
                      <Link href="/shop">
                        <Button variant="outline" size="sm" className="w-full">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  )}

                  {items.length > 0 && (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className={`font-medium ${shipping === 0 ? 'text-forest' : ''}`}>
                            {shipping === 0 ? 'FREE' : `₹${shipping}`}
                          </span>
                        </div>
                        {shipping > 0 && (
                          <p className="text-xs text-forest">
                            Add ₹{999 - totalPrice} more for free shipping
                          </p>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax (18% GST)</span>
                          <span className="font-medium">₹{tax}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-forest">₹{total}</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="bg-forest/5 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Your payment is secure with SSL encryption
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Free delivery on all orders
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={items.length === 0}
                    className="w-full bg-forest text-primary-foreground hover:bg-forest/90 h-12 text-base btn-hover-lift group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Place Order
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

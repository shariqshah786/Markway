"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { state, dispatch } = useCart();

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  return (
    <main className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-semibold text-charcoal mb-12">Your Cart</h1>
        
        {state.items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-heading text-charcoal mb-4">Your cart is currently empty.</h2>
            <Link href="/shop" className="inline-block bg-charcoal text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="border-b border-gray-200 pb-4 flex justify-between text-xs font-bold uppercase tracking-widest text-slate mb-8">
                <span>Product</span>
                <div className="hidden sm:flex space-x-16">
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
              </div>

              {state.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-gray-200 gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-32 bg-slate-300 flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-slate-500 mix-blend-multiply opacity-20"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-charcoal mb-1">{item.name}</h3>
                      {item.color && <p className="text-sm text-slate mb-3">Color: {item.color}</p>}
                      <button onClick={() => handleRemove(item.id)} className="text-xs font-bold uppercase tracking-widest text-slate hover:text-red-500 transition">Remove</button>
                    </div>
                  </div>
                  
                  <div className="flex sm:hidden justify-between w-full border-t border-gray-200 pt-4 mt-2">
                    <span className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>

                  <div className="hidden sm:flex items-center space-x-16">
                    <div className="flex items-center border border-gray-300">
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-slate hover:bg-gray-100 transition">-</button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-slate hover:bg-gray-100 transition">+</button>
                    </div>
                    <span className="text-sm font-medium text-charcoal w-24 text-right">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-8 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-heading font-semibold text-charcoal mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
                
                <div className="space-y-4 text-sm font-medium text-slate mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-charcoal">₹{state.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-charcoal">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-charcoal">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest text-charcoal">Total</span>
                  <span className="text-2xl font-heading font-semibold text-charcoal">₹{state.total.toLocaleString()}</span>
                </div>

                <Link href="/checkout" className="block w-full text-center bg-charcoal text-white py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition shadow-xl mb-4">
                  Secure Checkout
                </Link>
                
                <p className="text-xs text-center text-slate font-light">
                  Secure checkout powered by Stripe / Razorpay
                </p>
              </div>

              <div className="mt-8 bg-gray-100 p-6 flex items-start gap-4 text-sm text-slate">
                <svg className="w-6 h-6 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <div>
                  <span className="font-bold text-charcoal block mb-1">Lifetime Warranty</span>
                  All Markway luggage is covered by our limited lifetime warranty against any functional damage.
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

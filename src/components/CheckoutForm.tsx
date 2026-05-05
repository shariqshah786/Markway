"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { createOrder } from "@/actions/orderActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutForm() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) return;

    setLoading(true);
    const orderData = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip: formData.zip,
        },
      },
      items: state.items,
      totalAmount: state.total,
      paymentMethod: "Stripe",
    };

    const result = await createOrder(orderData);

    if (result.success) {
      dispatch({ type: "CLEAR_CART" });
      router.push(`/checkout/success?id=${result.orderId}`);
    } else {
      alert("Failed to create order. Please try again.");
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-heading text-charcoal mb-4">Your cart is empty.</h2>
        <Link href="/shop" className="text-gold underline">Go back to shop</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
      {/* Checkout Form */}
      <div className="lg:w-2/3">
        <div className="bg-white p-8 border border-gray-200 mb-6 shadow-sm">
          <h2 className="text-xl font-heading font-semibold text-charcoal mb-6 border-b border-gray-200 pb-4">1. Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
                placeholder="you@example.com" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-200 mb-6 shadow-sm">
          <h2 className="text-xl font-heading font-semibold text-charcoal mb-6 border-b border-gray-200 pb-4">2. Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
                placeholder="Street Address" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">City</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Country / Region</label>
              <select 
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-transparent"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">State / Province</label>
              <input 
                type="text" 
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">ZIP / Postal Code</label>
              <input 
                type="text" 
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-200 mb-6 shadow-sm">
          <h2 className="text-xl font-heading font-semibold text-charcoal mb-6 border-b border-gray-200 pb-4">3. Payment</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gold bg-gold/5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-3">
                <input type="radio" name="payment" className="h-4 w-4 text-gold focus:ring-gold border-gray-300" defaultChecked />
                <span className="text-sm font-medium text-charcoal">Credit Card (Stripe)</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-gray-50 p-6 border border-gray-200 text-center text-sm text-slate">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Payment is processed securely. We do not store your credit card information.
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-charcoal text-white py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition shadow-xl mb-4 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${state.total.toLocaleString()}`}
        </button>
        <Link href="/cart" className="block text-center text-sm font-medium text-slate hover:text-charcoal transition">
          Return to Cart
        </Link>
      </div>

      {/* Order Summary (Sidebar) */}
      <div className="lg:w-1/3">
        <div className="bg-white p-8 border border-gray-200 shadow-sm sticky top-32">
          <h2 className="text-lg font-heading font-semibold text-charcoal mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
          
          <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-20 bg-slate-300 flex-shrink-0 relative">
                  <div className="absolute -top-2 -right-2 bg-charcoal text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-heading font-semibold text-charcoal">{item.name}</h4>
                  <p className="text-xs text-slate">{item.color || "Standard"}</p>
                </div>
                <span className="text-sm font-medium text-charcoal">₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm font-medium text-slate mb-6 border-t border-gray-200 pt-6">
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
              <span className="text-charcoal">₹0.00</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
            <span className="text-sm font-bold uppercase tracking-widest text-charcoal">Total</span>
            <span className="text-2xl font-heading font-semibold text-charcoal">₹{state.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </form>
  );
}

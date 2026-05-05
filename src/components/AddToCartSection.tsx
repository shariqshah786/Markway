"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  color?: string;
  image?: string;
}

export default function AddToCartSection({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="sticky top-24 bg-ivory py-4">
      <button 
        onClick={handleAddToCart}
        className="w-full bg-charcoal text-white py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold transition shadow-xl mb-4 flex items-center justify-center"
      >
        {added ? "Added to Cart ✓" : `Add to Cart — ₹${product.price.toLocaleString()}`}
      </button>
      
      <div className="flex items-center justify-center space-x-2 text-xs text-slate font-medium">
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        <span>In stock and ready to ship</span>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  slug: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [adding, setAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0]
      }
    });
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <Link href={`/product/${product._id}`} className="group cursor-pointer flex flex-col">
      <div className="relative h-[400px] w-full bg-gray-200 mb-6 overflow-hidden">
        {product.images?.[0] ? (
          product.images[0].startsWith('data:') || product.images[0].startsWith('/') ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
             <div className={`absolute inset-0 ${product.images[0]} mix-blend-multiply`}></div>
          )
        ) : (
          <div className="absolute inset-0 bg-slate-400 mix-blend-multiply"></div>
        )}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-500"></div>
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-black/40 to-transparent">
          <button 
            onClick={handleQuickAdd}
            disabled={adding}
            className="bg-white text-charcoal px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition shadow-lg transform translate-y-4 group-hover:translate-y-0 disabled:opacity-50"
          >
            {adding ? "Added!" : "Quick Add"}
          </button>
        </div>
      </div>
      <div className="text-center flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate uppercase tracking-widest block mb-2">{product.category}</span>
          <h3 className="text-lg font-heading font-semibold text-charcoal mb-2 group-hover:text-gold transition">{product.name}</h3>
        </div>
        <span className="text-sm font-medium text-charcoal mt-2 block">₹{product.price.toLocaleString()}</span>
      </div>
    </Link>
  );
}

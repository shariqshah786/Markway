"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export default function ShopSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "All";
  const [priceRange, setPriceRange] = useState(searchParams.get("maxPrice") || "100000");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" && name === "category") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (category: string) => {
    router.push(`/shop?${createQueryString("category", category)}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(e.target.value);
  };

  const applyPriceFilter = () => {
    router.push(`/shop?${createQueryString("maxPrice", priceRange)}`);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal mb-8 border-b border-gray-100 pb-4">Refine By</h2>
      
      <div className="mb-10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-6">Category</h3>
        <ul className="space-y-4">
          {["All", "Luggage", "Backpacks", "Accessories", "Bags"].map((cat) => (
            <li key={cat}>
              <button 
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm transition-all duration-300 flex items-center group ${
                  currentCategory === cat ? 'text-gold font-semibold translate-x-2' : 'text-slate hover:text-charcoal hover:translate-x-1'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all ${currentCategory === cat ? 'bg-gold opacity-100' : 'bg-gray-300 opacity-0 group-hover:opacity-100'}`}></span>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-6">Price Range</h3>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="1000"
            value={priceRange}
            onChange={handlePriceChange}
            onMouseUp={applyPriceFilter}
            onTouchEnd={applyPriceFilter}
            className="w-full accent-gold bg-gray-200 h-1 rounded-none appearance-none cursor-pointer" 
          />
          <div className="flex justify-between text-[10px] font-bold text-slate mt-4 uppercase tracking-tighter">
            <span>₹0</span>
            <span className="text-charcoal bg-gray-100 px-2 py-1">Up to ₹{Number(priceRange).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-6">Colors</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Black", bg: "bg-charcoal" },
            { name: "Silver", bg: "bg-gray-300" },
            { name: "Blue", bg: "bg-blue-900" },
            { name: "Gold", bg: "bg-gold" }
          ].map((color) => (
            <button 
              key={color.name} 
              title={color.name}
              className={`w-6 h-6 rounded-full ${color.bg} border border-gray-200 shadow-sm hover:scale-110 transition-transform focus:ring-2 focus:ring-gold focus:ring-offset-2`}
            ></button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => router.push('/shop')}
        className="w-full py-3 border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-slate hover:text-charcoal hover:border-charcoal transition-all"
      >
        Clear All Filters
      </button>
    </aside>
  );
}

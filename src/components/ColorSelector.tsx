"use client";

import { useState } from "react";

interface Color {
  name: string;
  hex: string;
}

export default function ColorSelector({ colors }: { colors: Color[] }) {
  const [selected, setSelected] = useState(0);

  if (!colors || colors.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-charcoal">
          Color: <span className="font-light text-slate uppercase tracking-normal">{colors[selected].name}</span>
        </span>
      </div>
      <div className="flex space-x-4">
        {colors.map((color, idx) => (
          <button 
            key={idx}
            onClick={() => setSelected(idx)}
            title={color.name}
            className={`w-10 h-10 rounded-full border transition-all duration-300 relative ${
              selected === idx 
                ? 'ring-2 ring-offset-2 ring-gold border-gold scale-110 shadow-md' 
                : 'border-gray-200 hover:scale-105'
            }`}
            style={{ backgroundColor: color.hex }}
          >
            {selected === idx && (
              <span className="absolute -inset-1 rounded-full border border-gold opacity-30 animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

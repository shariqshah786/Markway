"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[], name: string }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return <div className="flex-1 bg-gray-200 aspect-[3/4]"></div>;
  }

  return (
    <div className="lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 pb-4 md:pb-0">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`w-20 h-24 md:w-24 md:h-32 bg-gray-100 relative cursor-pointer border-2 transition shrink-0 ${activeIdx === i ? 'border-gold shadow-md' : 'border-transparent hover:border-gray-300'
              }`}
          >
            {img.startsWith('data:') || img.startsWith('/') ? (
              <Image src={img} alt={`${name} thumbnail ${i}`} width={200} height={300} className="w-full h-full object-cover" />
            ) : (
              <div className={`absolute inset-0 ${img} opacity-50`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-100 aspect-[3/4] md:h-[700px] relative overflow-hidden group cursor-crosshair">
        {images[activeIdx].startsWith('data:') || images[activeIdx].startsWith('/') ? (
          <Image
            src={images[activeIdx]}
            alt={name}
            width={800}
            height={1200}
            className="w-full h-full object-cover transition duration-700 hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 ${images[activeIdx]} opacity-20`}></div>
        )}

        <div className="absolute inset-0 bg-black/5 pointer-events-none transition group-hover:bg-transparent"></div>

        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur text-charcoal px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center shadow-lg">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Detailed View
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAzaPzMuEjO2iR4ZltNfhgG5yP_-yAphx2CrPx8hDvH70EmSrx8MScac6GU7te_lal1okSmA-e0nEIumRmxkjkZlpeo4tnSsZ8K1IFoIl4--eHc_RPyn_lx0QcxO9AeEJJ2rdQHM_HetMK72mIkpsrlt65ycaXtZ37izRsJ4WAUxiLwoAaW8iZ5oLL3IhWOZvhd7GCU_YzP8S1Ua8q_-cAKZDA2bmTZ__cUBzpekCfuLyeQneKxTSlSxJq1wEbt8eN40wq8rTp_skw",
    title: "Redefining the Art of Departure",
    tag: "New Arrival",
    cta: "Shop The Latest"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7syJw9cMkrQlSSgFWsQqoosIdmKUFz9fmZQAXPixaVV3t9kmh8kK6E0VN8PiqgPFD_WzNMhkI0GnNhiRB5qk_lzJTMo06owfWP8WCz5bqMKhssYtWt0AL_oSxYs1Hkcz-xn0Mok_dRRzTmXKewIcuYowPZ0MrtnERAQMYX5MgpYty-5i0UviscLo2AK6iIKVdb05vKIp4PjEzI6ZvUix9Av493T2pvpU7Vb3QtDTh1ugxD0R3ud0yvoE5jjbMr6RxzMtPDVKSjqwz",
    title: "Engineered for the Modern Nomad",
    tag: "Latest Offer",
    cta: "View Collection"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbomrnJnvrw71Dr0Q1MIVGwphS81pd6Ekv8MvXOermEAggMBfqKTFoo9BpE02caJNuLm0BDRxTwpdQyE2-R2WbIoEv1VPY_M6Vq0DrW0OVs1RCLjdiuZV16AliQsqNYV3GbOLkr8yO4lTBr18hdIykH4w_Qy1WQYKikr88gWogscat3CVzsner8MF4Y7p2Or99hZSbuRaxHkzr2_CSRBpjlwT5dRU8yehVy6xE7BYGb19MV-yT1d-IxGxsv3yLPTnbxJEGleCpFAT8",
    title: "Crafted with Architectural Precision",
    tag: "Premium Quality",
    cta: "Explore Bags"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden group">
      <div
        className="hero-slider h-full w-[300%]"
        style={{ transform: `translateX(-${(current * 100) / 3}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-1/3 h-full relative">
            <Image
              src={slide.image}
              alt={slide.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute top-12 right-12">
              <span className="bg-primary text-on-primary px-5 py-1.5 font-bold uppercase tracking-[0.2em] text-[10px]">
                {slide.tag}
              </span>
            </div>
            <div className="absolute inset-0 flex items-end p-[5vw] pb-24">
              <div className="max-w-3xl">
                <h1 className="font-headline text-5xl md:text-7xl text-white mb-8 leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>
                <button className="h-[60px] px-10 bg-white text-primary font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-gold hover:text-white transition-all duration-500 shadow-2xl">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`slider-dot w-2 h-2 rounded-full border border-white/50 transition-all duration-500 ${current === idx ? 'bg-white scale-150 w-6 border-white' : 'bg-white/20'
              }`}
          ></button>
        ))}
      </div>

      {/* Side Navigation Buttons (Desktop) */}
      <div className="absolute inset-y-0 left-0 flex items-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)} className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-charcoal transition-all backdrop-blur-sm">←</button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-charcoal transition-all backdrop-blur-sm">→</button>
      </div>
    </section>
  );
}

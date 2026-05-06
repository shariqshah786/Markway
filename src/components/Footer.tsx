import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white w-full border-t border-neutral-900">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-neutral-900">
        <div className="max-w-[1440px] mx-auto px-[5vw] py-16 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <h3 className="font-headline text-2xl md:text-3xl text-white mb-2">Join the Inner Circle</h3>
            <p className="text-neutral-400 text-sm font-light">Exclusive access to limited collections and private sales.</p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-neutral-700 py-3 px-2 w-full sm:w-80 focus:outline-none focus:border-[#d4af37] text-sm text-white placeholder-neutral-500 transition-colors"
            />
            <button className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-white transition-all duration-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-[5vw] py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
        
        <div className="lg:col-span-4 space-y-8">
          <h4 className="font-headline font-bold text-2xl tracking-[0.2em] text-white">MARKWAY<br/>INTERNATIONAL</h4>
          <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm">
            Defining the future of luxury travel through precision engineering, sustainable materials, and architectural minimalism.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-[#d4af37] transition-colors">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-neutral-500 hover:text-[#d4af37] transition-colors">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-neutral-500 mb-8">EXPLORE</h5>
          <ul className="space-y-4 text-neutral-300 text-xs font-medium uppercase tracking-widest">
            <li><Link href="/shop" className="hover:text-[#d4af37] transition-colors">Collections</Link></li>
            <li><Link href="/shop?category=Bags" className="hover:text-[#d4af37] transition-colors">Travel Gear</Link></li>
            <li><Link href="/bespoke" className="hover:text-[#d4af37] transition-colors">Bespoke</Link></li>
            <li><Link href="/about" className="hover:text-[#d4af37] transition-colors">Heritage</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-neutral-500 mb-8">SUPPORT</h5>
          <ul className="space-y-4 text-neutral-300 text-xs font-medium uppercase tracking-widest">
            <li><Link href="/contact" className="hover:text-[#d4af37] transition-colors">Client Services</Link></li>
            <li><Link href="/shipping" className="hover:text-[#d4af37] transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/warranty" className="hover:text-[#d4af37] transition-colors">Warranty</Link></li>
            <li><Link href="/stores" className="hover:text-[#d4af37] transition-colors">Boutiques</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-neutral-500 mb-8">BOUTIQUES</h5>
          <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
            Experience Markway in person at our flagship locations in New York, London, Tokyo, and Dubai.
          </p>
          <Link href="/stores" className="inline-block border border-neutral-700 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300">
            Find a Boutique
          </Link>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto py-8 px-[5vw] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-bold uppercase tracking-[0.3em] text-[9px] text-neutral-500 text-center md:text-left">
            © 2024 Markway International. The Luxury of Space.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
             <Link href="/privacy" className="hover:text-[#d4af37] transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-[#d4af37] transition-colors">Terms of Service</Link>
             <Link href="/accessibility" className="hover:text-[#d4af37] transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

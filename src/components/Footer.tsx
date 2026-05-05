import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-stone-950 w-full border-t border-gray-100 dark:border-stone-800">
      <div className="max-w-[1440px] mx-auto px-[5vw] py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
        
        <div className="space-y-8">
          <h4 className="font-headline font-bold text-2xl tracking-widest text-charcoal">MARKWAY INTERNATIONAL</h4>
          <p className="text-slate text-sm font-light leading-relaxed">
            Defining the future of luxury travel through precision engineering and architectural minimalism.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-charcoal hover:text-gold transition">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-charcoal hover:text-gold transition">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-charcoal mb-8">EXPLORE</h5>
          <ul className="space-y-4 text-slate text-xs font-bold uppercase tracking-widest">
            <li><Link href="/shop" className="hover:text-gold transition">Collections</Link></li>
            <li><Link href="/shop?category=Bags" className="hover:text-gold transition">Travel Gear</Link></li>
            <li><Link href="/bespoke" className="hover:text-gold transition">Bespoke</Link></li>
            <li><Link href="/about" className="hover:text-gold transition">Heritage</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-charcoal mb-8">SUPPORT</h5>
          <ul className="space-y-4 text-slate text-xs font-bold uppercase tracking-widest">
            <li><Link href="/privacy" className="hover:text-gold transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold transition">Terms of Service</Link></li>
            <li><Link href="/shipping" className="hover:text-gold transition">Shipping & Returns</Link></li>
            <li><Link href="/stores" className="hover:text-gold transition">Store Locator</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-charcoal mb-8">CONNECT</h5>
          <p className="text-slate text-xs font-light leading-relaxed mb-8">
            Experience Markway International in person. Find our boutiques in major global hubs.
          </p>
          <div className="flex items-center gap-3 py-4 px-6 border border-gray-100 rounded-none shadow-sm">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">Secure Payment Systems</span>
          </div>
        </div>

      </div>
      
      <div className="border-t border-gray-100 py-10 px-[5vw] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-bold uppercase tracking-[0.3em] text-[9px] text-slate">
          © 2024 Markway International. The Luxury of Space.
        </p>
        <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest text-slate">
           <Link href="#" className="hover:text-gold transition">Accessibility</Link>
           <Link href="#" className="hover:text-gold transition">Sustainability</Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  {
    name: "Luggage",
    href: "/shop?category=Luggage",
    subCategories: [
      { name: "Luggage Sets", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD88xKvZFowa3SZKQ3JuijXzB248JXB1cMixvROVXElVAkZutH18yB-erVhZw1wLJ_tWiDViMgLYbp-Mf3dWAB6KoYjm6lzO0FVVTI14fzNLz_nVczsPvNGQLIjIxziFIJ_0dMLa-EYBoP8Bfjt2MDZxliKIO8FRwO5g6QdWwtp2ZJUVLwSUwlOpWYyOsvs6cgk-TUupGDYI52Ag1tj9HpiOg3wpSGKgdBYqEZ_j5Tgw4efRWE5YIHqUTxx6iC09MiF49JHJfhTyZP1" },
      { name: "Hardside", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQP9U16D2QgD67czd_qq8329NZA9mNnN_DQpcHFqwrneHL7QJPVIu6sh2CI16404vZNJlc9UGBCoIlmFLnppQqJ_yeerhRLwdKty0MuLOqxo6bOTEV4_HfNxonkd5JunMYX2QSQ6tJtkJlgcqNvdzVJDJtPiK_ZWkmx58D_Pc4XOSZzJNHE2tyqh8hCMqcaN6J6uuiWrVsGncA_xhOgCWwQOTk9BKBKOsb6VoS8CS43IziBQZYuauBKCmo5DnzKqvBBIwyeSRpy8mJ" },
      { name: "Softside", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbomrnJnvrw71Dr0Q1MIVGwphS81pd6Ekv8MvXOermEAggMBfqKTFoo9BpE02caJNuLm0BDRxTwpdQyE2-R2WbIoEv1VPY_M6Vq0DrW0OVs1RCLjdiuZV16AliQsqNYV3GbOLkr8yO4lTBr18hdIykH4w_Qy1WQYKikr88gWogscat3CVzsner8MF4Y7p2Or99hZSbuRaxHkzr2_CSRBpjlwT5dRU8yehVy6xE7BYGb19MV-yT1d-IxGxsv3yLPTnbxJEGleCpFAT8" },
      { name: "Business", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_MLhUD5b0RFO1_7m-ZWvW8FNVUikCTyFdkqOIgTFhCKPJiV88WzhRCTomvShB48ChgdVgB1irx4bjUZTlIwQsR7ywDkC3V0_9Q0xFrt1CKhnKeOkML9HnTceRr6HnoTIVQ9XP5eefxfy8HwjeHKDAIvXjsykWhJ24mgvGaRhxtm5NDOrapn7r67sCWcaMwlgg40zFA_7aBLju6HM0hKq-mCPhCOEknrmXdgKltqWfb53wt85YeRcCvq8zzTLDQmZ-bWS__7ODpKre" }
    ]
  },
  { name: "Backpack", href: "/shop?category=Backpack" },
  { name: "Kids Backpack", href: "/shop?category=Kids" },
  { name: "Accessories", href: "/shop?category=Accessories" },
  { name: "Store Locator", href: "/stores" },
  { name: "Gifting", href: "/gifting" },
  { name: "Shop By Video", href: "/videos" },
  { name: "Summer Sale", href: "/shop?sale=true", tag: "Live" }
];

export default function Navbar() {
  const { data: session } = useSession();
  const { state } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-white border-b border-gray-100"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex justify-between items-center h-20">

        {/* Logo Section */}
        <Link href="/" className="text-2xl font-heading font-bold tracking-wider text-charcoal shrink-0">
          MARKWAY
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden xl:flex items-center space-x-8 h-full">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="h-full flex items-center relative group"
              onMouseEnter={() => setHoveredCategory(link.name)}
            >
              <Link
                href={link.href}
                className={`text-[13px] font-semibold text-gray-800 hover:text-orange-600 transition-colors py-2 border-b-2 border-transparent hover:border-orange-600 ${hoveredCategory === link.name ? 'border-orange-600 text-orange-600' : ''}`}
              >
                {link.name}
                {link.tag && (
                  <span className="absolute -top-1 -right-4 bg-orange-600 text-white text-[8px] px-1 rounded-sm animate-pulse">
                    {link.tag}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Right Icons Section */}
        <div className="flex items-center space-x-4 md:space-x-6">

          {/* Mobile Hamburger Icon */}
          <div className="xl:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>

            {isSearchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-full mt-2 w-72 bg-white shadow-2xl border border-gray-100 p-2 z-[60]"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-200 py-2 px-3 text-sm focus:outline-none focus:border-orange-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            )}
          </div>

          {/* User Account */}
          <div className="relative group">
            <Link href={session ? "#" : "/login"} className="p-2 text-gray-700 hover:text-orange-600 transition block">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </Link>
            {session && (
              <div className="absolute right-0 top-full mt-0 w-48 bg-white shadow-2xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest">{session.user?.name}</div>
                <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition">Sign Out</button>
                {(session.user as { role?: string }).role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition">Admin Dashboard</Link>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="p-2 text-gray-700 hover:text-orange-600 transition relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-50 transition-all duration-300 transform ${hoveredCategory && navLinks.find(l => l.name === hoveredCategory)?.subCategories
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
      >
        <div className="max-w-7xl mx-auto px-10 py-12 flex justify-center space-x-12">
          {navLinks.find(l => l.name === hoveredCategory)?.subCategories?.map((sub) => (
            <Link
              key={sub.name}
              href={`/shop?category=${hoveredCategory}&type=${sub.name}`}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-6 bg-gray-50 flex items-center justify-center">
                <Image
                  src={sub.img}
                  alt={sub.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition">{sub.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 top-20 bg-white z-[40] px-6 py-8 overflow-y-auto transition-all duration-500 ease-in-out xl:hidden border-t border-gray-100 ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6 pb-20">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-gray-100 pb-4">
              <Link 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-heading font-semibold text-charcoal block hover:text-orange-600 transition"
              >
                {link.name}
              </Link>
              {link.subCategories && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {link.subCategories.map((sub) => (
                    <Link 
                      key={sub.name} 
                      href={`/shop?category=${link.name}&type=${sub.name}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium text-gray-500 block hover:text-orange-600 transition"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

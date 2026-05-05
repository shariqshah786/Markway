import Link from "next/link";
import { getProducts } from "@/actions/productActions";
import ProductCard from "@/components/ProductCard";
import ShopSidebar from "@/components/ShopSidebar";

export default async function Shop({ 
  searchParams 
}: { 
  searchParams: { category?: string, q?: string, maxPrice?: string } 
}) {
  const filters = {
    category: searchParams.category,
    q: searchParams.q,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  };

  const products = await getProducts(filters);

  return (
    <main className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Interactive Sidebar */}
          <ShopSidebar />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-4xl font-heading font-semibold text-charcoal mb-2">
                  {filters.q ? `Results for "${filters.q}"` : filters.category || "All Collections"}
                </h1>
                <p className="text-xs text-slate font-medium uppercase tracking-widest">
                  Showing {products.length} products
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-slate">
                <span className="text-charcoal">Sort By:</span>
                <select className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-gold transition">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-32 bg-gray-50/50 border border-dashed border-gray-200">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <h2 className="text-xl font-heading text-charcoal mb-2">No items found</h2>
                <p className="text-sm text-slate mb-8">Try adjusting your filters or search query.</p>
                <Link href="/shop" className="bg-charcoal text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition">
                  Reset All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product: { _id: string; name: string; price: number; category: string; images: string[]; slug: string }) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <div className="mt-24 flex justify-center items-center space-x-4">
                <button className="w-12 h-12 border border-charcoal bg-charcoal text-white flex items-center justify-center text-xs font-bold transition">1</button>
                <button className="w-12 h-12 border border-gray-200 flex items-center justify-center text-xs font-bold text-slate hover:border-gold hover:text-gold transition">2</button>
                <button className="w-12 h-12 border border-gray-200 flex items-center justify-center text-xs font-bold text-slate hover:border-gold hover:text-gold transition">→</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

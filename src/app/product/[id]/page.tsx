import Link from "next/link";
import { getProductById } from "@/actions/productActions";
import AddToCartSection from "@/components/AddToCartSection";
import ProductGallery from "@/components/ProductGallery";
import ColorSelector from "@/components/ColorSelector";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate uppercase tracking-widest mb-10">
          <Link href="/" className="hover:text-gold transition">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/shop" className="hover:text-gold transition">Shop</Link>
          <span className="text-gray-300">/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Client-side Image Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Product Info */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{product.category}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-charcoal mb-4 leading-tight">{product.name}</h1>
            <div className="text-3xl font-heading text-charcoal mb-8">
              ₹{product.price.toLocaleString()}
            </div>
            
            <div className="prose prose-sm text-slate font-light leading-relaxed mb-10 whitespace-pre-wrap border-b border-gray-200 pb-10">
              {product.description}
            </div>

            {/* Client-side Color Selector */}
            <ColorSelector colors={product.colors} />

            {/* Client-side Add to Cart */}
            <AddToCartSection product={product} />

            {/* Benefits / Trust Badges */}
            <div className="mt-12 grid grid-cols-2 gap-6 py-8 border-t border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">Lifetime Warranty</span>
              </div>
            </div>

            {/* Details Accordion */}
            <div className="mt-10 divide-y divide-gray-100">
              <details className="group py-6" open>
                <summary className="flex justify-between items-center font-bold text-xs uppercase tracking-[0.2em] cursor-pointer list-none text-charcoal">
                  <span>Product Features</span>
                  <span className="transition-transform duration-300 group-open:rotate-180 text-gold">
                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="mt-6">
                  <ul className="grid grid-cols-1 gap-3">
                    {product.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center text-sm text-slate font-light">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                    {(!product.features || product.features.length === 0) && (
                      <li className="text-sm text-slate font-light italic">Detailed features coming soon.</li>
                    )}
                  </ul>
                </div>
              </details>
              
              <details className="group py-6">
                <summary className="flex justify-between items-center font-bold text-xs uppercase tracking-[0.2em] cursor-pointer list-none text-charcoal">
                  <span>Shipping & Returns</span>
                  <span className="transition-transform duration-300 group-open:rotate-180 text-gold">
                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="mt-6 text-sm text-slate font-light leading-relaxed">
                  <p>Standard shipping: 3-5 business days. Free on all orders over ₹5,000. Returns accepted within 30 days of delivery.</p>
                </div>
              </details>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

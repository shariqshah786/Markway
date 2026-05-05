import Link from "next/link";
import { getProducts } from "@/actions/productActions";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";

export default async function Home() {
  const products = await getProducts();
  const bestSellers = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Social Proof Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-[5vw] flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-headline text-3xl md:text-4xl text-charcoal mb-4">Trusted by 100k+ Global Travelers</h2>
            <div className="flex items-center justify-center lg:justify-start gap-1 text-gold">
              {[1, 2, 3, 4].map(i => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="ml-3 font-bold uppercase tracking-widest text-[10px] text-slate">4.8/5 Average Rating</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <span className="text-2xl font-black tracking-tighter text-charcoal">AMAZON</span>
             <span className="text-2xl font-black tracking-tighter text-charcoal">FLIPKART</span>
             <span className="text-2xl font-black tracking-tighter text-charcoal">MYNTRA</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary text-on-primary py-5 marquee border-y border-white/10">
        <div className="marquee-content font-bold uppercase tracking-[0.3em] text-[10px]">
          <span className="mx-12">Premium Quality</span> • <span className="mx-12">Lifetime Warranty</span> • <span className="mx-12">500,000+ Happy Travelers</span> • 
          <span className="mx-12">Global Shipping</span> • <span className="mx-12">Japanese Engineering</span> • <span className="mx-12">Eco-Friendly Materials</span> •
          <span className="mx-12">Premium Quality</span> • <span className="mx-12">Lifetime Warranty</span> • <span className="mx-12">500,000+ Happy Travelers</span> • 
        </div>
      </div>

      {/* Collections Grid */}
      <section className="px-[5vw] py-24 max-w-[1440px] mx-auto">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <h2 className="font-headline text-4xl text-charcoal mb-4">The Collections</h2>
            <div className="w-16 h-1 bg-gold"></div>
          </div>
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate hover:text-gold transition">
            View All Collections →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Hardshell", desc: "Durable. Refined.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD88xKvZFowa3SZKQ3JuijXzB248JXB1cMixvROVXElVAkZutH18yB-erVhZw1wLJ_tWiDViMgLYbp-Mf3dWAB6KoYjm6lzO0FVVTI14fzNLz_nVczsPvNGQLIjIxziFIJ_0dMLa-EYBoP8Bfjt2MDZxliKIO8FRwO5g6QdWwtp2ZJUVLwSUwlOpWYyOsvs6cgk-TUupGDYI52Ag1tj9HpiOg3wpSGKgdBYqEZ_j5Tgw4efRWE5YIHqUTxx6iC09MiF49JHJfhTyZP1" },
            { name: "Soft Luggage", desc: "Flexible. Versatile.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQP9U16D2QgD67czd_qq8329NZA9mNnN_DQpcHFqwrneHL7QJPVIu6sh2CI16404vZNJlc9UGBCoIlmFLnppQqJ_yeerhRLwdKty0MuLOqxo6bOTEV4_HfNxonkd5JunMYX2QSQ6tJtkJlgcqNvdzVJDJtPiK_ZWkmx58D_Pc4XOSZzJNHE2tyqh8hCMqcaN6J6uuiWrVsGncA_xhOgCWwQOTk9BKBKOsb6VoS8CS43IziBQZYuauBKCmo5DnzKqvBBIwyeSRpy8mJ" },
            { name: "Backpacks", desc: "Daily. Travel.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_MLhUD5b0RFO1_7m-ZWvW8FNVUikCTyFdkqOIgTFhCKPJiV88WzhRCTomvShB48ChgdVgB1irx4bjUZTlIwQsR7ywDkC3V0_9Q0xFrt1CKhnKeOkML9HnTceRr6HnoTIVQ9XP5eefxfy8HwjeHKDAIvXjsykWhJ24mgvGaRhxtm5NDOrapn7r67sCWcaMwlgg40zFA_7aBLju6HM0hKq-mCPhCOEknrmXdgKltqWfb53wt85YeRcCvq8zzTLDQmZ-bWS__7ODpKre" },
            { name: "Travel Sets", desc: "Cohesive. Elite.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVKvp1z650pyiM3hM6RgVe5w69aDwydTLW60lfZDNw_gKrAYdTtKgIzLkrO61pmLUDz-q5JYyXeLE6g7lyZcF0bVLWWLU5Kyu1BVZ2pz4JCZGRBsqxAsF7jS8ndI6tclFcJ9Jwt0BeJHlsx4cMtKyYwhUmUFfuxkIefN3CWRVIpBuzNjPRhxa2ZdmA-1GgrkEY3wvpP9D6WHVKYsVgu4t1WfvfdFWzd3p2z0Bkz3vpkLeqELBMqT8LJWO3cpxKkjblD_DkcMTUe4L_" }
          ].map((item, idx) => (
            <Link href={`/shop?category=${item.name}`} key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-none">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <h3 className="font-headline text-xl uppercase tracking-wider text-charcoal mb-1">{item.name}</h3>
              <p className="font-bold uppercase tracking-widest text-[10px] text-slate">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Markway Section */}
      <section className="bg-white px-[5vw] py-24 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="text-center group">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-charcoal group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
            </div>
            <h4 className="font-headline text-2xl text-charcoal mb-4">TSA-Approved Locks</h4>
            <p className="text-slate text-sm font-light leading-relaxed max-w-xs mx-auto">Integrated security systems designed for global clearance without compromise.</p>
          </div>
          <div className="text-center group">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-charcoal group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
            </div>
            <h4 className="font-headline text-2xl text-charcoal mb-4">Silent Spinner Wheels</h4>
            <p className="text-slate text-sm font-light leading-relaxed max-w-xs mx-auto">360-degree Japanese engineered wheels for effortless, silent navigation.</p>
          </div>
          <div className="text-center group">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-charcoal group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
            </div>
            <h4 className="font-headline text-2xl text-charcoal mb-4">10-Year Warranty</h4>
            <p className="text-slate text-sm font-light leading-relaxed max-w-xs mx-auto">A decade of guaranteed performance and dedicated global repair services.</p>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="px-[5vw] mb-16 flex justify-between items-end max-w-[1440px] mx-auto">
          <div>
            <h2 className="font-headline text-4xl text-charcoal mb-4">Best Sellers</h2>
            <p className="font-bold uppercase tracking-widest text-[10px] text-slate">The most trusted companions</p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all">←</button>
            <button className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all">→</button>
          </div>
        </div>
        <div className="flex gap-10 px-[5vw] overflow-x-auto no-scrollbar pb-10">
          {bestSellers.map((product: any) => (
            <div key={product._id} className="min-w-[320px] md:min-w-[400px]">
              <ProductCard product={product} />
            </div>
          ))}
          {bestSellers.length === 0 && (
            <div className="w-full text-center py-20 text-slate italic">Add products in admin to see them here.</div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-charcoal text-white py-24 px-[5vw]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-[10px] text-gold mb-6">ELEVATE YOUR EXPERIENCE</p>
          <h2 className="font-headline text-4xl md:text-5xl mb-8 leading-tight">10% off your first journey</h2>
          <p className="text-slate text-sm font-light mb-12 max-w-lg mx-auto">Join the Markway Inner Circle for early access to collections and travel insights.</p>
          <form className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
            <input 
              className="flex-grow bg-transparent border-b border-white/20 py-4 px-2 focus:outline-none focus:border-gold text-white placeholder-gray-500 transition-all font-light" 
              placeholder="Email Address" 
              type="email" 
            />
            <button className="h-14 px-10 bg-white text-charcoal font-bold uppercase tracking-widest text-[11px] hover:bg-gold hover:text-white transition-all duration-500">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}

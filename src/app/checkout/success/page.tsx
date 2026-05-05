import Link from "next/link";

export default function CheckoutSuccess({ searchParams }: { searchParams: { id: string } }) {
  return (
    <main className="min-h-screen bg-ivory pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-heading font-semibold text-charcoal mb-4">Thank You for Your Order</h1>
        <p className="text-slate mb-2">Order ID: <span className="font-medium text-charcoal">{searchParams.id}</span></p>
        <p className="text-slate font-light leading-relaxed mb-12">
          Your order has been placed successfully. We&apos;ve sent a confirmation email with all the details. 
          Your journey with Markway has officially begun.
        </p>
        
        <div className="space-y-4">
          <Link href="/shop" className="block w-full bg-charcoal text-white py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold transition shadow-lg">
            Continue Shopping
          </Link>
          <Link href="/" className="block text-sm font-medium text-slate hover:text-charcoal transition">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

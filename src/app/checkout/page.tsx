import CheckoutForm from "@/components/CheckoutForm";

export default function Checkout() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-heading font-semibold text-charcoal mb-8">Secure Checkout</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}

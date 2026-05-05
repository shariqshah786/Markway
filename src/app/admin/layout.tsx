import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white pt-24 pb-10 px-6 flex flex-col fixed h-full z-40">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gold mb-8">Admin Dashboard</h2>
        <nav className="flex-1 space-y-4 text-sm font-medium">
          <Link href="/admin" className="block px-4 py-3 rounded-md hover:bg-gray-800 transition">Overview</Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded-md hover:bg-gray-800 transition">Products</Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded-md hover:bg-gray-800 transition">Orders</Link>
          <Link href="/admin/customers" className="block px-4 py-3 rounded-md hover:bg-gray-800 transition">Customers</Link>
        </nav>
        <div className="mt-auto">
          <Link href="/" className="block px-4 py-3 text-sm text-gray-400 hover:text-white transition">Exit to Store</Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 pt-24 pb-10 px-8">
        {children}
      </div>
    </div>
  );
}

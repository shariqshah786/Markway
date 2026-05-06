import { getOrders } from "@/actions/orderActions";
import { getProducts } from "@/actions/productActions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default async function AdminDashboard() {
  const orders: Order[] = await getOrders();
  const products = await getProducts();

  const totalRevenue = orders.reduce((acc: number, order: Order) => acc + order.totalAmount, 0);
  const totalOrders = orders.length;
  const activeProducts = products.length;

  return (
    <div>
      <h1 className="text-3xl font-heading font-semibold text-charcoal mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate mb-2">Total Revenue</h3>
          <p className="text-3xl font-heading font-semibold text-charcoal">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-600 font-medium mt-2">All-time revenue</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate mb-2">Total Orders</h3>
          <p className="text-3xl font-heading font-semibold text-charcoal">{totalOrders}</p>
          <p className="text-xs text-green-600 font-medium mt-2">Placed to date</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate mb-2">Active Products</h3>
          <p className="text-3xl font-heading font-semibold text-charcoal">{activeProducts}</p>
          <p className="text-xs text-slate font-medium mt-2">In the store</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-medium text-gold hover:text-charcoal transition">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-slate">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate">No orders found yet.</td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order: Order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-charcoal truncate max-w-[120px]">{order._id}</td>
                    <td className="px-6 py-4 text-charcoal">{order.customer.name}</td>
                    <td className="px-6 py-4 text-slate">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-charcoal">₹{order.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

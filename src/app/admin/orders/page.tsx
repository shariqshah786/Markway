import { getOrders } from "@/actions/orderActions";

interface OrderType {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  items: Array<{
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default async function AdminOrders() {
  const orders: OrderType[] = await getOrders();

  return (
    <div>
      <h1 className="text-3xl font-heading font-semibold text-charcoal mb-8">Orders</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-slate border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate">No orders placed yet.</td>
                </tr>
              ) : (
                orders.map((order: OrderType) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-charcoal truncate max-w-[120px]">{order._id}</td>
                    <td className="px-6 py-4">
                      <div className="text-charcoal font-medium">{order.customer.name}</div>
                      <div className="text-xs text-slate">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-charcoal">
                      {order.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0)} items
                    </td>
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

import { getProducts, deleteProduct } from "@/actions/productActions";
import AddProductForm from "@/components/AddProductForm";

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-semibold text-charcoal">Products Management</h1>
      </div>

      {/* Add Product Form Component */}
      <AddProductForm />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal">Inventory List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-slate border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                      <p>No products found. Add your first piece of luggage above.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-charcoal flex items-center gap-4">
                      <div className={`w-12 h-16 rounded overflow-hidden relative ${product.images?.[0]?.includes('bg-') ? product.images[0] : ''}`}>
                        {!product.images?.[0]?.includes('bg-') && product.images?.[0] && (
                           <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span>{product.name}</span>
                        <span className="text-[10px] text-slate uppercase font-bold tracking-tighter">Slug: {product.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate">{product.category}</td>
                    <td className="px-6 py-4 text-charcoal font-medium">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                        <span className="text-slate font-medium">{product.stock} units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <form action={deleteProduct.bind(null, product._id.toString())} className="inline">
                        <button type="submit" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition">Delete</button>
                      </form>
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

import React from "react";
import "./Style.css"
// Generate 50 products
const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product  with an extra long name to test ellipsis display`,
  category: i % 2 === 0 ? "Phone" : "Laptop",
  price: `$${(100 + i * 10).toFixed(2)}`,
  inStock: i % 5 === 0 ? 0 : (i % 10) + 1,
  status: i % 5 === 0 ? "Out of Stock" : i % 3 === 0 ? "Low Stock" : "Active",
}));

const ProductTable = () => {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4"> Products List</h2>

      <div className=" hide-scrollbar overflow-x-auto max-h-[450px] overflow-y-auto">
        <table className="min-w-full  rounded-lg bg-white">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">S.No</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">In Stock</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>

                {/* Product Name with truncate and title */}
                <td className="py-3 px-4">
                  <div className="max-w-[160px] truncate" title={product.name}>
                    {product.name}
                  </div>
                </td>

                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">{product.price}</td>
                <td className="py-3 px-4">{product.inStock}</td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

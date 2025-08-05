import { AdminContext } from "@/app/Context/AdminContext";
import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const ProductFormModal = ({ onClose }) => {
  const router = useRouter();
  const { addProduct } = useContext(AdminContext);
  const { AuthData } = useContext(AuthContext);
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    productDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setsuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    if (!product.productName.trim())
      newErrors.productName = "Product name is required.";
    if (!product.category.trim()) newErrors.category = "Category is required.";
    if (!product.productDescription.trim())
      newErrors.productDescription = "Description is required.";
    if (!product.price) newErrors.price = "Price is required.";
    if (!product.stock) newErrors.stock = "Stock quantity is required.";
    if (!product.image.trim()) {
      newErrors.image = "Image URL is required.";
    } else if (!product.image.startsWith("https://")) {
      newErrors.image = "Image URL must start with 'https://'";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const res = await addProduct(AuthData, product);
    setsuccess(true);
    setTimeout(() => {
      setsuccess(false);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">
          Add Product{" "}
          <span className="text-sm text-green-500 mx-2">
            {success && "Product has been added to E-Store"}
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              className="w-full p-2 border rounded"
              value={product.productName}
              onChange={handleChange}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">{errors.productName}</p>
            )}
          </div>

          <div>
            <select
              name="category"
              className="w-full p-2 border rounded"
              value={product.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Laptops">Laptops</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div>
            <textarea
              name="productDescription"
              placeholder="Description"
              className="w-full p-2 border rounded"
              rows="3"
              value={product.productDescription}
              onChange={handleChange}
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm">
                {errors.productDescription}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="number"
                name="price"
                placeholder="Price ₹"
                className="w-full p-2 border rounded"
                value={product.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                className="w-full p-2 border rounded"
                value={product.stock}
                onChange={handleChange}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full p-2 border rounded"
              value={product.image}
              onChange={handleChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save and continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;

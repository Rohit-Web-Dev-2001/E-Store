import React, { useState } from "react";

const ProductFormModal = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "Phone",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required.";
    if (!product.category.trim()) newErrors.category = "Category is required.";
    if (!product.description.trim()) newErrors.description = "Description is required.";
    if (!product.price.trim()) newErrors.price = "Price is required.";
    if (!product.stock.trim()) newErrors.stock = "Stock quantity is required.";
    if (!product.image.trim()) newErrors.image = "Image URL is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Submitted Product:", product);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full p-2 border rounded"
              value={product.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <select
              name="category"
              className="w-full p-2 border rounded"
              value={product.category}
              onChange={handleChange}
            >
              <option value="Phone">Phone</option>
              <option value="Laptop">Laptop</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded"
              rows="3"
              value={product.description}
              onChange={handleChange}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
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
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
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
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;

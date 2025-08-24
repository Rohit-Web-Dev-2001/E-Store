"use client";
import { AdminContext } from "@/app/Context/AdminContext";
import React, { useContext, useEffect, useState } from "react";
import AddToCartModal from "./AddCart";
import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";

const categoryAliases = {
  "Mobile%20Phones": "Mobile Phones",
  Laptops: "Laptops",
};

const ProductRow = ({ Category }) => {
  const [showPopup, setShowPopup] = useState(false);

  const { getProducts } = useContext(AdminContext);
  const { AuthData } = useContext(AuthContext);
  const [products, setproducts] = useState([]);
  const [ShowcartModel, setShowcartModel] = useState(false);
  const [cartproduct, setcartproduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getProducts();
    setproducts(res || []);
  };

  const handelAddtoCart = (product) => {
    setShowPopup(true); // Show popup
    if (!AuthData.jwtToken) {
      setTimeout(() => {
        setShowPopup(false); // Hide after 2 sec
        router.push("/Pages/Auth");
      }, 1000);

      return;
    } else {
      setShowPopup(false); // Hide after 2 sec

      setShowcartModel(true);
      setcartproduct(product);
    }
  };

  // 1. Decode URI and 2. Map to actual category name
  const decodedCategory = decodeURIComponent(Category);
  const matchedCategory = categoryAliases[decodedCategory] || decodedCategory;

  return (
    <div className="space-y-6 p-6 bg-gray-100">
      {products
        .filter((product) => product.category === matchedCategory)
        .map((product) => ( 
          <div
            key={product._id}
            className="flex flex-col md:flex-row bg-white shadow p-4 rounded-md"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/4 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.productName}
                className="w-36 h-36 object-contain"
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-3/4 mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {product.productName}
                </h2>
                <p className="text-gray-700 text-sm mb-3">
                  {product.productDescription}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    handelAddtoCart(product);
                  }}
                >
                  Add to Cart
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}

      {ShowcartModel && (
        <AddToCartModal
          cartproduct={cartproduct}
          onClose={() => setShowcartModel(false)}
        />
      )}

      {/* Show popup if user not signed in */}
      {showPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-md z-50 transition-all duration-300">
          To continue shopping, please log in.
        </div>
      )}
    </div>
  );
};

export default ProductRow;

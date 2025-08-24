import { AuthContext } from "@/app/Context/AuthContext";
import { useCart } from "@/app/Context/ToggleCart";
import React, { useContext } from "react";

const CartSideBar = () => {
  const { isOpen, toggleCart } = useCart();
  const { AuthData } = useContext(AuthContext);

  // Example cart data
  const cartItems = [
    {
      id: 1,
      name: "iPhone 15",
      price: 79999,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Samsung S24",
      price: 74999,
      image: "https://via.placeholder.com/60",
    },
  ];

  // Remove item
  const handleRemove = (id) => {
    console.log("Removed item with ID:", id);
    // Implement remove logic here
  };

  // Buy single item
  const handleBuy = (id) => {
    console.log("Buying item with ID:", id);
    // Implement buy logic here
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">{AuthData?.name || "Guest"}</h2>
        <button onClick={toggleCart} className="text-gray-500">
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex flex-col border-b pb-3">
              <div className="flex items-center   gap-30">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleBuy(item.id)}
                  className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600 text-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">Cart is empty</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Buy All
        </button>
      </div>
    </div>
  );
};

export default CartSideBar;

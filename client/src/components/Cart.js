import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = ({ cartItems }) => {
  // Initialize quantity state for each item
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = 1; // Default quantity is 1 for each item
      return acc;
    }, {})
  );

  // Handle quantity change
  const handleQuantityChange = (id, increment) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, prevQuantities[id] + increment), // Ensure quantity stays above 1
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * quantities[item.id],
      0
    );
  };

  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Product List Section */}
      <div className="w-full md:w-8/12 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl text-[#357b57]">Cart</h2>
          <Link className="text-[#357b57]" to="/collections/plants">
            Continue Shopping
          </Link>
        </div>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-xl text-[#357b57]">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[#eaf4eb] p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.color}</p>
                    <p className="text-lg font-medium text-[#357b57]">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="px-3 py-1 bg-gray-200 text-[#357b57] rounded"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="font-medium">{quantities[item.id]}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 text-[#357b57] rounded"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                  <button className="text-red-500 font-bold text-lg">×</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-full md:w-3/12 bg-[#eaf4eb] p-6 rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
        <h2 className="font-semibold text-xl text-[#357b57] mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <button className="w-full py-2 bg-[#357b57] text-white rounded-md">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

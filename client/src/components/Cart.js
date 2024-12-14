import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Cart = ({ cartItems }) => {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : process.env.REACT_APP_API_BASE_URL;

  const [cartDetails, setCartDetails] = useState(cartItems); // Use cartItems as initial state

  // Update quantity of a specific item
  const handleQuantityChange = async (id, increment) => {
    const updatedCart = cartDetails.map((item) =>
      item.plantId._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + increment) }
        : item
    );
    setCartDetails(updatedCart);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      await axios.put(
        `${API_URL}/api/cart`,
        { itemId: id, quantity: updatedCart.find((item) => item.plantId._id === id).quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      await axios.delete(`${API_URL}/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartDetails((prevDetails) => prevDetails.filter((item) => item.plantId._id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartDetails.reduce(
      (total, item) => total + item.plantId.price * item.quantity,
      0
    );
  };

  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="w-full md:w-8/12 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl text-[#357b57]">Cart</h2>
          <Link className="text-[#357b57]" to="/collections/plants">
            Continue Shopping
          </Link>
        </div>

        <div className="space-y-4">
          {cartDetails.length === 0 ? (
            <p className="text-xl text-[#357b57]">Your cart is empty.</p>
          ) : (
            cartDetails.map((item) => (
              <div
                key={item.plantId._id}
                className="flex justify-between items-center bg-[#eaf4eb] p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={item.plantId.image_url}
                    alt={item.plantId.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-lg">{item.plantId.name}</p>
                    <p className="text-sm text-gray-500">{item.plantId.color}</p>
                    <p className="text-lg font-medium text-[#357b57]">
                      ₹{item.plantId.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="px-3 py-1 bg-gray-200 text-[#357b57] rounded"
                    onClick={() => handleQuantityChange(item.plantId._id, -1)}
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 text-[#357b57] rounded"
                    onClick={() => handleQuantityChange(item.plantId._id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 font-bold text-lg"
                    onClick={() => handleRemoveItem(item.plantId._id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Cart = ({ cartItems }) => {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : process.env.REACT_APP_API_BASE_URL;


  const [cartDetails, setCartDetails] = useState(cartItems); // Use cartItems as initial state

  // Update quantity of a specific item (Optimistic UI approach)
  const handleQuantityChange = async (cartItemId, increment) => {
    // Optimistically update cart details locally
    const updatedCart = cartDetails.map((item) =>
      item._id === cartItemId
        ? { ...item, quantity: Math.max(1, item.quantity + increment) }
        : item
    );
    setCartDetails(updatedCart);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      // Find the updated item
      const updatedItem = updatedCart.find((item) => item._id === cartItemId);

      if (!updatedItem) {
        console.error(`Cart item with id ${cartItemId} not found.`);
        return;
      }

      // Prepare the request payload
      const payload = {
        cartItemId, // Unique identifier for the cart item
        quantity: updatedItem.quantity, // Updated quantity
      };

      // Send PUT request to update the cart
      await axios.put(`${API_URL}/api/cart`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart quantity:", error);

      // Revert the quantity update in case of error
      setCartDetails(cartItems);
    }
  };

  const clearCart = async () => {
    try {
      const authtoken = localStorage.getItem("authToken");
      if (!authtoken) {
        console.error("No authentication token found");
        return;
      }
      const response = await axios.delete(`${API_URL}/api/cart/clear`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });

      console.log(response.data.message); // "Cart cleared"
      setCartDetails([]); // Clear the cart state on successful API call
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = async (id, type) => {
    try {
      const authtoken = localStorage.getItem("authToken");
      if (!authtoken) return;

      const data = type === "plant" ? { plantId: id } : { potId: id };
      // Make the API call to remove the item from the cart
      await axios.delete(`${API_URL}/api/cart/remove`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
        data, // Send the data (either plantId or potId)
      });

      // Update the cart details by filtering out the removed item
      setCartDetails((prevDetails) =>
        prevDetails.filter((item) =>
          item.plantId?._id.toString() !== id && item.potId?._id.toString() !== id
        )
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartDetails.reduce((total, item) => {
      const product = item.plantId || item.potId;
      if (!product || !product.price) return total;
      return (total + product.price * item.quantity);
    }, 0).toFixed(2);
  };
  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="w-full md:w-8/12 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl text-[#357b57]">Cart</h2>
          <div>
            {cartDetails.length === 0 ? (
              <></>
            ) : (
              <button
                className="text-[#357b57] text-base mr-4 font-semibold bg-[#eaf4eb] p-2 rounded-2xl"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            )}
            <Link
              className="text-[#357b57] text-base font-semibold bg-[#eaf4eb] p-2 rounded-2xl"
              to="/collections/plants"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {cartDetails.length === 0 ? (
            <p className="text-xl text-[#357b57]">Your cart is empty.</p>
          ) : (
            cartDetails.map((item) => {
              const product = item.plantId || item.potId;
              if (!product || !product.name) {
                console.warn("Invalid product or missing name:", item);
                return null;
              }
            
              const linkPath = item.plantId
    ? `/collections/plants/${encodeURIComponent(product.name)}`
    : `/collections/pots/${encodeURIComponent(product.name)}`;

              

              return (
                <div
                  key={product._id}
                  className="flex justify-between items-center bg-[#eaf4eb] p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center">
                    <Link to={linkPath}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    </Link>
                    <div className="ml-4">
                      <p className="font-medium text-lg">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.color || "N/A"}</p>
                      <p className="text-lg font-medium text-[#357b57]">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="px-3 py-1 bg-gray-200 text-[#357b57] rounded"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 text-[#357b57] rounded"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="text-red-500 font-bold text-xl"
                      onClick={() =>
                        handleRemoveItem(
                          item.plantId?._id || item.potId?._id,
                          item.plantId ? "plant" : "pot"
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="h-max w-full md:w-3/12 bg-[#eaf4eb] p-6 rounded-lg shadow-md mt-6 md:mt-[70px] md:ml-6">
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

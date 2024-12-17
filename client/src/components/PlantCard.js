import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PlantCard = ({ type, item, onAddToCart, cartItems }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (!item.name) return null;

  const linkPath =
    type === "plant" ? `/collections/plants/${item.name}` : `/collections/pots/${item.name}`;

  const isItemInCart = cartItems.some(cartItem => {
    if (type === "plant" && cartItem.plantId) {
      return cartItem.plantId._id && cartItem.plantId._id.toString() === item._id.toString();
    } else if (type === "pot" && cartItem.potId) {
      return cartItem.potId._id && cartItem.potId._id.toString() === item._id.toString();
    }
    return false;
  });

  const handleAddToCart = () => {
    if (!isItemInCart) {
      onAddToCart(item, 1, type);
    }
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="flex flex-col items-start overflow-hidden gap-1 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={linkPath} className="overflow-hidden">
        {!imageLoaded && <Skeleton width={240} height={256} />}
        <img
          src={item.image_url}
          alt={item.name}
          className={`w-[21rem] md:w-60 h-64 transition-transform duration-300 ease-in-out hover:scale-105 rounded-t-2xl ${!imageLoaded ? "hidden" : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
      <p className="font-bold">{item.name || <Skeleton width={120} />}</p>
      <h1 className="text-base">{item.price ? `Rs.${item.price}` : <Skeleton width={80} />}</h1>
      <div className="flex flex-col gap-2 md:w-60 w-[21rem]">
        {isCartEmpty || !isItemInCart ? (
          <button onClick={handleAddToCart} className="h-auto bg-[#357b57] text-white text-sm font-medium text-center py-2">
            ADD TO CART
          </button>
        ) : (
          <Link to="/pages/cart" className="h-auto bg-[#357b57] text-white text-sm font-medium text-center py-2">
            GO TO CART
          </Link>
        )}
        <Link to={linkPath} className="h-auto text-[#357b57] bg-white rounded-b-2xl text-sm font-medium py-2 hover:text-[0.9rem] text-center border border-[#357b57] hover:bg-[#d1d8d5]">
          VIEW PRODUCT
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;

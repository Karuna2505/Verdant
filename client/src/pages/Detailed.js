import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useParams, Link } from 'react-router-dom';

const Detailed = ({ items, type, onAddToCart, cartItems }) => {
  const [count, setCount] = useState(1);
  const { name } = useParams();
  const item = items.find(item => item.name === name);
  
  if (!item) {
    return <div>{`${type.charAt(0).toUpperCase() + type.slice(1)} not found`}</div>;
  }

  // Check if the item is already in the cart
  const isItemInCart = cartItems.some(cartItem => {
    if (type === "plant" && cartItem.plantId) {
      return cartItem.plantId._id === item._id;
    } else if (type === "pot" && cartItem.potId) {
      return cartItem.potId._id === item._id;
    }
    return false;
  });

  const handleCountChange = (increment) => {
    setCount(prevCount => Math.max(prevCount + increment, 1));
  };

  const getModifiedImageUrl = (url) => url.replace(/^\.\.\//, '/');
  const modifiedImageUrl = getModifiedImageUrl(item.image_url);

  return (
    <div className='w-full flex flex-col items-center'>
      <nav className='text-[#357b57] flex justify-start gap-2 px-8 w-full md:w-8/12 lg:w-6/12 mt-6'>
        <Link to="/" className='hover:font-semibold'>Home</Link>
        <span>/</span>
        <Link to={`/collections/${type.toLowerCase()}s`} className='hover:font-semibold'>{type}s</Link>
        <span>/</span>
        <span>{item.name}</span>
      </nav>

      <div className='w-full md:w-8/12 lg:w-6/12 flex flex-col md:flex-row items-start p-6 md:pb-12 text-[#357b57]'>
        <img src={modifiedImageUrl} alt={item.name} className='w-full h-auto md:w-[40rem] md:h-[40rem] rounded-xl object-cover' />
        <div className='flex flex-col w-full md:w-2/3 md:ml-8 mt-4 md:mt-0'>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>{item.name}</h1>
          <h2 className='text-xl md:text-2xl font-semibold mb-4'>₹{item.price}</h2>
          <p className='text-lg md:text-lg font-semibold mb-4'>{item.description}</p>

          <div className='w-fit flex items-center gap-4 border-2 border-[#357b57] rounded-xl p-2 mb-4'>
            <button onClick={() => handleCountChange(-1)} className='bg-[#d3e2db] p-2 rounded-full hover:bg-gray-300'>
              <FaMinus />
            </button>
            <h1 className='text-xl'>{count}</h1>
            <button onClick={() => handleCountChange(1)} className='bg-[#d3e2db] p-2 rounded-full hover:bg-gray-300'>
              <FaPlus />
            </button>
          </div>

          <div className='flex flex-col gap-4 w-max'>
            {isItemInCart ? (
              <Link 
                to="/pages/cart" 
                className='w-full bg-[#357b57] font-semibold text-white px-4 py-2 rounded-lg hover:bg-[#b1c6bb] hover:text-[#357b57] text-center'
              >
                GO TO CART
              </Link>
            ) : (
              <button 
                onClick={() => onAddToCart(item, count, type)} 
                className='w-full bg-[#357b57] font-semibold text-white px-4 py-2 rounded-lg hover:bg-[#b1c6bb] hover:text-[#357b57]'
              >
                ADD TO CART
              </button>
            )}
            <Link to="/pages/cart">
            <button className='w-full bg-[#357b57] font-semibold text-white px-4 py-2 rounded-lg hover:bg-[#b1c6bb] hover:text-[#357b57]'>
              BUY NOW
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailed;

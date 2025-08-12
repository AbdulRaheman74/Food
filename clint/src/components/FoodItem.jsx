import React, { useContext} from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  // const [itemCount, setItemCount] = useState(0);
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden group relative">
      
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 w-full">
        <img
          src={url+"images/"+image}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
        


        {/* Add / Quantity Button */}                                                   
        {!cartItems[id]? (
          <img
            onClick={()=>addToCart(id)}
            src={assets.add_icon_white}
            alt="Add item"
            className="absolute bottom-2 right-2 w-8 h-8 cursor-pointer hover:scale-110 transition"
          />
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center bg-white px-2 py-1 rounded-full shadow-md gap-2">
            <img
              onClick={()=>removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
              className="w-5 h-5 cursor-pointer"
            />
            <p className="text-sm font-medium">{cartItems[id]}</p>
            <img
              onClick={()=>addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <img src={assets.rating_starts} alt="Rating" className="h-5" />
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className="text-base font-bold text-green-600">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

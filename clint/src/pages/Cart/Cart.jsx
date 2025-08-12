import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const DELIVERY_FEE = 2.99;

  const subtotal = getTotalCartAmount();
  const totalAmount = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Table Headings */}
      <div className="grid grid-cols-6 font-semibold border-b pb-2 mb-4 text-gray-700">
        <p>Image</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {/* Cart Items */}
      {food_list.map((item) => {
        const quantity = cartItems[item._id] || 0;
        if (quantity > 0) {
          return (
            <div key={item._id} className="grid grid-cols-6 items-center border-b py-3">
              <img src={url+"images/"+item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 text-xl border rounded"
                  onClick={() => removeFromCart(item._id)}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  className="px-2 text-xl border rounded"
                  onClick={() => addToCart(item._id)}
                >
                  +
                </button>
              </div>
              <p>${(item.price * quantity).toFixed(2)}</p>
              <button
                className="text-red-500 text-lg"
                onClick={() => removeFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          );
        }
        return null;
      })}

      {/* Empty Cart Message */}
      {subtotal === 0 && (
        <p className="text-center mt-10 text-gray-500 text-lg">Your cart is empty.</p>
      )}

      {/* Cart Summary */}
      {subtotal > 0 && (
        <div className="mt-10 max-w-md ml-auto border rounded-lg p-5 shadow-sm bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery:</span>
            <span>${DELIVERY_FEE.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <button
            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
            onClick={() => navigate('/order')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

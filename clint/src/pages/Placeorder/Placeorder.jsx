import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DELIVERY_FEE = 2;

const Placeorder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

 
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    countory:"",
    phone:""


  })
  const onchangeHandler=(e)=>{
     const name=e.target.name;
     const value=e.target.value;
     setData(data=>({...data,[name]:value}))

  }
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Gather order items
  let orderItems = [];
  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      let itemInfo = { ...item, quantity: cartItems[item._id] };
      orderItems.push(itemInfo);
    }
  });

  // 2. Calculate total amount (with delivery fee)
  let totalAmount = getTotalCartAmount() + 2; // ₹2 delivery
  if (totalAmount < 50) {
    alert("Minimum order amount must be ₹50 to proceed.");
    return;
  }

  // 3. Prepare order data
  let orderData = {
    address: data, // Your form's address data
    items: orderItems,
    amount: totalAmount,
  };

  try {
    // 4. Send request to backend
    const response = await axios.post(
      url + "api/order/create",
      orderData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // 5. Redirect to Stripe
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error creating order. Please try again.");
    }
  } catch (error) {
    console.error("Order Error:", error);
    alert("Something went wrong while placing the order.");
  }
};

const navigate=useNavigate();

useEffect(()=>{
if(!token){
  navigate("/cart")
}
else if(getTotalCartAmount===0){
  navigate("/cart")
}
},[token])
                               

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      {/* Delivery Information */}
      <div className="space-y-6">
        <p className="text-2xl font-bold text-gray-800">Delivery Information</p>

        <div className="flex gap-4">
          <input required
          name='firstName'
          onChange={onchangeHandler}
          value={data.firstName}
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
          <input
          required
          name='lastName'
          onChange={onchangeHandler}
          value={data.lastName}
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <input
        required
        name='email'
          onChange={onchangeHandler}
          value={data.email}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        />

        <input
        required
        name='street'
          onChange={onchangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        />

        <div className="flex gap-4">
          <input
          required
          name='city'
          onChange={onchangeHandler}
          value={data.city}
            type="text"
            placeholder="City"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
          <input
          required
          name='state'
          onChange={onchangeHandler}
          value={data.state}
            type="text"
            placeholder="State"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <div className="flex gap-4">
          <input
          required
          name='zipCode'
          onChange={onchangeHandler}
          value={data.zipCode}
            type="text"
            placeholder="Zip Code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
          <input
          required
          name='countory'
          onChange={onchangeHandler}
          value={data.countory}
            type="text"
            placeholder="Country"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        <input
        required
        name='phone'
          onChange={onchangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        />
      </div>

      {/* Cart Summary */}
      <div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-5">Cart Summary</h3>

          <div className="flex justify-between text-gray-600 mb-3">
            <span>Cart:</span>
            <span>${getTotalCartAmount().toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-3">
            <span>Delivery:</span>
            <span>${DELIVERY_FEE.toFixed(2)}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-semibold text-gray-800">
            <span>Total:</span>
            <span>
              $
              {getTotalCartAmount() > 0
                ? (getTotalCartAmount() + DELIVERY_FEE).toFixed(2)
                : '0.00'}
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;

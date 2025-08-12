import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = ({ url }) => {
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrder(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const statusHandler=async(e,orderId)=>{
const response = await axios.post(url+"/api/order/status",{
  orderId,
  status:e.target.value
})    
if(response.data.success){
  await fetchOrder();
}
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  

  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Page</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((order, index) => {
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-3"
            >
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-12 h-12 mx-auto"
              />
              <div className="text-gray-700 text-sm space-y-1">
                <p className="font-semibold">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p className="font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " " +
                    order.address.countory +
                    " , " +
                    order.address.zipCode}
                </p>
                <p className="text-gray-500">{order.address.phone}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-600">
                  Items:{" "}
                  <span className="font-semibold">{order.items.length}</span>
                </p>
                <p className="text-lg font-bold text-green-600">
                  ${order.amount}
                </p>
              </div>
              <select
              onChange={(e)=>statusHandler(e,order._id)}
              value={order.status}
                name=""
                id=""
                className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Food Proccessing">Food Proccessing</option>
                <option value="Out For Deliery">Out For Deliery</option>
                <option value="Deliverd">Deliverd</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;

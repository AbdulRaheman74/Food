import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storecontext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrder = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchUsersData = async () => {
    try {
      const response = await axios.post(
        url + "api/order/myorder",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsersData();
    }
  }, [token]);

  // Helper: calculate total quantity
  const getTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition duration-300"
          >
            {/* Header */}
            <div className="flex items-center mb-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="w-14 h-14 mr-3"
              />
              <div>
                <p className="text-sm text-gray-600">
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
              </div>
            </div>

            {/* Price & Info */}
            <div className="mb-4">
              <p className="text-xl font-semibold text-gray-900">
                ${order.amount}.00
              </p>
              <p className="text-gray-500 text-sm">
                Total Items: {getTotalQuantity(order.items)}
              </p>
              <p className="mt-1 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <b className="capitalize">{order.status}</b>
              </p>
            </div>

            {/* Button */}
            <button className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition" onClick={fetchUsersData}>
              Track Order
            </button>
          </div>
      
        ))}
      </div>
    </div>
  );
};

export default MyOrder;

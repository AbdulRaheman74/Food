import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-full sm:w-64 min-h-screen bg-gray-100 shadow-md px-4 py-6">
      <div className="flex flex-col gap-6">

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
              isActive
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-200 text-gray-800'
            }`
          }
        >
          <img src={assets.add_icon} alt="Add" className="h-6 w-6" />
          <p className="text-sm sm:text-base">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
              isActive
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-200 text-gray-800'
            }`
          }
        >
          <img src={assets.order_icon} alt="List" className="h-6 w-6" />
          <p className="text-sm sm:text-base">List Items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
              isActive
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-200 text-gray-800'
            }`
          }
        >
          <img src={assets.order_icon} alt="Order" className="h-6 w-6" />
          <p className="text-sm sm:text-base">Order Items</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;

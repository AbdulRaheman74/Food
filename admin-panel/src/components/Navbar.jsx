import React from 'react';
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center shadow-md bg-white">
      <img src={assets.logo} alt="Logo" className="h-10 object-contain" />

      <div className="flex items-center gap-4">
        <img
          src={assets.profile_image}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border border-gray-300"
        />
      </div>
    </nav>
  );
};

export default Navbar;

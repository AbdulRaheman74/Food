import React, { use, useContext, useState } from "react";
import { assets } from "../assets/assets";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
// import { StoreContext } from "../context/storecontext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, cartItems, token, setToken } =
    useContext(StoreContext);
    const navigate=useNavigate();
  const totalQuantity = Object.values(cartItems).reduce(
    (acc, qty) => acc + qty,
    0
  );

  const handelLogout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenu(
        sectionId === "home"
          ? "Home"
          : sectionId === "explore-menu"
          ? "Menu"
          : sectionId === "app-download"
          ? "Mobile App"
          : sectionId === "footer"
          ? "Contact Us"
          : ""
      );
      setMobileMenuOpen(false); // close mobile menu on click
    }
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Menu", id: "explore-menu" },
    { name: "Mobile App", id: "app-download" },
    { name: "Contact Us", id: "footer" },
  ];

  return (
    <div className="w-full h-[70px] bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/">
          {" "}
          <img
            src={assets.logo}
            alt="logo"
            className="w-[120px] cursor-pointer hover:scale-105 duration-300"
            onClick={() => handleScroll("home")}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`cursor-pointer relative hover:text-orange-500 transition-all duration-300 
                ${
                  menu === item.name
                    ? "text-orange-500 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-orange-500 after:rounded-full"
                    : ""
                }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 cursor-pointer hover:scale-110 duration-200"
          />
          <div className="relative cursor-pointer hover:scale-110 duration-200">
            <Link to="/cart" className="relative">
              <img src={assets.basket_icon} alt="cart" />

              {/* ✅ Show quantity if cart has items */}
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
          {!token ? (
            <button
              className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 text-sm duration-200"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          ) : (
            <div className="relative group cursor-pointer">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />

              {/* Dropdown on hover */}
              <ul className="absolute top-10 right-0 bg-white shadow-md rounded-md w-40 p-2 hidden group-hover:block z-10">
                <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={()=>navigate("/myorder")}>
                  <img  src={assets.bag_icon} alt="Orders" className="w-4 h-4" />
                  <p>Orders</p>
                </li>
                <hr className="my-1" />
                <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={handelLogout}>
                  <img
                    src={assets.logout_icon}
                    alt="Logout"
                    className="w-4 h-4"
                  />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}

          {/* Hamburger */}
          <div
            className="md:hidden text-2xl cursor-pointer ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden flex flex-col bg-white shadow-md rounded-lg mt-2 p-4 space-y-4">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`cursor-pointer text-gray-700 hover:text-orange-500 font-medium 
                ${menu === item.name ? "text-orange-500 font-semibold" : ""}`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;

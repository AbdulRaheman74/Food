import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-100 to-yellow-50 py-12 mt-16" id="footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-28 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            The taste of freshness delivered at your doorstep. Enjoy delicious
            meals made with love and top-quality ingredients.
          </p>

          <div className="flex space-x-4 mt-4">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
            />
            <img
              src={assets.linkedin_icon}
              alt="LinkedIn"
              className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Home</li>
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Menu</li>
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Offers</li>
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-600 transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Delivery Info</li>
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-orange-600 transition-colors cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Get in Touch</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>📞 +91 98765 43210</li>
            <li>📧 support@tomato.com</li>
            <li>📍 Mumbai, India</li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-xs text-gray-500 mt-12 border-t pt-6">
        © 2025 <span className="font-semibold text-orange-600">Tomato</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

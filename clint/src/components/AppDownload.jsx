import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className="bg-orange-50 py-10 px-6 rounded-3xl shadow-md max-w-5xl mx-auto mt-20 flex flex-col md:flex-row justify-between items-center gap-6" id='app-download'>
      
      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          For a Better Experience,
          <br />
          Download Our App
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Order food faster, track your deliveries, and get exclusive app-only deals.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="w-36 cursor-pointer hover:scale-105 transition-transform"
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="w-36 cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default AppDownload;

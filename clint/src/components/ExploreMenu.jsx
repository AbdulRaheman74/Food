import React from 'react'
import { menu_list } from '../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 " id='explore-menu'>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
        Explore Our Menu
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory(prev =>
                prev === item.menu_name ? 'All' : item.menu_name
              )
            }
            className={`cursor-pointer bg-white rounded-xl shadow-md transition duration-300 p-4 text-center border-2 ${
              category === item.menu_name
                ? 'border-orange-500'
                : 'border-transparent'
            }`}
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className="w-full h-28 object-contain mb-3 transition duration-300"
            />
            <h2
              className={`text-lg font-semibold ${
                category === item.menu_name ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              {item.menu_name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreMenu

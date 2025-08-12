import React from 'react'

const Header = () => {
  return (
    <div className="w-full bg-orange-50" id='home'>
      <div className="w-full max-w-[1300px] mx-auto">
        <div
          className="h-[calc(100vh-64px)] bg-no-repeat bg-contain bg-center flex items-center justify-center px-4"
          style={{
            backgroundImage: `url("header_img.png")`,
          }}
        >
          <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-[600px] text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Order Your Favorite Food Here
            </h1>
            <p className="text-gray-600 mb-6">
              Choose from a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients.
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

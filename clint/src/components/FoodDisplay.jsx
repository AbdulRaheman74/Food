import React, { useContext } from 'react'
import { StoreContext } from "../context/StoreContext";
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Dishes Near You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {food_list.map((item, index) =>
    (category === "All" || category === item.category) && (
      <FoodItem
        key={index}
        id={item._id}
        name={item.name}
        description={item.description}
        price={item.price}
        image={item.image}
      />
    )
  )}
</div>

    </div>
  )
}

export default FoodDisplay

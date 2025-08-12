import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  // const url = "http://localhost:6060";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/all`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood=async (foodId)=>{
    try {
      const response= await axios.delete(`${url}/api/food/remove/${foodId}`);
    if(response.data.success){
      toast.success(response.data.message);
      // setList(list.filter(item => item._id !== foodId));
       await fetchList(); // Refresh the list after deletion
    }
      
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error(response.data.message || "Failed to remove food item");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Food List</h2>
      <div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 items-center gap-4 border-b py-2 text-sm"
        >
          <img
            src={`${url}/images/${item.image}`}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>₹{item.price}</p>
          <button className="text-red-600 hover:underline" onClick={()=>removeFood(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default List;

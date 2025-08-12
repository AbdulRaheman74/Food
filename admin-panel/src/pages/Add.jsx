import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    name:"",
    description:"",
    category:"",
    price:""
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))

  }
//   useEffect(()=>{
// console.log(data)
//   },[data])

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("price",Number(data.price));
    formData.append("image",image);
    const response= await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name: "",
        description: "",
        category: "",
        price: ""
      });
      setImage(false);
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
      console.error(response.data.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          Add New Product
        </h2>
        <form className="flex flex-col gap-7" onSubmit={onSubmitHandler}>
          {/* Upload Image */}
          <div>
            <p className="mb-2 font-semibold text-gray-700">Upload Image</p>
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition p-4 bg-blue-50 hover:bg-blue-100"
            >
              <img
                src={image?URL.createObjectURL(image):assets.upload_area}
                alt="Upload"
                className="w-24 h-24 object-contain mb-2 opacity-80"
              />
              <span className="text-gray-500 text-sm mb-1">Click to upload</span>
              <input
                type="file"
                id="image"
                name="image"
                className="hidden"
                required
               onChange={(e)=>setImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Product Name */}
          <div>
            <p className="mb-2 font-semibold text-gray-700">Product Name</p>
            <input
              type="text"
              name="name"
              placeholder="Type here..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              required
              onChange={onChangeHandler}
              value={data.name}
            />
          </div>

          {/* Product Description */}
          <div>
            <p className="mb-2 font-semibold text-gray-700">Product Description</p>
            <textarea
              name="description"
              rows="4"
              placeholder="Write content here..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
              required
              onChange={onChangeHandler}
              value={data.description}
            ></textarea>
          </div>

          {/* Category & Price */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category */}
            <div className="flex-1 min-w-[180px]">
              <p className="mb-2 font-semibold text-gray-700">Product Category</p>
              <select
                name="category"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                required
              onChange={onChangeHandler}
              value={data.category}

              >
                <option value="">Select Category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Vege">Pure Vege</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex-1 min-w-[180px]">
              <p className="mb-2 font-semibold text-gray-700">Product Price</p>
              <input
                type="number"
                name="price"
                placeholder="$20"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                required
                min="0"
                step="0.01"
                onChange={onChangeHandler}
              value={data.price}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 active:scale-95"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
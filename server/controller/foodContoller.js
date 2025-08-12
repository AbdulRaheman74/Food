import foodModel from "../model/foodModel.js";
import fs from 'fs';

export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file.filename;

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image,
    });

    await food.save();

    res.status(200).json({
      success: true,
      message: "Food item added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add food item",
      error: error.message,
    });
  }
};

//get all food items

export const getAllFoods=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.status(200).json({
            success:true,
            data:foods
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Failed to fetch food items",
            error:error.message
        })
    }
}
export const removeFood=async(req,res)=>{
    try {
        const foodId=req.params.id;
        const food=await foodModel.findByIdAndDelete(foodId);
        fs.unlinkSync(`uploads/${food.image}`,()=>{}); // Delete the image file from the server
        if(!food){ 
            return res.status(404).json({
                success:false,
                message:"Food item not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Food item removed successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Failed to remove food item",
            error:error.message
        });
    }
}

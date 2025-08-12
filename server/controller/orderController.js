import Stripe from 'stripe';
import orderModel from '../model/orderModel.js';
import userModel from '../model/userModel.js';
import dotenv from "dotenv";

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ fixed instantiation

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    // 1. Save order in DB
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();

    // 2. Clear user cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 3. Create Stripe Line Items
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 // ✅ in paise
      },
      quantity: item.quantity
    }));

    // 4. Add delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 // ₹2
      },
      quantity: 1
    });

    // 5. Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment", // ✅ fixed
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // ✅ spelling fixed
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.status(200).json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("Stripe Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
export const verifyOrder=async(req,res)=>{
  const {orderId,success}=req.body;
  try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      res.status(200).json({success:true,message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.status(200).json({success:false,message:"Not Paid"})


    }
    
  } catch (error) {
    console.log(error.message)
    
  }
}

export const userOrders=async (req,res)=>{
  try {
    const orders= await orderModel.find({userId:req.body.userId})
    res.status(200).json({success:true,data:orders})
  } catch (error) {
    console.log(error.message)
      res.status(200).json({success:false,message:"error"})

    
  }
}
//listing orders for adin panel

export const  listOrders=async(req,res)=>{
  try {
    const orders=await orderModel.find({})
    res.status(200).json({success:true,data:orders})
  } catch (error) {
     console.log(error.message)
      res.status(200).json({success:false,message:"error"})
  }
}

//order status

export const orderStatus= async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.status(200).json({success:true,message:"Status Updated"})

  } catch (error) {
     console.log(error.message)
      res.status(200).json({success:false,message:"error"})
  }
}

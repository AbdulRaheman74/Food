import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import generateToken from "../auth/generateToken.js";
// import generateToken from "../auth/generateToken.js";




//login user
export const login = async (req, res) => {
  const {email,password} = req.body;
  try {
    const user=await userModel.findOne({email:email})
    const isMatch=await bcrypt.compare(password,user.password);
    if(!user || !isMatch){
      return res.status(400).json({success:false,message:"Invalid email or password"});
    }
    const token =generateToken(user._id);
    if(isMatch){
      res.status(200).json({success:true,message:"Login successful",user:user,token:token});
    }
    
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
    
  }
};




//create a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // const newUser = await userModel.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      user: newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

import User from "../models/user.models.js"
import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt"
import 'dotenv/config' 


// register ko lagi gareko 
const register = asynchandler(async (req, res, next) => { 
  try {
    console.log(req.body);
    const { firstName, lastName, phoneNumber, email, location, password } = req.body;

    if ([firstName, lastName, phoneNumber, email, location, password].some((field) => !field || field.trim() === "")) {
      return next(new ApiError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { phoneNumber }] 
    });
    if (existingUser) {  
      const errorField = existingUser.email === email ? "Email" : "Phone number"; 
      return next(new ApiError(400, `${errorField} already exists`)); 
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    if (!hashedpassword) {
      return next(new ApiError(400, "Error in creating hashed password"));
    }

    await new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      location,
      password: hashedpassword,
    }).save();

    res.status(201).json(new ApiResponse(201, "User registered successfully"));

  } catch (error) {
    console.error("Error during registration:", error);
    return next(new ApiError(500, "Error during registration"));
  }
});




// router.post('/login', async (req, res) => {
  const login = asynchandler(async (req, res,next) => {
    try {
      const { email, password } = req.body;
  
      console.log(req.body);
      if ([ email, password].some((field) => !field || field.trim() === "")) {
        return next(new ApiError(400, "All fields are required"));
      }
  
      // user database ma xa ki naiii 0check gareko 
      const user = await User.findOne({ email });
      //console.log(user)
  
      if (!user) {
        //return res.status(404).send({ message: 'User not found or credentials are incorrect' });
        return next(new ApiError(400, "User not found or credentials are incorrect"));
      }
  
      //password checking 
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {  
        return next(new ApiError(400, "wrong password"));
        //return res.status(404).send({ message: 'password is in correct' }); 
      }
    
  
      const accessToken = jwt.sign({
        data: {
          id: user._id,
          email: user.email,
        }
      }, process.env.ACCESS_TOKEN_SECRET,  

      
      { expiresIn: '1h' }
      
    );  
    console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET)
      console.log(accessToken) 
  
      const options={
        httpOnly:true,
        secure:true,
      };
  
      res
        .status(200)
        .cookie("accessToken", accessToken,options) 
        .json(new ApiResponse(200, { user, token: accessToken }, "Login successfully"));
        
  
    } catch (error) {
      console.error('Error during login:', error);
      throw new ApiError(500, "error during login");
    }
  });

export { register, login}  
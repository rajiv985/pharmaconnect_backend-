import seller from "../models/pharm.models.js"
import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt"


// register ko lagi gareko 
const Pregister = asynchandler(async (req, res,next) => {
  console.log(req.body)
  const { firstName, lastName, phoneNumber, email,password,location,pharmacyName} = req.body;

 
  if ([firstName, lastName, phoneNumber, email, location, password,pharmacyName].some((field) => !field || field.trim() === "")) {
    return next(new ApiError(400, "All fields are required"));
  }

    const existingUser = await seller.findOne({ 
       $or: [{ email }, { phoneNumber }] 
     });
     if (existingUser) {  
       const errorField = existingUser.email === email ? "Email" : "Phone number"; 
       return next(new ApiError(400, `${errorField} already exists`)); 
     }

  const hashedpassword = await bcrypt.hash(req.body.password, 10);

  if(!hashedpassword){
    throw new ApiError(400, "error in creating hashed password")
  }

  const savedUser = new seller({
    firstName,
    lastName,
    phoneNumber,
    email,
    password: hashedpassword
  }).save();

  res
  .status(201)
  .json(new ApiResponse(201, "seller registered succesfully"));
});



const Plogin = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if ([ email, password].some((field) => !field || field.trim() === "")) {
      return next(new ApiError(400, "All fields are required"));
    }

    // user database ma xa ki naiii 0check gareko 
    const user = await seller.findOne({ email });

    if (!user) {
      return next(new ApiError(400, "User not found or credentials are incorrect"));
    }

    //password checking 

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(400, "password is incorrect"));  
    }
  

    const accessToken = jwt.sign({
      data: {
        id: user._id,
        email: user.email,
      }
    }, process.env.ACCESS_TOKEN_SECRET,
    
     { expiresIn: '1h' }
    );  

    const options={
      httpOnly:true,
      secure:true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken)
      .json(new ApiResponse(200, user, "login sucessfully"))

  } catch (error) {
    console.error('Error during login:', error);
    throw new ApiError(500, "error during login");
  }
});

export { Pregister, Plogin}  
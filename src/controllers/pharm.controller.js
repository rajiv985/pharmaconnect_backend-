import seller from "../models/pharm.models.js"
import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt"


// register ko lagi gareko 
const Pregister = asynchandler(async (req, res) => {
  console.log(req.body)
  const { firstName, lastName, phoneNumber, email,password } = req.body;

  if (
    [firstName, lastName, phoneNumber, email,  password].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new ApiError(404, "All fields are required");
  }

  const existingseller = await seller.findOne({ 
    $or: [{ email }, { phoneNumber }] 
  });
  if (existingseller) {  
    const errorField = existingseller.email === email ? "Email" : "Phone number"; 
    throw new ApiError(400, `${errorField} already exists`); 
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
    if (
      [email, password].some((field) => {
        field.trim() === "";
      })
    ) {
      throw new ApiError(404, "All fields are required");
    }

    // user database ma xa ki naiii 0check gareko 
    const user = await seller.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found or credentials are incorrect' });
    }

    //password checking 

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Password not match" );  
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
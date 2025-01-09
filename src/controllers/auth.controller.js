import User from "../models/user.models.js"
import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt"


// register ko lagi gareko 
const register = asynchandler(async (req, res) => {
  console.log(req.body)
  const { firstName, lastName, phoneNumber, email, location, password } = req.body;

  if (
    [firstName, lastName, phoneNumber, email, location, password].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new ApiError(404, "All fields are required");
  }

  const existingUser = await User.findOne({ 
    $or: [{ email }, { phoneNumber }] 
  });
  if (existingUser) {  
    const errorField = existingUser.email === email ? "Email" : "Phone number"; 
    throw new ApiError(400, `${errorField} already exists`); 
  }

  const hashedpassword = await bcrypt.hash(req.body.password, 10);

  if(!hashedpassword){
    throw new ApiError(400, "error in creating hashed password")
  }

  const savedUser = new User({
    firstName,
    lastName,
    phoneNumber,
    email,
    location,
    password: hashedpassword
  }).save();

  res
  .status(201)
  .json(new ApiResponse(201, "user registered succesfully"));
});


// router.post('/login', async (req, res) => {
const login = asynchandler(async (req, res) => {
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
    const user = await User.findOne({ email });

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

export { register, login} 
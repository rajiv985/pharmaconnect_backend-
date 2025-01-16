import mongoose from "mongoose";

const pharmaSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    password:String,
    phonenumber:String, 

    isEmailVerified: {
    type: Boolean,
    default: false 
},

refreshToken: {
    type: String,  // Store refresh token for authentication
},
role : {
    type: String,
    enum: ["admin","user","seller"],
    default: "seller"
},
});
export default mongoose.model("seller", pharmaSchema)  
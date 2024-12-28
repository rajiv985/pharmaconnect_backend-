import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    password:String,
    location:String,
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
    default: "user"
},
});
export default mongoose.model("User", UserSchema)
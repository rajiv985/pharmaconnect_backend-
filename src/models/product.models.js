import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price:String,
    image:String,
    expirydate: String,


refreshToken : {
    type:String,  // Store refresh token for authentication
},
role : {
    type: String,
    enum: ["admin","user","seller"],
    default: "seller"
},
});
export default mongoose.model("product", productSchema)
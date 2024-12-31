import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    ProductId:Number,
    Name: String,
    Description: String,
    Price:Number,
    Category:String,
    Stock:Number,

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
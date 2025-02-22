import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // category:{
    //     type:String,
    //     required:true,
    // },
    // description:{
    //     type:String,
    //     required:true,
    // },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    expirydate:{
        type:Date,
        required:true,
    },
refreshToken : {
    type:String,  // Store refresh token for authentication
},
role : {
    type: String,
    enum: ["admin","user","seller"],
    default: "user"
},
});
export default mongoose.model("Product", productSchema)
// models/cart.models.js
import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName:{
        type:String,
        required:true,
      },
      productprice:{
        type:Number,
        required:true,
      }
    },
  ],
  totalAmount:{
    type:Number,
    required:true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cart", cartSchema);
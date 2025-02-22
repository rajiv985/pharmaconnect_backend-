import mongoose from "mongoose";

// Define the Order Schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // References the Product model
                required: true,
            },
            // quantity: {
            //     type: Number,
            //     required: true,
            //     min: 1,
            // },
            productPrice:{
                type:Number,
                required:true,
            }
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        // enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
        // default: "pending"
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    shippingAddress:{
        type:String,
        required:true,
    },
    // paymentMethod:{
    //     type:String,
    //     enum:["cash on delivery"]
    // },
});

// Create the Order model
export default mongoose.model("order", orderSchema); 


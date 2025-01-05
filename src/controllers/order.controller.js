import User from "../models/user.models.js" 
import Order from "../models/order.models.js";
import Product from "../models/product.models.js" 
import { ApiError } from "../utils/apiError.js";
import asynchandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";


// Create Order Route
const diyo= asynchandler(async (req, res) => { 
    try {
        const { userId, products } = req.body;
        console.log(req.body)    

        if (!userId) {
            throw new ApiError(401, "User ID is required to place an order.");
          }
          const user = await User.findById(userId);
          if (!user) {
            throw new ApiError(404, "User not found or not logged in.");
          }
        
          // Validate products
          if (!products || products.length === 0) {
            throw new ApiError(400, "Product details are required to create an order.");
          }

        // Calculate total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product || product.Stock < item.quantity) {
                return res
                    .status(400)
                    .send(`Product ${item.productId} is out of stock or invalid.`);
            }
        }
        totalAmount += Product.price * item.quantity;

        // Create new order
        const newOrder = new Order({
            userId,
            products,
            totalAmount,
        });

        await newOrder.save();

        // Update stock for each product
        for (const item of products) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { Stock: -item.quantity },
            });
        }
    
        res
        .status(200)
        .json(new ApiResponse("Order placed successfully.")); 
    } catch (error) {
        console.error("error during fetching",error.message);
        throw new ApiError(500, error.message||"error fetching order");
    
    }
});

export {diyo} 
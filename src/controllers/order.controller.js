import User from "../models/user.models.js" 
import Order from "../models/order.models.js";
import Product from "../models/product.models.js" 


// Create Order Route
const diyo= (async (req, res) => { 
    try {
        const { userId, products } = req.body;
        console.log(req.body)  

        if (!userId || !products || products.length === 0) {
            return res.status(400).send("Invalid order data.");
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
            totalAmount += product.Price * item.quantity;
        }

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
    
        res.status(201).send("Order placed successfully."); 
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while placing the order.");
    }
});

export {diyo} 
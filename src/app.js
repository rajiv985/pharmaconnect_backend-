import express from "express";
import errorHandler from "./middleware/errorhandler.middleware.js";
import authRoutes from "./routes/auth.route.js"
import orderRoutes from"./routes/order.route.js" 
import userRoutes from"./routes/user.route.js"
import productRoutes from"./routes/product.route.js" 

const app=express();
app.use(express.json())

app.use("/auth",authRoutes);
app.use("/order",orderRoutes); 
app.use("/user",userRoutes);
app.use("/product",productRoutes);  
app.use("/",(req,res)=>{res.json({message:"welcome to backend,rajiv,happy new year 2025"})})

app.use(errorHandler)
export default app;
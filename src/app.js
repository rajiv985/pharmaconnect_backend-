import express from "express"
import errorhandler from "./middleware/errorhandler.middleware.js"
import authRoutes from "./routes/auth.route.js"
import orderRoutes from"./routes/order.route.js" 
import userRoutes from"./routes/user.route.js"
import productRoutes from"./routes/product.route.js" 
import cookieParser from "cookie-parser"
import cartRoutes from "./routes/cart.route.js"
import pharmaRoutes from "./routes/pharm.route.js"
import cors from "cors"


const app=express();
app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods:['GET', 'POST','PUT','DELETE'],
        credentials: true
    }
))

app.use(cookieParser()); 
app.use("/auth",authRoutes);
app.use("/pharma",pharmaRoutes);
app.use("/order",orderRoutes); 
app.use("/user",userRoutes);
app.use("/products",productRoutes);      
app.use("/cart",cartRoutes);
app.get("/",(req,res)=>{res.json({message:"welcome to backend,rajiv,happy new year 2025"})})

app.use(errorhandler) ;
export default app; 


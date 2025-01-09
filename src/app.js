import express from "express"
import errorhandler from "./middleware/errorhandler.middleware.js"
import authRoutes from "./routes/auth.route.js"
import orderRoutes from"./routes/order.route.js" 
import userRoutes from"./routes/user.route.js"
import productRoutes from"./routes/product.route.js" 
import cookieParser from "cookie-parser"
import cartRoutes from "./routes/cart.route.js"
import cors from "cors"
// import upload from "./middleware/multer.middleware.js"
// import imageRoutes from "./controllers/image.controllers.js"


const app=express();
app.use(express.json())
app.use(cors())

//const upload = require('./upload');

// Set up a route for file uploads
// app.post('/upload', upload.single('file'), (req, res) => {
//   // Handle the uploaded file
//   res.json({ message: 'File uploaded successfully!' });
// }); 


app.use(cookieParser())
//app.use("/photo",imageRoutes);
app.use("/auth",authRoutes);
app.use("/order",orderRoutes); 
app.use("/user",userRoutes);
app.use("/product",productRoutes);  
app.use("/cart",cartRoutes);
app.get("/",(req,res)=>{res.json({message:"welcome to backend,rajiv,happy new year 2025"})})

app.use(errorhandler) ;
export default app; 


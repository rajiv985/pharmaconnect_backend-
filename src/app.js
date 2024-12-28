import express from "express";
import errorHandler from "./middleware/errorhandler.middleware.js";
import authRoutes from "./routes/auth.route.js"

const app=express();
app.use(express.json())

app.use("/auth",authRoutes);


app.use(errorHandler)
export default app;